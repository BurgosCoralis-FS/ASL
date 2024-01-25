// Load in our Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()
const bodyParser = require('body-parser')

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Load in our RESTful routers
const planetRouter  = require(`./routers/planet.js`)
const starRouter    = require(`./routers/star.js`)
const galaxyRouter  = require(`./routers/galaxy.js`)

// Home page
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Star Tracker Library')
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  planetRouter)
app.use(`/stars`,    starRouter)
app.use(`/galaxies`, galaxyRouter)

// Set our app to listen on port 3000
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});
