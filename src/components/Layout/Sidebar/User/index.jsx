// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import { Avatar } from 'antd';

const UserWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  padding-left: 1rem;
`;

export default class User extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string
  };

  render() {
    const { name, src } = this.props;
    return (
      <UserWrap>
        <Avatar size='large' icon='user' src={src} />
        <Name>{name}</Name>
      </UserWrap>
    );
  }
}
