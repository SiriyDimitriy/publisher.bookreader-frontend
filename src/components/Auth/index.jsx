// Core
import React from 'react';
import styled from 'styled-components';

// Components
import FormLogin from './Login';

const Wrapper = styled.div`text-align: center;`;

const Question = styled.h3`
  font-family: Qanelas;
  opacity: 0.6;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: left;
  color: #000000;
  text-align: center;
  margin-bottom: 2rem;
`;
const ButtonS = styled.button`
  background-color: transparent;
  border: solid 0.1rem #000000;
  border-radius: 2.3rem;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0rem;
  text-align: left;
  color: #4a4a4a;
  padding: 1rem 2rem;
  font-family: Qanelas;
  &:hover {
    background-color: #fff;
    outline: none;
  }
  &:focus {
    background-color: #fff;
    outline: none;
  }
`;

export default class AuthMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }
  needRegicter = () => {
    this.setState({
      login: !this.state.login
    });
  };

  render() {
    return (
      <Wrapper>
        <div>{this.state.login ? <FormLogin /> : <span>regicter</span>}</div>
        {
          <Question>
            {this.state.login ? (
              <span>Don’t have an accoun yet?</span>
            ) : (
              <span>Do have an accoun ?</span>
            )}
          </Question>
        }

        <ButtonS onClick={this.needRegicter}>
          {!this.state.login ? <span>Login</span> : <span>Regicter</span>}
        </ButtonS>
      </Wrapper>
    );
  }
}
