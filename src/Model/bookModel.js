const mongoose = require("mongoose");
const moment  = require("moment")
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({ 
    title: {type :String, required:true, unique:true},
    excerpt: {type:String, require:true}, 
    userId: {type:ObjectId, required:true, ref: "user"},
    ISBN: {type: String, required:true, unique:true},
    category: {type:String, required:true},
    subcategory: [String],                                             //, required:mandatory
    reviews: {type:Number, default: 0},                                             //comment: Holds number of reviews of this book
    deletedAt: {type:Date, default:null},                                               //when the document is deleted
    isDeleted: {type:Boolean, default: false},
    releasedAt: {type:Date ,default:Date.now()}                    // format("YYYY-MM-DD")
  },{timestamps:true})

  module.exports = mongoose.model("book", bookSchema )

