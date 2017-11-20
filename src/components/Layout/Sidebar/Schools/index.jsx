// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled.span`
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 600;
  text-align: left;
  color: #000000;
  display: block;
`;

const Position = styled.span`
  font-size: 1.4rem;
  height: 1.6rem;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.7);
  display: block;
`;

export default class Schools extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    position: PropTypes.string
  };

  render() {
    const { title, position } = this.props;
    return (
      <Wrap>
        <Title>{title}</Title>
        <Position>{position}</Position>
      </Wrap>
    );
  }
}
