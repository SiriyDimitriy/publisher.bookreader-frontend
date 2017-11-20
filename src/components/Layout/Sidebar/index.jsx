// Core
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import { Icon } from 'antd';
import User from './User';
import Settings from './Settings';
import Schools from './Schools';
import Navigation from './Navigation';

const SidebarWrap = styled.div`font-family: Qanelas;`;

const SidebarTop = styled.div`
  font-size: 2rem;
  line-height: 1.5;
  height: 20.5rem;
  padding: 3.5rem 4rem;
  border-bottom: solid 1px rgba(0, 0, 0, 0.14);
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const IconWrap = styled.div`
  i {
    margin-left: 2rem;
    cursor: pointer;
  }
`;

export default class Sidebar extends Component {
  render() {
    const { userName, userAvatar, onCollapse, collapsed } = this.props;
    return (
      <SidebarWrap>
        <SidebarTop>
          <UserWrap>
            <User name={userName} src={userAvatar} />
            <IconWrap>
              <Settings />
              <Icon
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={onCollapse}
                style={
                  collapsed
                    ? { position: 'fixed', left: '0', zIndex: '9' }
                    : null
                }
              />
            </IconWrap>
          </UserWrap>
          {/* <Schools title='Kyiv Regional School #12' position='School Admin' /> */}
        </SidebarTop>
        <Navigation />
      </SidebarWrap>
    );
  }
}
