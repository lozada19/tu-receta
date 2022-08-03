const router = require("express").Router();
const CommentModel = require("../models/Comment.model");

router.post("/:recipeId/create", (req, res, next) => {
  const { recipeId } = req.params;
  const { message } = req.body;

  CommentModel.create({
    user: req.session.user._id,
    recipe: recipeId,
    message: message,
  })
    .then(() => {
      res.redirect(`/recipe/${recipeId}/details`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:recipeId" , (req, res, netx) => {

  const { recipeId } = req.params

  // se tiene que colocar el id de la recta y usuerio 
  CommentModel.find({ recipe: recipeId }).populer("user")
  .then((commentRecipe) => {
    res.render("recipe/details", {
     commentRecipe ,
    })
  })
  .catch((err) => {
    next(err);
  })
})


module.exports = router;
