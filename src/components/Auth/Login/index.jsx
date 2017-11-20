// Core
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

// Components
import FormLogin from './form';
// Actions
import { login } from '../../../actions/Security';

const Wrapper = styled.div`
  max-width: 40rem;
  min-width: 100%;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2.2rem 4.5rem 0 rgba(0, 0, 0, 0.05);
`;
const HeaderWrap = styled.div`
  background-color: #d1d1d1;
  width: 100%;
  padding: 3rem 9rem 3rem 4rem;
  min-height: 8.5rem;
  border-radius: 1rem 1rem 0 0;
`;
const Header = styled.h2`
  opacity: 0.7;
  font-size: 2.5rem;
  font-weight: 500;
  text-align: left;
  color: #000000;
  font-family: Qanelas;
`;
const FormWrap = styled.div`
  width: 100%;
  padding: 2.5rem 6rem 3rem 6rem;
`;

@connect(
  null,
  dispatch => ({
    actions: bindActionCreators(
      {
        login,
        push
      },
      dispatch
    )
  })
)
export default class LoginBlock extends React.Component {
  LoginUser = form => this.props.actions.login(form);
  RedirectToMain = () => {
    // window.location = '/';
    this.props.actions.push('/');
  };

  render() {
    return (
      <Wrapper>
        <HeaderWrap>
          <Header>For Students, Teachers, School admins</Header>
        </HeaderWrap>
        <FormWrap>
          <FormLogin
            onSubmit={this.LoginUser}
            onSubmitSuccess={this.RedirectToMain}
          />
        </FormWrap>
      </Wrapper>
    );
  }
}
