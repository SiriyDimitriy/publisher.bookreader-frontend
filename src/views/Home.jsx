import React from 'react';
//import Navigation from '../components/Navigation'
import { renderRoutes } from 'react-router-config';

export default class App extends React.Component {
  render() {
    return <div>{renderRoutes(this.props.route.routes)}</div>;
  }
}
