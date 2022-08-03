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

module.exports = router;
