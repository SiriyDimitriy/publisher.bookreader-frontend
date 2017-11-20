import React from 'react';
import { Link } from 'react-isomorphic-tools';
import styled from 'styled-components';
import MediaIcon from '../../../assets/images/svg/page-media.svg';

const Wrapper = styled.section`
  box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.09);
  border-radius: 1rem;

  margin-bottom: 5rem;
  &:hover {
    box-shadow: 0 2rem 4rem 0 rgba(0, 0, 0, 0.2);
  }
  a {
    display: block;
    height: 100%;
  }
`;

const DefaultPhoto = styled.section`
  width: 15rem;
  display: flex;
  height: 15rem;
  padding: 1rem;
  align-items: center;
  border-radius: 1rem;
  justify-content: center;
  background-color: #f0f0f0;
`;

const ImgWrap = styled.div`
  height: 23.7rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
`;

const Title = styled.h3`
  padding: 1rem;
  font-size: 2rem;
  font-family: Qanelas;
  font-weight: bold;
  letter-spacing: -0px;
  text-align: left;
  color: #9b9b9b;
  line-height: 3rem;
  margin-bottom: 0;
  min-height: 2rem;
  max-height: 3rem;
  white-space: nowrap;
  overflow: hidden;
  text-decoration: none;
  position: relative;
  box-sizing: content-box;
  span {
    border-bottom-right-radius: 1rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 1)
    );
    bottom: 0;
    height: 5rem;
    max-height: 100%;
    position: absolute;
    right: 0;
    width: 60px;
  }
`;

export default class BookItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { book } = this.props;
    return (
      <Wrapper>
        <Link to={{ pathname: `/books/${book.id}` }}>
          {book.avatar ? (
            <ImgWrap>
              <img src={book.avatar.path} />
            </ImgWrap>
          ) : (
            <DefaultPhoto>
              <MediaIcon />
            </DefaultPhoto>
          )}
          <Title>
            {book.title}
            <span />
          </Title>
        </Link>
      </Wrapper>
    );
  }
}
