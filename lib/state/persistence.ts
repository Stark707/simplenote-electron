import * as S from './';

const DB_VERSION = 20200625;

export const loadState = () =>
  new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open('simplenote', DB_VERSION);
    dbRequest.onsuccess = () => {
      const db = dbRequest.result;

      const tx = db.transaction('state', 'readonly');
      const stateRequest = tx.objectStore('state').get('state');

      stateRequest.onsuccess = () => {
        const state = stateRequest.result;

        try {
          const tags = new Map(state.tags);

          const data: Partial<S.State> = {
            data: {
              notes: new Map(state.notes),
              noteRevisions: new Map(state.noteRevisions),
              tags: [
                tags,
                new Map(
                  [...tags.entries()].map(([tagId, tag]) => [
                    tag.name.toLocaleLowerCase(),
                    tagId,
                  ])
                ),
              ],
            },
            simperium: {
              ghosts: [new Map(state.cvs), new Map(state.ghosts)],
              lastRemoteUpdate: new Map(state.lastRemoteUpdate),
              lastSync: new Map(state.lastSync),
            },
            ui: {
              editorSelection: new Map(state.editorSelection),
            },
          };

          resolve(data);
        } catch (e) {
          reject();
        }
      };

      stateRequest.onerror = () => reject();
    };
    dbRequest.onerror = () => reject();
  });

export const saveState = (state: S.State) => {
  const editorSelection = Array.from(state.ui.editorSelection);
  const notes = Array.from(state.data.notes);
  const noteRevisions = Array.from(state.data.noteRevisions);
  const tags = Array.from(state.data.tags[0]);
  const cvs = Array.from(state.simperium.ghosts[0]);
  const ghosts = Array.from(state.simperium.ghosts[1]);
  const lastRemoteUpdate = Array.from(state.simperium.lastRemoteUpdate);
  const lastSync = Array.from(state.simperium.lastRemoteUpdate);

  const data = {
    editorSelection,
    notes,
    noteRevisions,
    tags,
    cvs,
    ghosts,
    lastRemoteUpdate,
    lastSync,
  };

  const dbRequest = indexedDB.open('simplenote', DB_VERSION);

  dbRequest.onupgradeneeded = () => {
    const db = dbRequest.result;

    if (!db.objectStoreNames.contains('state')) {
      db.createObjectStore('state');
    }
  };

  dbRequest.onsuccess = () => {
    const db = dbRequest.result;

    const tx = db.transaction('state', 'readwrite');
    const objectStore = tx.objectStore('state');

    objectStore.put(data, 'state');
  };
};

export const middleware: S.Middleware = ({ dispatch, getState }) => (next) => {
  let worker: ReturnType<typeof setTimeout> | null = null;

  return (action) => {
    const restult = next(action);

    if (worker) {
      clearTimeout(worker);
    }
    worker = setTimeout(() => saveState(getState()), 100);

    return restult;
  };
};
