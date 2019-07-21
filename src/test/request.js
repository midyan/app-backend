const axios = require('axios')

class Request {
    token = ''

    constructor(baseURL, options = {}) {
        const args = {
            timeout: 60000,
            withCredentials: true,
            maxRedirects: 0,
            headers: this.headers,
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

    get headers() {
        const headers = { 'Content-Type': 'application/json' }

        if (this.token) {
            headers.Authorization = `Bearer: ${this.token}`
        }

        return headers
    }

    async signup(type = 'guest', data) {
        this.logout()

        try {
            const res = await this.post(`/auth/${type}/signup`, data)

            if (res.data.token) {
                this.token = res.data.token
            }

            return this.token
        } catch (error) {
            console.log('@@error', error)
        }
    }

    async login(type = 'guest', data) {
        this.logout()

        const res = await this.post('', data)

        console.log('@@res', res)
    }

    request(method, url, data, options) {
        return this.library(url, {
            ...options,
            data,
            method,
            headers: this.headers,
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
        this.token = ''
    }
}

module.exports = Request
