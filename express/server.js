const express = require('express')
const init = require('./utils/moodle')
const morgan = require('morgan')
const serverless = require('serverless-http');

const app = express()
const port = process.env.PORT || 3000

//allow CORS
app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    next()
})

app.use(morgan('dev'))
app.set('view engine', 'pug')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const router = express.Router()

router.get('/get-events', async (req, res) => {
    const {wwwroot, token} = req.query
    
    const data = await init({wwwroot, token, callback: do_something})

    res.json(data)
})

router.get('/', (req, res) => {
    res.render('index')
})

async function do_something(client) {
    return await client.call({
        wsfunction: "core_calendar_get_calendar_upcoming_view",
    })
}

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app)