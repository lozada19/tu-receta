const router = require("express").Router();
const RecipeModel = require("../models/Recipe.model");
const UserModel = require("../models/User.model")


//GET
// ------------------------- CREAMOS RECETAS------------------------- //
router.get("/create", (req, res, next) => {

  //se busca los usuarios
  console.log("test")

  //se pasa a la vista
  
    res.render("recipe/new-recipe")
      
   
})

router.post("/create", (req, res, next) => {

  // recibimos la data
  const { recipename, ingredients, preparation } = req.body  //req.body sera la informacion 
  console.log(req.session.user)
  //creamos la receta en la data
  RecipeModel.create({
    recipename: recipename,
    ingredients: ingredients,
    preparation: preparation,
    owner:  req.session.user._id 
  })
  .then(()=>{
    res.redirect("/recipe")
  })
  .catch((err) =>{
    next(err)
  } )

})
// ---------------------- LISTA DE LAS RECETAS ----------------------//
router.get("/", (req, res, next) => {
  RecipeModel.find()
  .then((oneRecipe) => {
    res.render("recipe/list.hbs", {
      oneRecipe
    })
  })
  .catch((err) => {
    next(err)
  })

});
//------------------------ DETALLES DE LAS RECETAS -------------------//
router.get("/:recipeId/details", (req, res, next) => {
 // obtener el id de la receta
  const { recipeId } = req.params

  RecipeModel.findById(recipeId).populate("owner")
  .then((detailsRecipe) => {
    console.log(detailsRecipe)
    res.render("recipe/recipe-details.hbs", {
      detailsRecipe
    })
  })
  .catch((err) => {
    next(err)
  })
  
});
//----------------------- EDITAR UNA RECETA -------------------------//
 
//renderiza el formulario a editar
router.get("/:recipeId/edit", (req, res, next )=> {
  // buscar le receta en la base de datos
  const { recipeId } = req.params

  //pasa la receta a la vista
  RecipeModel.findById(recipeId)
  .then((dateRecipe) => {
    res.render("recipe/edit-recipe.hbs", {
      dateRecipe 
    })
  })
  .catch((err) => {
    next(err)
  })
})

//recibi la date, edita y actualiza la data
router.post("/:recipeId/edit", ( req, res, next ) => {
  console.log("RUTA POST")
  // rebibe el id a utilizar
   const { recipeId } = req.params

  //recibe la data de las recetas
  const { recipename, ingredients, preparation } = req.body

  // actualizar las recetas
  RecipeModel.findByIdAndUpdate(recipeId, {
    recipename: recipename,
    ingredients: ingredients,
    preparation: preparation,
  })
  .then(() => {
    res.redirect("/recipe")
  })
  .catch((err) => {
    next(err)
  })

})

// --------------------- ELIMINAR UNA RECETA ------------------------//

router.post("/:recipeId", (req, res, next) => {
  const { recipeId } = req.params

  RecipeModel.findByIdAndDelete(recipeId)
  .then((deleteRecipe) => {
    res.redirect("recipe/list.hbs", {
      deleteRecipe
    })
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
