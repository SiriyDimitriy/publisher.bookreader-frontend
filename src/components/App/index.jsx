import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import config from '../../../config';
import { setBaseUrl } from 'react-isomorphic-tools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey500, blueGrey800, grey700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getAccount } from '../../actions/Security';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

injectTapEventPlugin();

const { APP_API_BASE_URL } = config();
setBaseUrl(APP_API_BASE_URL);

@connect(null, dispatch => ({
  actions: bindActionCreators(
    {
      getAccount
    },
    dispatch
  )
}))
export default class App extends React.Component {
  constructor() {
    super();
    const isDev = process.env.NODE_ENV == 'development';
    this.links = [
      {
        rel: 'icon',
        type: 'image/png',
        href: require('../../../assets/favicon.png'),
        sizes: '150x150'
      }
    ];
    this.meta = [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimal-ui'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      }
    ];
    if (!isDev) {
      this.links.push({
        href: '/public/style.css',
        type: 'text/css',
        rel: 'stylesheet'
      });
    }
  }
  componentWillMount() {
    this.props.actions.getAccount();
  }

  render() {
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme(
          {
            palette: {
              primary1Color: blueGrey800,
              primary2Color: grey700,
              primary3Color: grey500
            }
          },
          {
            avatar: {
              borderColor: null
            }
          }
        )}
      >
        <div>
          <LoadingBar
            style={{
              backgroundColor: '#f00',
              top: 0,
              height: '1px',
              zIndex: '10000',
              position: 'fixed',
              boxShadow: '1px 1px 4px 0px rgba(50, 50, 50, 0.75)'
            }}
            updateTime={50}
            progressIncrease={50}
          />
          <Helmet>
            <title>Publisher BookReader</title>
            {this.meta.map((item, index) => <meta {...item} key={index} />)}
            {this.links.map((item, index) => <link {...item} key={index} />)}
          </Helmet>
          {renderRoutes(this.props.route.routes)}
        </div>
      </MuiThemeProvider>
    );
  }
}
