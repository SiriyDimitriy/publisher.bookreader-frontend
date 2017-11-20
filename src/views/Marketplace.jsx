// Core
import React from 'react';
import { connect } from 'react-redux';

// Components
import DashboardLayout from '../layouts/Dashboard';
import MarketplaceContainer from '../components/MarketplaceContainer';

@connect(state => ({
  account: state.Account
}))
export default class Marketplace extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    const { account } = this.props;
    const { firstname, lastname, avatar } = account;
    return (
      <DashboardLayout
        pageTitle='Marketplace'
        subTitle='Browse and purchase material for your school'
        userName={`${firstname} ${lastname}`}
        userAvatar={avatar}
      >
        <div>
          <MarketplaceContainer />
        </div>
      </DashboardLayout>
    );
  }
}
