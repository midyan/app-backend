const getStrategy = type => require(`../passport/${type}`)

module.exports = type =>
    async function signup(req, res) {
        const Strategy = getStrategy(type)

        // Set Auth Field
        // Validate required fields
        // Validate if user exists
        // Create User
        // Redirect to login url of the strategy
    }
