// Core
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-isomorphic-tools';
import styled from 'styled-components';

// Components
import { Menu, Icon } from 'antd';

const MenuWrap = styled(Menu)`
  &.ant-menu {
    background-color: #f2f4f4;
    padding: 5rem;
    border-right: none;
    width: auto;
  }
`;

const Item = styled(Menu.Item)`
  color: rgba(0, 0, 0, 0.3);
  &.ant-menu-item {
    margin-bottom: 2rem;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > i {
      display: none;
    }
    & > a {
      color: inherit;
      font-size: 1.8rem;
      line-height: 2.1rem;
      font-weight: 500;
    }
    &.ant-menu-item-selected {
      background: none;
      color: #000;
      & > i {
        display: block;
      }
    }
    &:hover,
    &:hover > a {
      color: #000;
    }
  }
  &.ant-menu-item-active.ant-menu-item {
    color: #000;
  }
`;

@connect(state => ({
  location: state.router.location
}))
export default class Navigation extends PureComponent {
  checkSelectedActiveLink = () => {
    const { pathname } = this.props.location;
    const item = this.items.find(item => item.pathname === pathname);
    if (item) {
      return [item.pathname];
    }
  };

  items = [
    {
      pathname: '/',
      label: 'Books'
    }
  ];

  render() {
    return (
      <MenuWrap selectedKeys={this.checkSelectedActiveLink()}>
        {this.items.map(item => (
          <Item key={item.pathname} style={{ background: 'none' }}>
            <Link to={item.pathname}>{item.label}</Link>
            <Icon type='right' style={{ fontWeight: '900' }} />
          </Item>
        ))}
      </MenuWrap>
    );
  }
}
