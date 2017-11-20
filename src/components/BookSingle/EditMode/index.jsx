import React from 'react';
import styled from 'styled-components';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
//import * as bookActions from '../../actions/bookActions';
//import BookSingleNavigation from './BookSingleNavigation/index';
import BookHeader from './BookHeader/index';
import PageDivider from './PageDivider/index';
import BookPage from './BookPage/index';
import Clipboard from '../../Clipboard/index';
import { DragDropContext } from 'react-dnd';
import DnD from '../../common/DnD/index';
import DrugNewElementsSection from '../../DrugNewElementsSection/index';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // padding-bottom: 3rem;
  // margin-top: 13.3rem;
`;

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

@DragDropContext(HTML5Backend)
export default class EditMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const book = this.props.copy;
    // if (!book || !book.id) {
    //     return null;
    // }
    const pages = book.pages;
    const {
      changeBookTitle,
      changeBookAuthor,
      changePageHeader,
      changePageParagraph,
      removeMedia,
      selectMedia,
      removeHeaderMedia,
      selectHeaderMedia,
      dndOrder,
      createNewPageElement
    } = this.props.pageActions;

    return (
      <Section>
        <BookHeader
          bookId={book.id}
          avatar={book.avatar}
          bookName={book.title}
          bookAuthor={book.author}
          changeBookTitle={changeBookTitle}
          changeBookAuthor={changeBookAuthor}
          removeHeaderMedia={removeHeaderMedia}
          selectHeaderMedia={selectHeaderMedia}
        />
        {pages.map((page, index) => {
          return (
            <PageWrapper key={index}>
              <PageDivider />
              {[...page.headers, ...page.paragraphs, ...page.images].length ==
              0 ? (
                <DnD
                  key={'page' + page.id}
                  index={page.pageNumber}
                  id={page.id}
                  markerElemType='pages'
                  pageNumber={page.pageNumber}
                  dndOrder={dndOrder}
                >
                  <BookPage
                    bookId={book.id}
                    page={page}
                    changePageHeader={changePageHeader}
                    changePageParagraph={changePageParagraph}
                    removeMedia={removeMedia}
                    selectMedia={selectMedia}
                    dndOrder={dndOrder}
                  />
                </DnD>
              ) : (
                <BookPage
                  bookId={book.id}
                  page={page}
                  changePageHeader={changePageHeader}
                  changePageParagraph={changePageParagraph}
                  removeMedia={removeMedia}
                  selectMedia={selectMedia}
                  dndOrder={dndOrder}
                />
              )}
            </PageWrapper>
          );
        })}
        {this.props.editMode ? (
          <Clipboard createNewPageElement={createNewPageElement} />
        ) : null}
        {this.props.editMode ? (
          <DrugNewElementsSection createNewPageElement={createNewPageElement} />
        ) : null}
      </Section>
    );
  }
}
