import Recipe from '../../models/recipe.js'

export default async function setRating(req, res) {
    var recipe = await Recipe.findOne({ id: req.body.id })
    recipe.score += req.body.rating
    recipe.reviews += req.body.rating > 0 ? 1 : -1
    await recipe.save()
    res.status(200).send()
}