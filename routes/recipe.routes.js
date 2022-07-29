const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model");
const isLoggedIn = require("../middlewares/auth.js");

//GET

router.get("/", (req, res, next) => {
  res.render("recipe/list.hbs");
});

router.get("/recipe/:idrecipe/details", (req, res, next) => {
  res.render("recipe/recipe-details.hbs");
});

module.exports = router;
