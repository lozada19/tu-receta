const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  message: {
    type: String,
    required: true,
  },
});

const CommentModel = model("Comment", commentSchema);
module.exports = CommentModel;
