import App from '../components/App';
import Error from 'react-isomorphic-tools/pages/Error';
import Home from '../views/Home';
import BooksList from '../views/BooksList';
import NewBook from '../components/BookSingle/newBook';
import Auth from '../views/Auth';
import SchoolDatabase from '../views/SchoolDatabase';
import Marketplace from '../views/Marketplace.jsx';
import * as actions from '../modules/Book/bookActions';
import SingleBook from '../modules/Book/viewSingleBook';
// import ViewMode from '../components/BookSingle/ViewMode/index';
import BookSingle from '../modules/Book/components/index.jsx';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/error',
        component: Error,
        exact: false,
        strict: false
      },
      {
        path: '/',
        component: Home,
        routes: [
          {
            path: '/login',
            component: Auth,
            exact: true
          },
          {
            path: '/',
            component: BooksList,

            exact: true
          },
          {
            path: '/books',
            component: BooksList,
            exact: true
            //preload: actions.books
            // preloadOptions: {
            //     alwaysReload: true
            // }
          },
          {
            path: '/books/:id/',
            component: SingleBook,
            //exact: false,
            preload: actions.fetchBook,
            // preloadOptions: {
            //     alwaysReload: true
            // },
            routes: [
              {
                path: '/books/:id/page/:pageNumber',
                component: BookSingle,
                exact: false
              }
            ]
          },
          {
            path: '/school-database',
            component: SchoolDatabase,
            exact: true
          },
          {
            path: '/marketplace',
            component: Marketplace,
            exact: true
          },
          {
            path: '/new-book',
            component: NewBook,
            exact: true
          }
        ]
      }
    ]
  }
];

export { routes };
