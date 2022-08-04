# Tu Receta 

## Descripción

Una pagina wed donde puedes crear tus recetas y mostraslas 

## Estructura 

- pagina de inicio: El usuario puede ver acceder a la pagina de inicio ver las recetas e iniciar sesion y registarse 

- registarse: El usuario se tiene que registar para poder crear las recetas

- iniciar sesion: El usuario al iniciar sesion puede crear, eliminar editar y tener sus propias recetas en su perfil

- cerrar sesion: El usuario tiene que cerrar sesion para asegurarme de que nadie acceda a mi cuenta

# RUTAS: 

# Registro de usuario 

- GET /auth/signup
 - render("auth/signup.hbs")

- POST /auth/signup
 - render("auth/signup.hbs"
 - redirect("/auth/login")

# Iniciar sesion

- GET /auth/login
 - render("auth/login")

- POST /auth/login
 - render("auth/login"
 - req.session.user 
       - _id: newUser._id,
       - email: newUser.email,
 - res.redirect("/profile")

# Cerrar sesion

- GET /auth/logout
 - res.redirect("/")

# Perfil 

- GET /profile
 - owner: req.session.user._id
 - render("profile/profile.hbs"

# Crear recetas

- GET /recipe/create 
 - render("recipe/new-recipe")

- POST /recipe/create 
 - body 
  - recipename
  - ingredients
  - preparation
 - redirect("/recipe") 

# Lista de las recetas

- GET /recipe
 - render("recipe/list.hbs"

# Detalles de las recetas 

- GET recipe/:recipeId/details
 - params 
  - recipeId
 - populate("owner")
 - populate("user")
 - render("recipe/recipe-details.hbs"

# Editar una receta 

- GET /recipe/:recipeId/edit
 - render("recipe/edit-recipe.hbs"

- POST  /recipe/:recipeId/edit
 - body: 
  - recipename
  - ingredients
  - preparation
  - image
 - redirect("/recipe")

# Eliminar recetas 

- POST /recipe/:recipeId/delete
 - redirect("/recipe")

# Comentarios 

- POST comment/:recipeId/create
 - body: 
  - message
 - redirect(`/recipe/${recipeId}/details`)

- GET  comment/:recipeId
 - render("recipe/details"

- POST /:commentId/delete
 - redirect("/recipe")

## Modelos

# UserModel

- username: 
  - type: String,
  - unique: true,
  - required: true
 
- email: 
  - type: String,
  - unique: true,
  - required: true

- password: 
  - type: String,
  - required: true

# RecipeModel 

- recipename: String,
-  ingredients: String,
- preparation: String,
- image: 
    - type: String,
  
- owner:
    - type: Schema.Types.ObjectId,
    - ref: "User",
  
# CommentModel   

- user: 
    - type: Schema.Types.ObjectId,
    -  ref: "User",
  
- recipe: 
    - type: Schema.Types.ObjectId,
    - ref: "Recipe",

- message: 
    - type: String,
    - required: true,



## Enlaces

### Trello
 
### Git
[Repository Link](https://github.com/rebloza/tu-receta.git)
[Deploy Link](https://tu-recetas.herokuapp.com/)

### Diapositivas

