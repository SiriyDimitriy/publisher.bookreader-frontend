import createHistory from 'history/createBrowserHistory'
import {render} from './Application'
import configureStore from './store/configureStore'
const history = createHistory()
const store = configureStore()


render()

if (module.hot) module.hot.accept('./Application', render)



export {
    store,
    history
}