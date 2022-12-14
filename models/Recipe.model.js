const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  recipename: String,
  ingredients: String,
  preparation: String,
  image: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const RecipeModel = model("Recipe", recipeSchema);
module.exports = RecipeModel;
