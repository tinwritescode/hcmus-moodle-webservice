const express = require('express')
const init = require('./utils/moodle')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.set('view engine', 'pug')

app.get('/get-events', async (req, res) => {
    const {wwwroot, token} = req.query
    
    const data = await init({wwwroot, token, callback: do_something})

    res.json(data)
})

app.get('/', (req, res) => {
    res.render('index')
})
    
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

async function do_something(client) {
    return await client.call({
        wsfunction: "core_calendar_get_calendar_upcoming_view",

    })
}
