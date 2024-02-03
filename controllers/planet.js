const { Planet } = require ('../models')

const index = async (req, res) => {
  const planets = await Planet.findAll()
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(planets)
  }
  res.render(`../views/planet/index.twig`, { planets })
}

const show = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id)
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(planet)
  }
  res.render(`../views/planet/show.twig`, { planet })
}

const create = async (req, res) => {
  // res.render('../views/planet/index.twig')
  const planet = await Planet.create(req.body)
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(planet)
  }
  res.redirect(302, `/planets/${planet.id}`)
}

const update = async (req, res) => {
  const planet = await Planet.update(req.body, { where: { id: req.params.id} })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(planet)
  }
  res.redirect(302, `/planets/${req.params.id}`)
}

const remove = async (req, res) => {
  const planet = await Planet.destroy({ where: { id: req.params.id } })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(planet)
  }
  res.redirect(302, `/planets`)
}

const form = async (req, res) => {
  // res.status(200).json(`Planet#form(:id)`)
  if (`undefined` !== typeof req.params.id) {
    const planet = await Planet.findByPk(req.params.id)
    res.render(`../views/planet/_form.twig`, { planet })
  } else {
    res.render(`../views/planet/_form.twig`)
  }
}

module.exports = { index, show, create, update, remove, form }
