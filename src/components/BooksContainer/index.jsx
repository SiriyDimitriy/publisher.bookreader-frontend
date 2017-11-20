import React from 'react';
import { Link } from 'react-isomorphic-tools';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import BookItem from '../BookItem/index';
import * as bookActions from '../../actions/bookActions';
import * as booksActions from '../../actions/booksAction.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import { Row, Col, Button, Radio, Icon, Select } from 'antd';

const Header = styled.div`margin-bottom: 4rem;`;

const mapStateToProps = state => {
  return {
    router: state.router.location.pathname
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pageActions: bindActionCreators(
      { ...bookActions, ...booksActions, push },
      dispatch
    )
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BooksContainer extends React.Component {
  state = {
    gridBooks: 'tile'
  };

  handleGridBooksChange = e => {
    this.setState({ gridBooks: e.target.value });
  };

  cleanBookReducer = () => {
    this.props.pageActions.cleanBook();
    this.props.pageActions.push('/new-book');
  };

  onChangeCompleted = (id, checked) => {
    // console.log(`switch to ${checked}`, id);
    this.props.pageActions.setIsCompleted(id, checked);
  };

  sortBooks = sort => {
    // console.log(`selected ${sort}`);
    if (sort === 'default') {
      this.props.pageActions.getBooks(sort);
    } else {
      this.props.pageActions.getSortBooks(sort);
    }
  };

  deleteBook = id => {
    // console.log('delete', id);
    this.props.pageActions.deleteBookId(id);
    // this.props.pageActions.getBooks();
  };

  render() {
    const { books, router } = this.props;
    const { gridBooks } = this.state;

    const tileBooks = books ? (
      books.map(item => (
        <Col xs={{ span: 8 }} lg={{ span: 6 }} key={`tile-${item.id}`}>
          <BookItem
            grid='tile'
            book={item}
            deleteBook={this.deleteBook}
            isCompleted={item.isCompleted}
            onChangeCompleted={this.onChangeCompleted}
          />
        </Col>
      ))
    ) : (
      <span>No books found</span>
    );

    const listBooks = books ? (
      books.map(item => (
        <Col span={18} key={`list-${item.id}`}>
          <BookItem
            grid='list'
            book={item}
            deleteBook={this.deleteBook}
            isCompleted={item.isCompleted}
            onChangeCompleted={this.onChangeCompleted}
          />
        </Col>
      ))
    ) : (
      <span>No books found</span>
    );

    return (
      <section>
        <Header>
          <Row type='flex' justify='space-between'>
            <Col span={8}>
              <Radio.Group
                value={gridBooks}
                onChange={this.handleGridBooksChange}
              >
                <Radio.Button value='tile'>
                  <Icon type='appstore' />
                </Radio.Button>
                <Radio.Button value='list'>
                  <Icon type='bars' />
                </Radio.Button>
              </Radio.Group>
              <Select
                placeholder='Sort'
                style={{ width: 120, marginLeft: '1rem' }}
                onChange={this.sortBooks}
              >
                <Select.Option value='default'>Default</Select.Option>
                <Select.Option value='asc'>Not completed</Select.Option>
                <Select.Option value='desc'>Completed</Select.Option>
              </Select>
            </Col>

            <Col span={8} style={{ textAlign: 'right' }}>
              <div onClick={this.cleanBookReducer}>
                <Button
                  shape='circle'
                  icon='plus'
                  size='large'
                  title='Create new book'
                />
              </div>
            </Col>
          </Row>
        </Header>
        <Row gutter={36}>{gridBooks === 'list' ? listBooks : tileBooks}</Row>
      </section>
    );
  }
}
