import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import PanelTitle from '../components/panel-title';
import ReorderIcon from '../icons/reorder';
import TagListInput from './input';
import { openTag, toggleTagEditing } from '../state/ui/actions';
import analytics from '../analytics';

import * as S from '../state';
import * as T from '../types';

type StateProps = {
  editingTags: boolean;
  openedTag: T.EntityId | null;
  sortTagsAlpha: boolean;
  tags: Map<T.EntityId, T.Tag>;
};

type DispatchProps = {
  onEditTags: () => any;
  openTag: (tagId: T.EntityId) => any;
  renameTag: (args: { tagId: T.EntityId; name: T.TagName }) => any;
  reorderTags: (args: { tags: T.TagEntity[] }) => any;
  trashTag: (args: { tag: T.TagEntity }) => any;
};

type Props = StateProps & DispatchProps;

const TagHandle = SortableHandle(() => (
  <span className="tag-list-reorder">
    <ReorderIcon />
  </span>
));

const SortableTag = SortableElement(
  ({
    editingActive,
    isSelected,
    selectTag,
    value: [tagId, tag],
  }: {
    editingActive: boolean;
    isSelected: boolean;
    selectTag: (tagId: T.EntityId) => any;
    value: [T.EntityId, T.Tag];
  }) => (
    <li key={tagId} className="tag-list-item">
      <span className="tag-list-item-left">
        {editingActive && <TagHandle />}
        <span className="tag-list-trash" />
        <span className="tag-list-item-content">
          <TagListInput
            editable={editingActive}
            isSelected={isSelected}
            onClick={() => selectTag(tagId)}
            onDone={() => {}}
            value={tag.name}
          />
        </span>
      </span>
    </li>
  )
);

const SortableTagList = SortableContainer(
  ({
    editingTags,
    items,
    openedTag,
    openTag,
  }: {
    editingTags: boolean;
    items: [T.EntityId, T.Tag][];
    openedTag: T.EntityId | null;
    openTag: (tagId: T.EntityId) => any;
  }) => (
    <ul className="tag-list-items">
      {items.map((value, index) => (
        <SortableTag
          key={value[1].name}
          editingActive={editingTags}
          index={index}
          isSelected={openedTag === value[0]}
          selectTag={openTag}
          value={value}
        />
      ))}
    </ul>
  )
);

export class TagList extends Component<Props> {
  static displayName = 'TagList';

  render() {
    const { editingTags, openTag, openedTag, sortTagsAlpha, tags } = this.props;

    const classes = classNames('tag-list', {
      'tag-list-editing': this.props.editingTags,
    });

    const sortedTags = [...tags.entries()].sort(([aId, aTag], [bId, bTag]) =>
      sortTagsAlpha
        ? aTag.name.localeCompare(bTag.name)
        : 'undefined' !== typeof aTag.index && 'undefined' !== typeof bTag.index
        ? aTag.index - bTag.index
        : 'undefined' === typeof aTag.index
        ? 1
        : -1
    );

    return (
      <div className={classes}>
        <div className="tag-list-title">
          <PanelTitle headingLevel={2}>Tags</PanelTitle>
          {tags.size > 0 && (
            <button
              className="tag-list-edit-toggle button button-borderless"
              tabIndex={0}
              onClick={() => {}}
            >
              {editingTags ? 'Done' : 'Edit'}
            </button>
          )}
        </div>
        <SortableTagList
          editingTags={editingTags}
          lockAxis="y"
          openedTag={openedTag}
          openTag={openTag}
          items={sortedTags}
          useDragHandle={true}
        />
      </div>
    );
  }
}

const mapStateToProps: S.MapState<StateProps> = ({
  data,
  settings: { sortTagsAlpha },
  ui: { editingTags, openedTag },
}) => ({
  editingTags,
  sortTagsAlpha,
  tags: data.tags[0],
  openedTag,
});

const mapDispatchToProps: S.MapDispatch<DispatchProps> = (dispatch) => ({
  onEditTags: () => dispatch(toggleTagEditing()),
  openTag: (tagId) => {
    dispatch(openTag(tagId));
    analytics.tracks.recordEvent('list_tag_viewed');
  },
  // renameTag: (arg) => dispatch(renameTag(arg)),
  // reorderTags: (arg) => dispatch(reorderTags(arg)),
  // trashTag: (arg) => dispatch(trashTag(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
