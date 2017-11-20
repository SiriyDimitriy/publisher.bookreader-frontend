// Core
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import { Menu, Dropdown, Icon } from 'antd';

// Actions
import { logout } from '../../../../actions/Security';

@connect(null, dispatch => ({
  actions: bindActionCreators(
    {
      logout
    },
    dispatch
  )
}))
export default class Settings extends PureComponent {
  //   static propTypes = {
  //   };

  handleClick = e => {
    if (e.key === 'logout') {
      this.props.actions.logout();
    }
  };
  render() {
    const menu = (
      <Menu onClick={this.handleClick}>
        <Menu.Item key='logout'>Logout</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']} placement='bottomCenter'>
        <Icon style={{ cursor: 'pointer' }} type='setting' />
      </Dropdown>
    );
  }
}
