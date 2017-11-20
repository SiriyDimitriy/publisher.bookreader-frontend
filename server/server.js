import {resolve} from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import proxy from 'http-proxy-middleware'
import areIntlLocalesSupported from 'intl-locales-supported'
import serverMiddleware from './serverMiddleware'
import config from '../config'

const app = express()
const {APP_NODE_LOCALES, APP_API_ORIGIN} = config()

if (global.Intl) {
    if (!areIntlLocalesSupported(APP_NODE_LOCALES)) {
        require('intl')
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    global.Intl = require('intl');
}

app.use(cookieParser())
app.use('/public', express.static(resolve(__dirname, '../public')))
app.get('/favicon:ext', (req, res)=> {
    res.sendFile(resolve(__dirname, `../assets/favicon${req.params.ext}`))
})
app.use('/uploads', proxy({target: APP_API_ORIGIN, changeOrigin: true}))
app.use(serverMiddleware)


app.listen(3000, ()=> {
    console.log('Page server is listening on port 3000!')
})
