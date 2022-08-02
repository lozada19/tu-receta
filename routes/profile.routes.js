const router = require("express").Router();

const { isLoggedIn } = require("../middlewares/auth.js");
const RecipeModel = require("../models/Recipe.model.js");

router.get("/", (req, res, next) => {
  // const { myRecipeId } = req.session.user._id;
  RecipeModel.find({ owner: req.session.user._id })
    .then((myRecipe) => {
      res.render("profile/profile.hbs", { myRecipe });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
