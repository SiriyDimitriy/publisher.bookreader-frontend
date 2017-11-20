// Core
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import DashboardLayout from '../layouts/Dashboard';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    width: 90%;
    background: transparent;
    font-size: 2rem;
  }
`;

@connect(state => ({
  account: state.Account
}))
export default class SchoolDatabase extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { account } = this.props;
    const { firstname, lastname, avatar } = account;
    return (
      <DashboardLayout
        pageTitle='School Database'
        userName={`${firstname} ${lastname}`}
        userAvatar={avatar}
      >
        <Wrapper>
          <h1>SchoolDatabase</h1>
        </Wrapper>
      </DashboardLayout>
    );
  }
}
