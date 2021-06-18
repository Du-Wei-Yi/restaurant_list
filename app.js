const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting-1
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, port })
})

// routes setting-2
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantChoosed = restaurantList.results.filter(item => item.id === Number(req.params.restaurant_id))
  res.render('show', { restaurant: restaurantChoosed[0] })
})

// routes setting-3
app.get('/search', (req, res) => {
  const restaurantSearched = restaurantList.results.filter(item => {
    while (item.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || item.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
      return item
  })
  res.render('index', { restaurants: restaurantSearched, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})