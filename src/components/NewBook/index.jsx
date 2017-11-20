import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import * as bookActions from '../../actions/bookActions';
import BookSingleNavigation from './BookSingleNavigation/index';
import BookHeader from './BookHeader/index';
import PageDivider from './PageDivider/index';
import BookPage from './BookPage/index';
import Clipboard from '../Clipboard/index';
import { DragDropContext } from 'react-dnd';
import DnD from '../common/DnD/index';
import DrugNewElementsSection from '../DrugNewElementsSection/index';

// const newBook = {
//   title: '',
//   author: '',
//   avatar: null,
//   pages: [
//     {
//       pageNumber: 0,
//       headers: [],
//       paragraphs: [],
//       images: [],
//       info: [],
//       inputExercises: [],
//       coinsExercises: [],
//       gapExercises: [],
//       openQuestionExercises: [],
//       tableExercises: []
//     }
//   ],
//   wordsDefinitions: []
// };

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 3rem;
  margin-top: 13.3rem;
`;

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const mapStateToProps = state => {
  return {
    // book: state.fetchData.book.response || [],
    copy: state.bookReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pageActions: bindActionCreators(bookActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class NewBookContainer extends React.Component {
  constructor(props) {
    super(props);
    // props.pageActions.copyBookForChanges(props.book);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { copy: book } = this.props;
    // if (!book || !book.id) {
    //   return null;
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
      createNewPageElement,
      createNewBook
    } = this.props.pageActions;

    return (
      <Section>
        <BookSingleNavigation createNewBook={createNewBook} />
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
        {pages &&
          pages.map((page, index) => {
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
        <Clipboard createNewPageElement={createNewPageElement} />
        <DrugNewElementsSection createNewPageElement={createNewPageElement} />
      </Section>
    );
  }
}
