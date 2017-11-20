import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as bookActions from '../bookActions';
import styled from 'styled-components';
import EditMode from './EditMode/index';
import BookSingleNavigation from './EditMode/BookSingleNavigation';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 13.3rem;
`;

const mapStateToProps = state => {
  return {
    copy: state.bookReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pageActions: bindActionCreators(
      { ...bookActions, push },
      dispatch
    )
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class NewBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: true
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Section>
        <BookSingleNavigation
          beditModeook={this.state.editMode}
          newBook={true}
        />
        <EditMode
          copy={this.props.copy}
          pageActions={this.props.pageActions}
          editMode={this.state.editMode}
        />
      </Section>
    );
  }
}
