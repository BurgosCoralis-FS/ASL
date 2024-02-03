const { Star, Galaxy, Planet } = require('../models')

const index = async (req, res) => {
  const stars = await Star.findAll({
    include: [ Galaxy, Planet]
  })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(stars)
  }
  res.render(`../views/star/index.twig`, { stars })
}

const show = async (req, res) => {
  const star = await Star.findByPk(req.params.id)
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(star)
  }
  res.render(`../views/star/show.twig`, { star })
}

const create = async (req, res) => {
  // res.render('../views/stars/index.twig')
  const star = await Star.create(req.body)
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(star)
  }
  res.redirect(302, `/stars/${star.id}`)
}

const update = async (req, res) => {
  const star = await Star.update(req.body, { where: {id: req.params.id } })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(star)
  }
  res.redirect(302, `/stars/${req.params.id}`)
}

const remove = async (req, res) => {
  const star = await Star.destroy({ where: { id: req.params.id } })
  if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(star)
  }
  res.redirect(302, `/stars`)
}

const form = async (req, res) => {
  // res.status(200).json(`Star#form(:id)`)
  if (`undefined` !== typeof req.params.id) {
    const star = await Star.findByPk(req.params.id)
    res.render(`../views/star/_form.twig`, { star })
  } else {
    res.render(`../views/star/_form.twig`)
  }
}

module.exports = { index, show, create, update, remove, form }
