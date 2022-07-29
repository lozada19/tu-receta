const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
 recipename: String,
 ingredients: String,
 preparation: String,
 image: {
 type: String,
},
 owner:{ type: Schema.Types.ObjetId, ref: "User"}
});
const RecipeModel= model("recipe", recipeSchema);
module.exports = RecipeModel;