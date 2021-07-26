const express = require('express');
const entryRouter = require('./routes/entry.routes');
const path = require('path');
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
app.all('*', (req, res) =>{
    res.status(404).send('Такой страницы нет')
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})