import BooksContainer from '../components/BooksContainer';
import * as actions from '../actions';
import BookSingle from '../components/BookSingle/index'

const purchacedMaterial = (prefix) => {
    return [
        {
            path: `${prefix}`,
            component: BooksContainer,
            exact: true,
            preload: actions.books,
            // preloadOptions: {
            //     alwaysReload: true
            // }
        },

    ]

}

export default purchacedMaterial;
