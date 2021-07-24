const express = require('express');
const moment = require('moment')
const entryRouter = require('./routes/entry.routes');
const path = require('path');
const db = require('./db');
const app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', entryRouter)

app.get('/', (async (req, res) => {
    res.render('home')
}))


app.listen(3000, () => {
    console.log("server is running on port 3000")
})