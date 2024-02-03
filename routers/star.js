// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

//HTML5 routes
router.get(`/new`, starCtlr.form)
router.get(`/:id/edit`, starCtlr.form)
router.get(`/:id/delete`, starCtlr.remove)
router.post(`/:id`, starCtlr.update)

router.get(`/`, starCtlr.index)         // show all stars
router.post(`/`, starCtlr.create)       // create star
router.get(`/:id`, starCtlr.show)       // show star
router.put(`/:id`, starCtlr.update)      // update a star
router.delete(`/:id`, starCtlr.remove)  // remove a star

// export "router"
module.exports = router
