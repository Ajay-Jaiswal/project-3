const express = require('express')
const router = express.Router()
const userController = require("../Controllers/userController")
const bookController = require("../Controllers/bookController")
const reviewController = require("../Controllers/reviewController")

router.get('/*', function(req,res){
    res.status(404).send({message:"url/endpoint sahi se do"})
})


router.post('/register', userController.Createuser)
router.post('/login', userController.loginUser)

router.post("/books", bookController.Createbooks)
router.get("/books", bookController.Getbooks)



module.exports = router;