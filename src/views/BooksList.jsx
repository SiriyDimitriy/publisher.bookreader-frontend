import React from 'react';
import { connect } from 'react-redux';
import BooksContainer from '../modules/Books/components/booksContainer';
import { bindActionCreators } from 'redux';
import * as booksAction from '../actions/booksAction';

import DashboardLayout from '../layouts/Dashboard';

const mapStateToProps = state => {
  return {
    books: state.Books.items,
    account: state.Account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(booksAction, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BooksList extends React.Component {
  constructor(props) {
    super(props);
    props.actions.getBooks();
  }
  render() {
    const { account, books } = this.props;
    const { firstname, lastname, avatar } = account;
    return (
      <DashboardLayout
        pageTitle='My Books'
        subTitle='Browse your books library'
        userName={`${firstname} ${lastname}`}
        userAvatar={avatar}
      >
        <div>
          <BooksContainer books={books} />
        </div>
      </DashboardLayout>
    );
  }
}
