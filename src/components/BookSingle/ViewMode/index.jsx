import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-isomorphic-tools';
import NextPageIcon from '../../../../assets/images/svg/shevron-right.svg';

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
  bottom: 13rem;
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
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const pagesCount = this.props.book.pages.length;
    const currentPage = this.props.match.params.pageNumber;
    let nextPage = null,
      prevPage = null;
    if (currentPage < pagesCount) {
      nextPage = +currentPage + 1;
    } else {
      nextPage = null;
    }
    if (currentPage > 1) {
      prevPage = +currentPage - 1;
    } else {
      prevPage = null;
    }

    console.log('nextPage', nextPage);
    console.log('prevPage', prevPage);
    return (
      <Section>
        {currentPage}
        {nextPage !== null ? (
          <NextPage>
            <Link
              to={{ pathname: `/books/${this.props.book.id}/page/${nextPage}` }}
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
