import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-isomorphic-tools';
import NextPageIcon from '../../../../../assets/images/svg/shevron-right.svg';
import BookPage from './BookPage/index'
import BookHeader from './BookHeader/index'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 3rem;
`;

const NextPage = styled.section`
  display: flex;
  width: 15rem;
  bottom: 6rem;
  position: fixed;
  z-index: 1000;
  right: 10rem;
  a {
    display: flex;
    align-items: center;
    opacity: 0.33;
    font-size: 2rem;
    font-weight: 600;
    color: #000000;
  }
`;

const PrevPage = NextPage.extend`
  left: 10rem;
  svg {
    transform: rotate(180deg);
  }
`;

export default class ViewMode extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchBook(props.book.id)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const pagesCount = this.props.book.pages.length;
        const currentPageNumber = this.props.match.params.pageNumber;
        const currentPage = this.props.book.pages[currentPageNumber - 1]
        let nextPage = null,
            prevPage = null;
        if (currentPageNumber < pagesCount) {
            nextPage = +currentPageNumber + 1;
        } else {
            nextPage = null;
        }
        if (currentPageNumber > 1) {
            prevPage = +currentPageNumber - 1;
        } else {
            prevPage = null;
        }

        return (
            <Section>
                <BookPage page={currentPage}/>
                {nextPage !== null ? (
                    <NextPage>
                        <Link
                            to={{pathname: `/books/${this.props.book.id}/page/${nextPage}`}}
                        >
                            Next page<NextPageIcon />
                        </Link>
                    </NextPage>
                ) : null}
                {prevPage ? (
                    <PrevPage>
                        <Link
                            to={{
                                pathname: `/books/${this.props.book.id}/page/${prevPage}`
                            }}
                        >
                            <NextPageIcon />Previous page
                        </Link>
                    </PrevPage>
                ) : null}
            </Section>
        );
    }
}
