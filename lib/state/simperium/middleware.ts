import { default as createClient } from 'simperium';

import debugFactory from 'debug';
import actions from '../actions';
import { NoteBucket } from './functions/note-bucket';
import { NoteGhost } from './functions/note-ghost';
import { TagBucket } from './functions/tag-bucket';
import { start as startConnectionMonitor } from './functions/connection-monitor';
import { getAccountName } from './functions/username-monitor';

import * as A from '../action-types';
import * as S from '../';
import * as T from '../../types';

const debug = debugFactory('simperium-middleware');

/**
 * An in memory implementation of GhostStore
 *
 * @param {Bucket} bucket instance to save ghost data for
 */
export default function GhostStore(bucket) {
  this.bucket = bucket;
  this.index = {};
}

GhostStore.prototype.getChangeVersion = function () {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve(this.cv);
    });
  });
};

GhostStore.prototype.setChangeVersion = function (cv) {
  return new Promise((resolve) => {
    setImmediate(() => {
      this.cv = cv;
      resolve(cv);
    });
  });
};

GhostStore.prototype.put = function (id, version, data) {
  return new Promise((resolve) => {
    setImmediate(() => {
      this.index[id] = JSON.stringify({ version: version, data: data });
      resolve(true);
    });
  });
};

GhostStore.prototype.get = function (id) {
  return new Promise((resolve) => {
    setImmediate(() => {
      var ghost = this.index[id];
      if (!ghost) {
        ghost = { data: {} };
        ghost.key = id;
        this.index[id] = JSON.stringify(ghost);
      } else {
        ghost = JSON.parse(ghost);
      }
      resolve(ghost);
    });
  });
};

GhostStore.prototype.remove = function (id) {
  return new Promise((resolve) => {
    setImmediate(() => {
      delete this.index[id];
      resolve();
    });
  });
};

function BucketStore() {
  this.objects = {};
}

BucketStore.prototype.get = function (id, callback) {
  callback(null, { id: id, data: this.objects[id] });
};

BucketStore.prototype.update = function (id, object, isIndexing, callback) {
  this.objects[id] = object;
  callback(null, { id: id, data: object, isIndexing: isIndexing });
};

BucketStore.prototype.remove = function (id, callback) {
  delete this.objects[id];
  callback(null);
};

// TODO: build a query interface
BucketStore.prototype.find = function (query, callback) {
  var objects = [];
  var key;
  for (key in this.objects) {
    objects.push({ id: key, data: this.objects[key] });
  }
  callback(null, objects);
};

type Buckets = {
  note: T.Note;
  preferences: T.Preferences;
  tag: T.Tag;
};

export const initSimperium = (
  logout: () => any,
  token: string,
  username: string | null,
  createWelcomeNote: boolean
): S.Middleware => (store) => {
  const { dispatch, getState } = store;

  const client = createClient<Buckets>('chalk-bump-f49', token, {
    objectStoreProvider: (bucket) => {
      switch (bucket.name) {
        case 'note':
          return new NoteBucket(store);

        case 'preferences':
          return new BucketStore();

        case 'tag':
          return new TagBucket(store);
      }
    },
    ghostStoreProvider: (bucket) => {
      switch (bucket.name) {
        case 'note':
          return new NoteGhost(store);

        case 'preferences':
        case 'tag':
          return new GhostStore(bucket);
      }
    },
  });
  client.on('unauthorized', () => logout());

  getAccountName(client).then((accountName) => {
    debug(`authenticated: ${accountName}`);
    dispatch(actions.settings.setAccountName(accountName));
  });

  startConnectionMonitor(client, store);

  const noteBucket = client.bucket('note');
  noteBucket.on('update', (entityId, updatedEntity, remoteInfo) => {
    dispatch({
      type: 'REMOTE_NOTE_UPDATE',
      noteId: entityId,
      note: updatedEntity,
      remoteInfo,
    });
  });

  noteBucket.channel.localQueue.on('send', (change) => {
    dispatch({
      type: 'SUBMIT_PENDING_CHANGE',
      entityId: change.id,
      ccid: change.ccid,
    });
  });

  noteBucket.channel.on('acknowledge', (entityId, change) => {
    dispatch({
      type: 'ACKNOWLEDGE_PENDING_CHANGE',
      entityId: entityId,
      ccid: change.ccid,
    });
  });

  const tagBucket = client.bucket('tag');
  tagBucket.on('update', (entityId, updatedEntity, remoteInfo) => {
    dispatch({
      type: 'REMOTE_TAG_UPDATE',
      tagId: entityId,
      tag: updatedEntity,
      remoteInfo,
    });
  });

  if (createWelcomeNote) {
    import(
      /* webpackChunkName: 'welcome-message' */ '../../welcome-message'
    ).then(({ content }) => {
      const now = Date.now() / 1000;
      noteBucket.add({
        content,
        deleted: false,
        systemTags: [],
        creationDate: now,
        modificationDate: now,
        shareURL: '',
        publishURL: '',
        tags: [],
      });
    });
  }

  const changedNotes = new Map<T.EntityId, any>();
  const queueNoteUpdate = (noteId: T.EntityId) => {
    if (changedNotes.has(noteId)) {
      clearTimeout(changedNotes.get(noteId));
    }

    const timer = setTimeout(() => noteBucket.touch(noteId), 2000);
    changedNotes.set(noteId, timer);
  };

  const changedTags = new Map<T.EntityId, any>();
  const queueTagUpdate = (tagId: T.EntityId) => {
    if (changedTags.has(tagId)) {
      clearTimeout(changedTags.get(tagId));
    }

    const timer = setTimeout(() => tagBucket.touch(tagId), 2000);
    changedTags.set(tagId, timer);
  };

  return (next) => (action: A.ActionType) => {
    console.log(action);
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    switch (action.type) {
      case 'ADD_NOTE_TAG':
        if (prevState.data.tags[1].has(action.tagName.toLocaleLowerCase())) {
          queueTagUpdate(
            nextState.data.tags[1].get(action.tagName.toLocaleLowerCase())
          );
        } else {
          tagBucket.add(
            nextState.data.tags[1].get(action.tagName.toLocaleLowerCase())
          );
        }
        queueNoteUpdate(action.noteId);
        return result;

      // while editing we should debounce
      // updates to prevent thrashing
      case 'CREATE_NOTE_WITH_ID':
        noteBucket
          .add({
            content: '',
            tags: [],
            creationDate: Date.now() / 1000,
            modificationDate: Date.now() / 1000,
            deleted: false,
            systemTags: [],
            shareURL: '',
            publishURL: '',
            ...action.note,
          })
          .then((note) =>
            dispatch({
              type: 'CONFIRM_NEW_NOTE',
              originalNoteId: action.noteId,
              newNoteId: note.id,
              note: note.data,
            })
          );
        return result;

      case 'EDIT_NOTE':
        queueNoteUpdate(action.noteId);
        return result;

      case 'FILTER_NOTES':
      case 'OPEN_NOTE':
      case 'SELECT_NOTE': {
        const noteId =
          action.noteId ??
          action.meta?.nextNoteToOpen ??
          getState().ui.openedNote;

        if (noteId) {
          noteBucket.getRevisions(noteId).then((revisions) => {
            dispatch({
              type: 'LOAD_REVISIONS',
              noteId: noteId,
              revisions: revisions
                .map(({ data, version }) => [version, data])
                .sort((a, b) => a[0] - b[0]),
            });
          });
        }

        return result;
      }

      // other note editing actions however
      // should trigger an immediate sync
      case 'IMPORT_NOTE_WITH_ID':
      case 'MARKDOWN_NOTE':
      case 'PIN_NOTE':
      case 'PUBLISH_NOTE':
      case 'RESTORE_NOTE':
      case 'RESTORE_NOTE_REVISION':
      case 'TRASH_NOTE':
        setTimeout(() => noteBucket.touch(action.noteId), 10);
        return result;

      case 'DELETE_NOTE_FOREVER':
        setTimeout(() => noteBucket.remove(action.noteId), 10);
        return result;

      case 'LOGOUT':
        client.end();
        logout();
        return result;
    }

    return result;
  };
};
