require("dotenv").config()
const http = require('http')
const connectToMongo = require('./config/database')
const express = require('express')
const cors = require('cors')
const all_routes = require('./routes/index')
const redirect_route = require("./controllers/redirect_route")


connectToMongo()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



app.use(all_routes)
app.get('*', redirect_route)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports = app