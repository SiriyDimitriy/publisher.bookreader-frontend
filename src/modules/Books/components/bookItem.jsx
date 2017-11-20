import React from 'react';
import {Link} from 'react-isomorphic-tools';
import styled from 'styled-components';
import MediaIcon from '../../../../assets/images/svg/page-media.svg';

import {Switch, Icon} from 'antd';

const Wrapper = styled.section`
  position: relative;
  box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.09);

  margin-bottom: 5rem;
  &:hover {
    box-shadow: 0 2rem 4rem 0 rgba(0, 0, 0, 0.2);
  }
  a {
    display: ${props => (props.grid === 'list' ? 'flex' : 'block')};
    height: 100%;
  }
`;

const DefaultPhoto = styled.section`
  // width: 15rem;
  display: flex;
  height: 23.7rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  ${props =>
props.grid === 'list' &&
`
  flex: 1;
`};
`;

const ImgWrap = styled.div`
  height: 23.7rem;

  ${props =>
props.grid === 'list' &&
`
  flex: 1;
`} img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  ${props =>
props.grid === 'list' &&
`
  flex: 2;
`} span {
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
    ${props =>
props.grid === 'list' &&
`
    display: none;
  `};
  }
`;

const Delete = styled.div`
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
  font-size: 2rem;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 4rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  z-index: 11;
  &:hover {
    background-color: #c12323;
    color: #fff;
  }
`;

const Completed = styled.div`
  position: absolute;
  cursor: pointer;
  top: 1.7rem;
  left: 1rem;
`;

const UpdatedAt = styled.section`
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem 1rem;
    color: #9b9b9b;
    font-size: 1.2rem;
`

export default class BookItem extends React.Component {
    onChangeSwitch = checked => {
        const {onChangeCompleted, book} = this.props;
        onChangeCompleted(book.id, checked);
    };

    render() {
        const {book, grid, deleteBook, isCompleted} = this.props;
        let date = new Date(book.updatedAt);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let dateStr = year + '-' + month + '-' + day
        let timeStr = hours + ':' + minutes
        return (
            <Wrapper grid={grid}>
                <Completed>
                    <Switch
                        size='small'
                        defaultChecked={isCompleted}
                        onChange={this.onChangeSwitch}
                    />
                </Completed>
                <Delete onClick={() => deleteBook(book.id)}>
                    <Icon type='delete'/>
                </Delete>
                <Link to={{pathname: `/books/${book.id}/page/1`}}>
                    {book.avatar ? (
                        <ImgWrap grid={grid}>
                            <img src={book.avatar.path}/>
                        </ImgWrap>
                    ) : (
                        <DefaultPhoto grid={grid}>
                            <MediaIcon />
                        </DefaultPhoto>
                    )}
                    <Title grid={grid}>
                        {book.title}
                        <span grid={grid}/>
                    </Title>
                    {book.updatedAt != null ? <UpdatedAt grid={grid}>
                        Last edit by: {dateStr} at {timeStr}
                        </UpdatedAt> : null}
                </Link>
            </Wrapper>
        );
    }
}
