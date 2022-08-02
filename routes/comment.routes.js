 const router = require("express").Router();
 //const CommentModel = require("../models/Comment.model");


 router.get("/create", (req, res, next) => {
    res.render("/create/")
 })





module.exports = router;