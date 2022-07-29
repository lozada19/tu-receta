const { Schema, model } = require("mongoose");

const commentSchema = new Schema({

username: { type: Schema.Types.ObjetId, ref: "User"},
recipename: { type: Schema.Types.ObjetId, ref: "Recipe"},
message: {
type: String,
required: true
},
})

const CommentModel= model("comment", commentSchema);
module.exports = CommentModel;