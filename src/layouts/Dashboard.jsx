// Core
import React, { PureComponent } from 'react';
import styled from 'styled-components';

// Components
import { Layout } from 'antd';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';

const LayoutHeader = styled(Layout.Header)`
  &.ant-layout-header {
    font-family: Qanelas;
    font-size: 3rem;
    height: auto;
    padding: 7rem 5rem;
    line-height: 1.5;
    background-color: #ffffff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.09);
    height: 20.5rem;
  }
`;

const LayoutContent = styled(Layout.Content)`
  background-color: #fafafa;
  padding: 5rem;
`;

export default class Dashboard extends PureComponent {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { children, pageTitle, subTitle, userName, userAvatar } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint={'sm'}
          collapsedWidth={0}
          width='375'
          style={{
            backgroundColor: '#f2f4f4',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
        >
          <Sidebar
            userName={userName}
            userAvatar={userAvatar}
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          />
        </Layout.Sider>
        <Layout
          style={{
            marginLeft: !collapsed ? 375 : 0,
            transition: 'margin-left 0.3s ease'
          }}
        >
          <LayoutHeader>
            <Header pageTitle={pageTitle} subTitle={subTitle} />
          </LayoutHeader>
          <LayoutContent>{children}</LayoutContent>
        </Layout>
      </Layout>
    );
  }
}
