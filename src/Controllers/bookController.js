const bookModel = require("../Model/bookModel");
const userModel = require("../Model/userModel")
const validator = require("../util/validator");


const Createbooks  = async function(req,res){
    try{
    let newbook = req.body

    const{title,excerpt,userId,ISBN,category,subcategory} = newbook

    if(!validator.isValid(title)){
        return res.status(400).send({status:false, message: "title is required"})
    }

    if(!validator.isValid(excerpt)){
        return res.status(400).send({status:false, message: "excerpt is required"})
    }

    if(!validator.isValid(userId)){
        return res.status(400).send({status:false, message: "userId is required"})
    }

    if(!validator.isValid(ISBN)){
        return res.status(400).send({status:false, message: "ISBN is required"})
    }

    if(!validator.isValid(category)){
        return res.status(400).send({status:false, message: "category is required"})
    }

   /* let _id = userId.toString()

    let validUserId = await userModel.findById({_id})
    if (validUserId == null) return res.status(400).send({ status:false, msg: "user Id not exist" })

    if(validUserId != userId){
        res.status(400).send({status:false, message: "userId is not matchS"})
    } */


    let createbook = await bookModel.create(newbook)
    res.status(201).send({status:false, Data:createbook})
    }
    catch(err){
        res.status(500).send({status:false, message: err.message})
    }
}

const Getbooks = async function(req,res){
    
    let books = await bookModel.find({isDeleted : false})
    res.status(200).send({status:true, data: books})

}

module.exports.Createbooks = Createbooks
module.exports.Getbooks = Getbooks




