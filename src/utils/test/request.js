const axios = require('axios')

class Request {
    constructor(baseURL, options = {}) {
        this.cookies = false

        const args = {
            timeout: 60000,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            maxRedirects: 0,
            ...options,
        }

        if (baseURL) args.baseURL = baseURL

        this.library = axios.create(args)

        this.library.interceptors.response.use(
            response => {
                return response
            },
            function(error) {
                // Do something with response error

                if (error) {
                    const { response, request } = error

                    if (response && response.status === 302) {
                        return Promise.resolve(error)
                    }

                    if (request && request.status === 302) {
                        return Promise.resolve(error)
                    }

                    if (error && error.status === 302) {
                        return Promise.resolve(error)
                    }
                }

                return Promise.reject(error.response || error)
            }
        )
    }

    async login(data) {
        this.logout()

        const res = await this.post('/auth/guest/login', data)

        console.log('@@res', res)
    }

    request(method, url, data, options) {
        return this.library(url, {
            ...options,
            data,
            method,
        })
    }

    post(url, data, options = {}) {
        return this.request('post', url, data, options)
    }

    get(url, data, options = {}) {
        return this.request('get', url, data, options)
    }

    put(url, data, options = {}) {
        return this.request('put', url, data, options)
    }

    delete(url, data, options = {}) {
        return this.request('delete', url, data, options)
    }

    logout() {
        this.cookies = undefined
    }
}

module.exports = Request
