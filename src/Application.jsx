import React from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {routes} from './routes'
import {resolveRoutes} from 'react-isomorphic-tools'
import {renderRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import {store, history} from './'
import '../assets/style.sass'


const render = async() => {
    await resolveRoutes({routes, location: history.location, store})

    ReactDOM.render(
        <AppContainer>
            <Provider store={store} key='provider'>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes)}
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('react-root')
    )
}

export {
    render,
    routes
}