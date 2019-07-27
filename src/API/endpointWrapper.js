module.exports = function endpointWrapper(fn, server) {
    return async (req, res, next) => {
        try {
            let result = await fn(req, res, next, server)

            if (typeof result !== 'object' || Array.isArray(result)) {
                result = { data: result }
            }

            let { error, code, ...data } = result

            if (error) {
                if (!code) code = 500

                return res.status(code).send({ error })
            }

            if (code) return res.status(code).send({ ...data })

            return res.send({ ...data })
        } catch (error) {
            // Unkown error
            console.log(error)

            return res.status(503).send({ error })
        }
    }
}
