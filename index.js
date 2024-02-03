// Load in our Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()
const bodyParser = require('body-parser')
const path = require ('path')

//middleware
app.use(bodyParser.urlencoded({extended: false}))

//file upload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// Load in our RESTful routers
const planetRouter  = require(`./routers/planet`)
const starRouter    = require(`./routers/star`)
const galaxyRouter  = require(`./routers/galaxy`)
const imagesRouter  = require(`./routers/Images`)

// Set the rending engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'twig')

app.use(express.static(path.join(__dirname, '/public')))

//models
const { Galaxy } = require('./models')

// Home page
app.get('/', async (req, res) => {
  const galaxy = await Galaxy.findByPk(1)
  // res.status(200).send('Welcome to Star Tracker Library')
  res.render('../views/home/home.twig', { galaxy })
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  planetRouter)
app.use(`/stars`,    starRouter)
app.use(`/galaxies`, galaxyRouter)
app.use(`/images`, imagesRouter)

// Set our app to listen on port 3000
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});
