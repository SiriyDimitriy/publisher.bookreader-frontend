import React from 'react';
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import * as bookActions from './bookActions.js';
import BookSingleNavigation from './components/EditMode/BookSingleNavigation/index';
import BookHeadersNavigation from './components/ViewMode/BookHeadersNavigation/index';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 3rem;
  margin-top: 13.3rem;
`;

const mapStateToProps = state => {
    return {
        book: state.bookReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pageActions: bindActionCreators(bookActions, dispatch)
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SingleBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.props.pageActions.fetchBook(this.props.match.params.id)
    }

    bookModeHandler = editMode => {
        if (editMode) {
            this.setState({editMode: false})
        } else {
            this.setState({editMode: true});
        }
    };

    render() {
        const {book} = this.props;
        if (!book || !book.id) {
            return null;
        }
        const pages = book.pages;
        let allHeaders = [];
        pages.map((page, i) => {
            if (page.headers.length) {
                page.headers.map(header => {
                    if (header.header) {
                        allHeaders.push({
                            page: i + 1,
                            header: header.header
                        });
                    }
                });
            }
        });
        return (
            <Section>
                <BookSingleNavigation
                    book={book}
                    editMode={this.state.editMode}
                    bookModeHandler={this.bookModeHandler}
                />
                {!this.state.editMode ? (
                    <BookHeadersNavigation allHeaders={allHeaders} id={book.id} book={book}/>
                ) : null}
                {renderRoutes(this.props.route.routes, {
                    editMode: this.state.editMode,
                    currentPage: this.state.currentPage,
                    book: this.props.book,
                    pageActions: this.props.pageActions
                })}
            </Section>
        );
    }
}
