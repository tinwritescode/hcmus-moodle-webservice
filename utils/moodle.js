const moodle_client = require('moodle-client')

module.exports = async function init({wwwroot, token, callback}) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await moodle_client.init({
                wwwroot,
                token
            })

            const result = await callback(client)

            resolve(result)
        }
        catch (e) {
            reject(e)
        }
    })
}
