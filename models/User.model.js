const { Schema, model } = require("mongoose")

const userSchema = new Schema({
 username: {
 type: String,
 unique: true,
 required: true
 },
 email: {
 type: String,
 unique: true,
 required: true
 },
 password: {
 type: String,
 required: true
 }
})

const UserModel = model("user", userSchema )
module.exports = UserModel
