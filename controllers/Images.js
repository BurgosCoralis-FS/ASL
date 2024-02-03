const { Image, Variant } = require("../models")

const index = async (req, res) => {
    const images = await Image.findAll({
        include: [ Variant ]
    })

    if (req.headers.accept.indexOf('/json') > -1){
        return res.status(200).json(images)
    }

    res.render(`../views/images/index.twig`, { images })
}

const show = async (req, res) => {
    const image = await Image.findByPk(req.params.id, { include: Variant })

    if (req.headers.accept.indexOf('/json') > -1){
        return res.status(200).json(image)
    }

    res.render(`../views/images/show.twig`, { image })
}

const create = async (req, res, next) => {
    const image = await Image.create(req.body)

    // Sets a pretext "imageId" for our upload middleware
    req.imageId = image.id
    req.variantId = image.variantId

    // Invoke our upload middleware with next()
    next()

    res.redirect(302, `/images/${image.id}`)
}

const update = async (req, res, next) => {
    const image = await Image.update(req.body, {
        where: { id: req.params.id }
    })
    // Sets a pretext "imageId" for our upload middleware
    req.imageId = req.params.id
    // Invoke our upload middleware with next()
    next()
    res.redirect(`/images/${req.params.id}`)
}

const remove = async (req, res) => {
    const image = await Image.destroy({ where: { id: req.params.id } })
    
    if (req.headers.accept.indexOf('/json') > -1){
    return res.status(200).json(image)
    }
    res.redirect(302, `/images`)
}

const form = async (req, res) => {
    if (`undefined` !== typeof req.params.id) {
        const image = await Image.findByPk(req.params.id)
        const variants = await Variant.findAll()
        res.render(`../views/images/_form.twig`, { image, variants })
    } else {
        const variants = await Variant.findAll()
        res.render (`../views/images/_form.twig`, { variants })
    }
}

module.exports = { index, show, create, update, remove, form }