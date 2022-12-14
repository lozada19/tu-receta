const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model");
const UserModel = require("../models/User.model");
const { isLoggedIn, localsUpdate } = require("../middlewares/auth.js");
const CommentModel = require("../models/Comment.model");
const uploader = require("../middlewares/uploader.js");

//GET
// ------------------------- CREAMOS RECETAS------------------------- //
router.get("/create", (req, res, next) => {
  //se busca los usuarios
  console.log("test");

  //se pasa a la vista

  res.render("recipe/new-recipe");
});

router.post("/create", (req, res, next) => {
  // recibimos la data
  const { recipename, ingredients, preparation } = req.body; //req.body sera la informacion
  console.log(req.session.user);
  //creamos la receta en la data
  RecipeModel.create({
    recipename: recipename,
    ingredients: ingredients,
    preparation: preparation,
    owner: req.session.user._id,
  })
    .then(() => {
      res.redirect("/recipe");
    })
    .catch((err) => {
      next(err);
    });
});
// ---------------------- LISTA DE LAS RECETAS ----------------------//
router.get("/", (req, res, next) => {
  RecipeModel.find()
    .then((oneRecipe) => {
      res.render("recipe/list.hbs", {
        oneRecipe,
      });
    })
    .catch((err) => {
      next(err);
    });
});
//------------------------ DETALLES DE LAS RECETAS -------------------//
router.get("/:recipeId/details", async (req, res, next) => {
  try {
    // obtener el id de la receta
    const { recipeId } = req.params;
    const detailsId = await RecipeModel.findById(recipeId).populate("owner");
    const comment = await CommentModel.find({ recipe: recipeId }).populate(
      "user"
    );
    RecipeModel.findById(recipeId).populate("owner");

    let isOwner = false;
    if (req.session.user !== undefined) {
      if (req.session.user._id == detailsId.owner._id) {
        isOwner = true;
      } else {
        isOwner = false;
      }
      res.render("recipe/recipe-details.hbs", {
        // crear la varieable isOnwer
        detailsId,
        isOwner,
        comment,
      });
    } else {
      res.render("recipe/recipe-details.hbs", {
        detailsId,
        comment,
      });
    }
  } catch (err) {
    next(err);
  }
});

//----------------------- EDITAR UNA RECETA -------------------------//

//renderiza el formulario a editar
router.get("/:recipeId/edit", (req, res, next) => {
  // buscar le receta en la base de datos
  const { recipeId } = req.params;

  //pasa la receta a la vista
  RecipeModel.findById(recipeId)
    .then((dateRecipe) => {
      res.render("recipe/edit-recipe.hbs", {
        dateRecipe,
      });
    })
    .catch((err) => {
      next(err);
    });
});

//recibi la date, edita y actualiza la data
router.post("/:recipeId/edit", (req, res, next) => {
  console.log("RUTA POST");
  // rebibe el id a utilizar
  const { recipeId } = req.params;

  //recibe la data de las recetas
  const { recipename, ingredients, preparation, image } = req.body;

  // actualizar las recetas
  RecipeModel.findByIdAndUpdate(recipeId, {
    recipename: recipename,
    ingredients: ingredients,
    preparation: preparation,
    image: image,
  })
    .then(() => {
      res.redirect("/recipe");
    })
    .catch((err) => {
      next(err);
    });
});

// --------------------- ELIMINAR UNA RECETA ------------------------//

router.post("/:recipeId/delete", (req, res, next) => {
  const { recipeId } = req.params;

  RecipeModel.findByIdAndDelete(recipeId)
    .then(() => {
      res.redirect("/recipe");
    })
    .catch((err) => {
      next(err);
    });
});

//-------------------- IMAGEN ------------------------//
//
router.post("/:recipeId/upload", uploader.single("image"), (req, res, next) => {
  const { recipeId } = req.params;

  console.log(req.body);

  RecipeModel.findByIdAndUpdate(recipeId, {
    image: req.file.path,
  })
    .then(() => {
      res.redirect(`/recipe/${recipeId}/details`);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
