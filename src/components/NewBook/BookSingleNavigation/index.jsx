import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-isomorphic-tools';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BackIcon from '../../../../assets/images/svg/left-chevron.svg';
import LogoIcon from '../../../../assets/images/svg/logo.svg';
import * as actions from '../../../actions/index';
import * as actionsBooks from '../../../actions/booksAction.js';

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 3.5rem 5.7rem 3.5rem 6.9rem;
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 10rem;
  object-fit: contain;
  -webkit-backdrop-filter: blur(7.4px);
  backdrop-filter: blur(7.4px);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.1rem 1.1rem 0 rgba(0, 0, 0, 0.08);
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  span {
    display: flex;
    align-items: center;
    margin-left: 1.1rem;
    height: 2.3rem;
    font-family: Qanelas;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: -0px;
    text-align: center;
    color: #4a4a4a;
  }
  button {
    height: 2.3rem;
    border-radius: 0.5rem;
    font-family: Qanelas;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: -0px;
    text-align: left;
    color: #4a4a4a;
    border: none;
    background: transparent;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  svg {
    margin-left: 0.5rem;
    width: 1.2rem;
    path {
      fill: #9b9b9b;
    }
  }
`;

const mapStateToProps = state => {
  return {
    bookCopy: state.bookReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveAction: bindActionCreators(actions.saveAction, dispatch),
    actions: bindActionCreators({ push, ...actionsBooks }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BookSingleNavigation extends React.Component {
  constructor() {
    super();
    this.state = {
      isEmptyDiff: true
    };
  }

  save = () => {
    const { bookCopy } = this.props;
    // console.log('bookCopy', bookCopy);
    // const reqParams = {
    //   bookForm: JSON.parse(JSON.stringify(newBook))
    // };
    const reqParams = JSON.parse(JSON.stringify(bookCopy));

    const findImagesAndSetId = (obj, key) => {
      for (let i in obj) {
        if (i == key) {
          obj[key].map(el => {
            if (el.image) {
              el.image = el.image.id;
            }
          });
        }
      }
      return obj;
    };

    const filterObject = (obj, key) => {
      for (let i in obj) {
        // console.log('i == key', i, key);
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
          filterObject(obj[i], key);
        }
        if (i == key) {
          // console.log('delete', obj[key]);

          delete obj[key];
        }
      }
      return obj;
    };

    // console.log('reqParams', reqParams);

    reqParams.pages &&
      reqParams.pages.map(page => {
        findImagesAndSetId(page, 'images');
      });

    // let avatarId = reqParams.bookForm.avatar.id;
    // reqParams.bookForm.avatar = avatarId;
    filterObject(reqParams, 'id');
    // filterObject(reqParams, 'pages');
    // this.props.saveAction(reqParams, bookCopy.id);

    // console.log('reqParams', reqParams);
    this.props.createNewBook(reqParams);
    // this.props.actions.push('/');
    // this.props.actions.getBooks();
    // this.props.actions.pushNewBook(this.props.copyBook);
  };

  render() {
    return (
      <Section>
        <Link to={{ pathname: '/' }}>
          <BackIcon />
          <span>My library</span>
        </Link>
        <Link to={{ pathname: '/' }}>
          <LogoIcon style={{ width: '40px', height: '30px' }} />
        </Link>
        <button onClick={this.save}>SAVE</button>
      </Section>
    );
  }
}
