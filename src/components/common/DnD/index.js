import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      newMarkerElemType: props.newMarkerElemType
    };
  },
  endDrag(props, monitor) {
    const newPageElementType = monitor.getItem().newMarkerElemType;
    const dropResult = monitor.getDropResult();

    if (
      newPageElementType == 'new-header' ||
      newPageElementType == 'new-media' ||
      newPageElementType == 'new-paragraph' ||
      newPageElementType == 'new-page'
    ) {
      props.createNewPageElement(
        newPageElementType,
        dropResult.hoverIndex,
        dropResult.pageNumber
      );
    } else {
      props.dndOrder(
        dropResult.dragIndex,
        dropResult.hoverIndex,
        dropResult.markerElemType,
        dropResult.pageNumber
      );
    }

    console.log('dropResult', dropResult);
    console.log('newPageElementType', newPageElementType);
  }
};

const cardTarget = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    const markerElemType = props.markerElemType;
    const newMarkerElemType = props.newMarkerElemType;
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const pageNumber = props.pageNumber;

    let dropElem = {
      pageNumber,
      hoverIndex,
      markerElemType,
      newMarkerElemType,
      dragIndex
    };
    return dropElem;
  }
};

@DropTarget(ItemTypes.DnD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.DnD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class DnD extends Component {
  render() {
    const { children, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(<div>{children}</div>));
  }
}
