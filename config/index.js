const isBrowser = require('is-browser')

class Config {
    constructor() {
        const {NODE_ENV = 'production', ...rest} = isBrowser ? config : process.env // eslint-disable-line no-undef
        this.env = rest

        this.baseConfig = require(`./config.${NODE_ENV}.json`)
        this.config = {}

        this.build(this.env, this.baseConfig) // build by vars of environment
        this.build(this.baseConfig, this.env) // build by vars of config.${env}.json
        this.setAuxiliaryProperties()
    }

    build = (v1, v2) => {
        for (let k in v1) {
            if (Object.prototype.hasOwnProperty.call(v1, k) && /^APP_/.test(k)) {
                this.set(k, v2[k] || v1[k])
            }
        }
    }

    setAuxiliaryProperties = () => {
        const {get, set} = this
        set('APP_API_ORIGIN', `http${get('HTTPS') ? 's' : ''}://` + get('APP_API_DOMAIN'))
        set('APP_API_BASE_URL', get('APP_API_ORIGIN') + get('APP_API_PREFIX'))
    }

    set = (key, value) => {
        this.config[key] = value
    }

    get = (key) => {
        return this.config[key] || ''
    }

    getConfig = () => {
        return this.config
    }
}

const {getConfig} = new Config()

export {
    getConfig as default
}
