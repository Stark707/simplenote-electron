import { combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';

import * as A from '../action-types';
import * as T from '../../types';

export const analyticsAllowed: A.Reducer<boolean | null> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_ANALYTICS':
      return action.allowAnalytics;

    default:
      return state;
  }
};

export const notes: A.Reducer<Map<T.EntityId, T.Note>> = (
  state = new Map(),
  action
) => {
  switch (action.type) {
    case 'ADD_NOTE_TAG': {
      const note = state.get(action.noteId);
      if (!note) {
        return state;
      }

      return new Map(state).set(action.noteId, {
        ...note,
        tags: [...note.tags, action.tagName],
      });
    }

    case 'CREATE_NOTE_WITH_ID':
      return new Map(state).set(action.noteId, {
        content: '',
        creationDate: Date.now() / 1000,
        modificationDate: Date.now() / 1000,
        deleted: false,
        publishURL: '',
        shareURL: '',
        systemTags: [],
        tags: [],
        ...action.note,
      });

    case 'CONFIRM_NEW_NOTE': {
      const next = new Map(state).set(action.newNoteId, action.note);
      next.delete(action.originalNoteId);

      return next;
    }

    case 'DELETE_NOTE_FOREVER':
    case 'REMOTE_NOTE_DELETE_FOREVER': {
      if (!state.has(action.noteId)) {
        return state;
      }

      const next = new Map(state);
      next.delete(action.noteId);
      return next;
    }

    case 'EDIT_NOTE':
    case 'REMOTE_NOTE_UPDATE': {
      const prev = state.get(action.noteId) ?? {
        content: '',
        creationDate: Date.now() / 1000,
        modificationDate: Date.now() / 1000,
        deleted: false,
        publishURL: '',
        shareURL: '',
        systemTags: [],
        tags: [],
      };

      return new Map(state).set(action.noteId, {
        ...prev,
        ...('EDIT_NOTE' === action.type ? action.changes : action.note),
      });
    }

    case 'RESTORE_NOTE_REVISION':
      return action.note
        ? new Map(state).set(action.noteId, action.note)
        : state;

    case 'IMPORT_NOTE_WITH_ID': {
      return new Map(state).set(action.noteId, action.note);
    }

    case 'MARKDOWN_NOTE': {
      if (!state.has(action.noteId)) {
        return state;
      }

      const note = state.get(action.noteId)!;
      const alreadyMarkdown = note.systemTags.includes('markdown');
      if (alreadyMarkdown === action.shouldEnableMarkdown) {
        return state;
      }

      const systemTags = action.shouldEnableMarkdown
        ? [...note.systemTags, 'markdown' as T.SystemTag]
        : note.systemTags.filter((tag) => tag !== 'markdown');

      return new Map(state).set(action.noteId, { ...note, systemTags });
    }

    case 'PIN_NOTE': {
      if (!state.has(action.noteId)) {
        return state;
      }

      const note = state.get(action.noteId)!;
      const alreadyPinned = note.systemTags.includes('pinned');
      if (alreadyPinned === action.shouldPin) {
        return state;
      }

      const systemTags = action.shouldPin
        ? [...note.systemTags, 'pinned' as T.SystemTag]
        : note.systemTags.filter((tag) => tag !== 'pinned');

      return new Map(state).set(action.noteId, { ...note, systemTags });
    }

    case 'PUBLISH_NOTE': {
      if (!state.has(action.noteId)) {
        return state;
      }

      const note = state.get(action.noteId)!;
      const alreadyPinned = note.systemTags.includes('published');
      if (alreadyPinned === action.shouldPublish) {
        return state;
      }

      const systemTags = action.shouldPublish
        ? [...note.systemTags, 'published' as T.SystemTag]
        : note.systemTags.filter((tag) => tag !== 'published');

      return new Map(state).set(action.noteId, { ...note, systemTags });
    }

    case 'REMOVE_NOTE_TAG': {
      const note = state.get(action.noteId);
      if (!note) {
        return state;
      }

      return new Map(state).set(action.noteId, {
        ...note,
        tags: note.tags.filter((tag) => tag !== action.tagName),
      });
    }

    case 'RESTORE_NOTE':
      if (!state.has(action.noteId)) {
        return state;
      }

      return new Map(state).set(action.noteId, {
        ...state.get(action.noteId)!,
        deleted: false,
      });

    case 'TRASH_NOTE':
      if (!state.has(action.noteId)) {
        return state;
      }

      return new Map(state).set(action.noteId, {
        ...state.get(action.noteId)!,
        deleted: true,
      });

    default:
      return state;
  }
};

export const noteRevisions: A.Reducer<Map<T.EntityId, Map<number, T.Note>>> = (
  state = new Map(),
  action
) => {
  switch (action.type) {
    case 'LOAD_REVISIONS':
      return new Map(state).set(action.noteId, new Map(action.revisions));

    default:
      return state;
  }
};

export const tags: A.Reducer<[
  Map<T.EntityId, T.Tag>,
  Map<string, T.EntityId>
]> = (state = [new Map(), new Map()], action) => {
  const [tagIds, tagNames] = state;

  switch (action.type) {
    case 'EDIT_NOTE': {
      if (
        !action.changes.tags?.some(
          (tag) => !tagNames.has(tag.toLocaleLowerCase())
        )
      ) {
        return state;
      }

      const nextIds = new Map(tagIds);
      const nextNames = new Map(tagNames);

      action.changes.tags.forEach((tag) => {
        if (!nextNames.has(tag)) {
          const id = uuid();
          nextIds.set(id, { name: tag });
          nextNames.set(tag.toLocaleLowerCase(), id);
        }
      });

      return [nextIds, nextNames];
    }

    case 'IMPORT_NOTE_WITH_ID': {
      if (
        !action.note.tags?.some((tag) => !tagNames.has(tag.toLocaleLowerCase()))
      ) {
        return state;
      }

      const nextIds = new Map(tagIds);
      const nextNames = new Map(tagNames);

      action.note.tags.forEach((tag) => {
        if (!nextNames.has(tag)) {
          const id = uuid();
          nextIds.set(id, { name: tag });
          nextNames.set(tag.toLocaleLowerCase(), id);
        }
      });

      return [nextIds, nextNames];
    }

    case 'REMOTE_TAG_DELETE': {
      const nextTags = new Map(tagIds);
      nextTags.delete(action.tagId);

      const nextNames = new Map(tagNames);
      nextNames.delete(tagIds.get(action.tagId).name.toLocaleLowerCase());

      return [nextTags, nextNames];
    }

    case 'REMOTE_TAG_UPDATE':
      if (tagIds.has(action.tagId)) {
        const nextTags = new Map(tagIds);
        nextTags.set(action.tagId, action.tag);

        const nextNames = new Map(tagNames);
        nextNames.delete(tagIds.get(action.tagId).name.toLocaleLowerCase());
        nextNames.set(action.tag.name, action.tagId);

        return [nextTags, nextNames];
      } else {
        // insert a new tag
        return [
          new Map(tagIds).set(action.tagId, action.tag),
          new Map(tagNames).set(
            action.tag.name.toLocaleLowerCase(),
            action.tagId
          ),
        ];
      }

    default:
      return state;
  }
};

export default combineReducers({
  analyticsAllowed,
  notes,
  noteRevisions,
  tags,
});
