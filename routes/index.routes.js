const router = require("express").Router();
const { localsUpdate } = require("../middlewares/auth");

router.use(localsUpdate);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const recipeRoutes = require("./recipe.routes");
router.use("/recipe", recipeRoutes);

const commentRoutes = require("./comment.routes");
router.use("/comment", commentRoutes);

module.exports = router;
