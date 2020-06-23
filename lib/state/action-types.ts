import type { ChangeVersion, Ghost, RemoteInfo } from 'simperium';
import * as T from '../types';

export type Action<
  T extends string,
  Args extends { [extraProps: string]: unknown } = {}
> = { type: T } & Args & {
    meta?: {
      nextNoteToOpen?: T.EntityId;
      searchResults?: {
        noteIds: T.EntityId[];
        tagIds: T.EntityId[];
      };
    };
  };

/*
 * Legacy action-creators that are more like global setters than Redux actions
 */
export type SetAccountName = Action<'setAccountName', { accountName: string }>;
export type SetAutoHideMenuBar = Action<
  'setAutoHideMenuBar',
  { autoHideMenuBar: boolean }
>;
export type SetFocusMode = Action<
  'setFocusMode',
  { focusModeEnabled: boolean }
>;
export type SetLineLength = Action<
  'setLineLength',
  { lineLength: T.LineLength }
>;
export type SetNoteDisplay = Action<
  'setNoteDisplay',
  { noteDisplay: T.ListDisplayMode }
>;
export type SetSortReversed = Action<
  'setSortReversed',
  { sortReversed: boolean }
>;
export type SetSortTagsAlpha = Action<
  'setSortTagsAlpha',
  { sortTagsAlpha: boolean }
>;
export type SetSortType = Action<'setSortType', { sortType: T.SortType }>;
export type SetSpellCheck = Action<
  'setSpellCheck',
  { spellCheckEnabled: boolean }
>;
export type SetTheme = Action<'setTheme', { theme: T.Theme }>;

/*
 * Normal action types
 */
export type CloseDialog = Action<'CLOSE_DIALOG'>;
export type CloseNote = Action<'CLOSE_NOTE'>;
export type CloseRevision = Action<'CLOSE_REVISION'>;
export type CreateNote = Action<'CREATE_NOTE', { note?: Partial<T.Note> }>;
export type CreateNoteWithId = Action<
  'CREATE_NOTE_WITH_ID',
  { noteId: T.EntityId; note?: Partial<T.Note> }
>;
export type DecreaseFontSize = Action<'DECREASE_FONT_SIZE'>;
export type DeleteOpenNoteForever = Action<'DELETE_OPEN_NOTE_FOREVER'>;
export type FilterNotes = Action<
  'FILTER_NOTES',
  { noteIds: T.EntityId[]; tagIds: T.EntityId[] }
>;
export type FocusSearchField = Action<'FOCUS_SEARCH_FIELD'>;
export type IncreaseFontSize = Action<'INCREASE_FONT_SIZE'>;
export type Logout = Action<'LOGOUT'>;
export type OpenNote = Action<'OPEN_NOTE', { noteId?: T.EntityId }>;
export type OpenRevision = Action<
  'OPEN_REVISION',
  { noteId: T.EntityId; version: number }
>;
export type OpenTag = Action<'OPEN_TAG', { tagId: T.EntityId }>;
export type ResetFontSize = Action<'RESET_FONT_SIZE'>;
export type RestoreOpenNote = Action<'RESTORE_OPEN_NOTE'>;
export type Search = Action<'SEARCH', { searchQuery: string }>;
export type SelectNote = Action<'SELECT_NOTE', { noteId: T.EntityId }>;
export type SelectNoteAbove = Action<'SELECT_NOTE_ABOVE'>;
export type SelectNoteBelow = Action<'SELECT_NOTE_BELOW'>;
export type SelectTrash = Action<'SELECT_TRASH'>;
export type SetAnalytics = Action<'SET_ANALYTICS', { allowAnalytics: boolean }>;
export type SetUnsyncedNoteIds = Action<
  'SET_UNSYNCED_NOTE_IDS',
  { noteIds: T.EntityId[] }
>;
export type ShowAllNotes = Action<'SHOW_ALL_NOTES'>;
export type ShowDialog = Action<'SHOW_DIALOG', { dialog: T.DialogType }>;
export type StoreEditorSelection = Action<
  'STORE_EDITOR_SELECTION',
  { noteId: T.EntityId; start: number; end: number; direction: 'LTR' | 'RTL' }
>;
export type SystemThemeUpdate = Action<
  'SYSTEM_THEME_UPDATE',
  { prefers: 'light' | 'dark' }
>;
export type ToggleAnalytics = Action<'TOGGLE_ANALYTICS'>;
export type ToggleAutoHideMenuBar = Action<'TOGGLE_AUTO_HIDE_MENU_BAR'>;
export type ToggleEditMode = Action<'TOGGLE_EDIT_MODE'>;
export type ToggleFocusMode = Action<'TOGGLE_FOCUS_MODE'>;
export type ToggleKeyboardShortcuts = Action<'KEYBOARD_SHORTCUTS_TOGGLE'>;
export type ToggleNavigation = Action<'NAVIGATION_TOGGLE'>;
export type ToggleNoteList = Action<'NOTE_LIST_TOGGLE'>;
export type ToggleNoteInfo = Action<'NOTE_INFO_TOGGLE'>;
export type ToggleRevisions = Action<'REVISIONS_TOGGLE'>;
export type ToggleSimperiumConnectionStatus = Action<
  'SIMPERIUM_CONNECTION_STATUS_TOGGLE',
  { simperiumConnected: boolean }
>;
export type ToggleSortTagsAlpha = Action<'TOGGLE_SORT_TAGS_ALPHA'>;
export type ToggleSortOrder = Action<'TOGGLE_SORT_ORDER'>;
export type ToggleSpellcheck = Action<'TOGGLE_SPELLCHECK'>;
export type ToggleTagDrawer = Action<'TAG_DRAWER_TOGGLE', { show: boolean }>;
export type ToggleTagEditing = Action<'TAG_EDITING_TOGGLE'>;
export type TrashNote = Action<'TRASH_NOTE', { noteId: T.EntityId }>;
export type TrashOpenNote = Action<'TRASH_OPEN_NOTE'>;
export type WindowResize = Action<'WINDOW_RESIZE', { innerWidth: number }>;

/*
 * Note operations
 */
export type AddNoteTag = Action<
  'ADD_NOTE_TAG',
  { noteId: T.EntityId; tagName: string }
>;
export type DeleteNoteForever = Action<
  'DELETE_NOTE_FOREVER',
  { noteId: T.EntityId }
>;
export type EditNote = Action<
  'EDIT_NOTE',
  { noteId: T.EntityId; changes: Partial<T.Note> }
>;
export type ImportNote = Action<'IMPORT_NOTE', { note: T.Note }>;
export type ImportNoteWithId = Action<
  'IMPORT_NOTE_WITH_ID',
  { noteId: T.EntityId; note: T.Note }
>;
export type MarkdownNote = Action<
  'MARKDOWN_NOTE',
  { noteId: T.EntityId; shouldEnableMarkdown: boolean }
>;
export type PinNote = Action<
  'PIN_NOTE',
  { noteId: T.EntityId; shouldPin: boolean }
>;
export type PublishNote = Action<
  'PUBLISH_NOTE',
  { noteId: T.EntityId; shouldPublish: boolean }
>;
export type RemoveNoteTag = Action<
  'REMOVE_NOTE_TAG',
  { noteId: T.EntityId; tagName: string }
>;
export type RestoreNote = Action<'RESTORE_NOTE', { noteId: T.EntityId }>;
export type RestoreNoteRevision = Action<
  'RESTORE_NOTE_REVISION',
  { noteId: T.EntityId; version: number; note: T.Note }
>;
export type SetSystemTag = Action<
  'SET_SYSTEM_TAG',
  { note: T.NoteEntity; tagName: T.SystemTag; shouldHaveTag: boolean }
>;

/*
 * Simperium operations
 */
export type AcknowledgePendingChange = Action<
  'ACKNOWLEDGE_PENDING_CHANGE',
  {
    entityId: T.EntityId;
    ccid: string;
  }
>;
export type ChangeConnectionStatus = Action<
  'CHANGE_CONNECTION_STATUS',
  { status: T.ConnectionState }
>;
export type ConfirmNewNote = Action<
  'CONFIRM_NEW_NOTE',
  { originalNoteId: T.EntityId; newNoteId: T.EntityId; note: T.Note }
>;
export type ConfirmNewTag = Action<
  'CONFIRM_NEW_TAG',
  {
    originalTagId: T.EntityId;
    newTagId: T.EntityId;
    tagName: string;
    tag: T.Tag;
  }
>;
export type LoadRevisions = Action<
  'LOAD_REVISIONS',
  { noteId: T.EntityId; revisions: [number, T.Note][] }
>;
export type RemoteNoteUpdate = Action<
  'REMOTE_NOTE_UPDATE',
  { noteId: T.EntityId; note: T.Note; remoteInfo?: RemoteInfo<T.Note> }
>;
export type RemoteNoteDeleteForever = Action<
  'REMOTE_NOTE_DELETE_FOREVER',
  { noteId: T.EntityId }
>;
export type RemoveNoteGhost = Action<
  'REMOVE_NOTE_GHOST',
  { noteId: T.EntityId }
>;
export type RemoteTagDelete = Action<
  'REMOTE_TAG_DELETE',
  { tagId: T.EntityId }
>;
export type RemoteTagUpdate = Action<
  'REMOTE_TAG_UPDATE',
  { tagId: T.EntityId; tag: T.Tag; remoteInfo?: RemoteInfo<T.Tag> }
>;
export type SaveNoteGhost = Action<
  'SAVE_NOTE_GHOST',
  { noteId: T.EntityId; ghost: Ghost<T.Note> }
>;
export type SetChangeVersion = Action<
  'SET_CHANGE_VERSION',
  {
    bucketName: 'note' | 'tag' | 'preferences';
    cv: ChangeVersion;
  }
>;
export type SubmitPendingChange = Action<
  'SUBMIT_PENDING_CHANGE',
  {
    entityId: T.EntityId;
    ccid: string;
  }
>;

export type ActionType =
  | AcknowledgePendingChange
  | AddNoteTag
  | ChangeConnectionStatus
  | CloseNote
  | CloseDialog
  | CloseRevision
  | ConfirmNewNote
  | ConfirmNewTag
  | CreateNote
  | CreateNoteWithId
  | DecreaseFontSize
  | DeleteOpenNoteForever
  | DeleteNoteForever
  | EditNote
  | FilterNotes
  | FocusSearchField
  | ImportNote
  | ImportNoteWithId
  | IncreaseFontSize
  | LoadRevisions
  | Logout
  | MarkdownNote
  | OpenNote
  | OpenRevision
  | OpenTag
  | PinNote
  | PublishNote
  | RemoteNoteUpdate
  | RemoteNoteDeleteForever
  | RemoteTagDelete
  | RemoteTagUpdate
  | RemoveNoteGhost
  | RemoveNoteTag
  | ResetFontSize
  | RestoreOpenNote
  | RestoreNote
  | RestoreNoteRevision
  | SaveNoteGhost
  | Search
  | SelectNote
  | SelectNoteAbove
  | SelectNoteBelow
  | SelectTrash
  | SetAccountName
  | SetAnalytics
  | SetAutoHideMenuBar
  | SetChangeVersion
  | SetFocusMode
  | SetLineLength
  | SetNoteDisplay
  | SetSortReversed
  | SetSortTagsAlpha
  | SetSortType
  | SetSpellCheck
  | SetSystemTag
  | SetTheme
  | SetUnsyncedNoteIds
  | ShowAllNotes
  | ShowDialog
  | StoreEditorSelection
  | SubmitPendingChange
  | SystemThemeUpdate
  | ToggleAnalytics
  | ToggleAutoHideMenuBar
  | ToggleEditMode
  | ToggleFocusMode
  | ToggleKeyboardShortcuts
  | ToggleNavigation
  | ToggleNoteList
  | ToggleNoteInfo
  | ToggleRevisions
  | ToggleSimperiumConnectionStatus
  | ToggleSortTagsAlpha
  | ToggleSortOrder
  | ToggleSpellcheck
  | ToggleTagDrawer
  | ToggleTagEditing
  | TrashNote
  | TrashOpenNote
  | WindowResize;

export type ActionCreator<A extends ActionType> = (...args: any[]) => A;
export type Reducer<S> = (state: S | undefined, action: ActionType) => S;
