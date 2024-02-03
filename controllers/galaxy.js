const { Galaxy, Star } = require("../models")

const index = async (req, res) => {
  const galaxies = await Galaxy.findAll({
    include: [ Star ]
  })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(galaxies)
  }
  res.render(`../views/galaxy/index.twig`, { galaxies })
}

const show = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id)
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(galaxy)
  }
  res.render(`../views/galaxy/show.twig`, { galaxy })
}

const create = async (req, res) => {
  // res.render('../views/galaxy/index.twig')
  const galaxy = await Galaxy.create(req.body)
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(galaxy)
  }
  res.redirect(302, `/galaxies/${galaxy.id}`)
}

const update = async (req, res) => {
  const galaxy = await Galaxy.update(req.body, { where: { id: req.params.id } })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(galaxy)
  }
  res.redirect(302, `/galaxies/${req.params.id}`)
}

const remove = async (req, res) => {
  const galaxy = await Galaxy.destroy({ where: { id: req.params.id } })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(galaxy)
  }
  res.redirect(302, `/galaxies`)
}

const form = async (req, res) => {
  // res.status(200).json(`Galaxy#form(:id)`)
  if (`undefined` !== typeof req.params.id) {
    const galaxy = await Galaxy.findByPk(req.params.id)
    res.render(`../views/galaxy/_form.twig`, { galaxy })
  } else {
    res.render(`../views/galaxy/_form.twig`)
  }
}

module.exports = { index, show, create, update, remove, form }