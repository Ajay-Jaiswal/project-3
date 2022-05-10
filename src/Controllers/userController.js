const userModel = require("../Model/userModel")
const jwt = require("jsonwebtoken");
const validator = require("../util/validator");
const secretKey = "Functionup-Uranium";





const Createuser = async function(req,res){
    try{
    let user = req.body 
    const {title,name,phone,email,password} = user

    if(!validator.isValid(title)){
        return res.status(400).send({status:false, message: "title is require"});
    }

    if (!validator.isValidTitle(title)) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Title should be among Mr, Mrs and Miss`,
          });
      }

    if(!validator.isValid(name)){
        return res.status(400).send({status:false, message: "Name is require"});
    }


    if(user.phone.length !== 10){
        return res.status(400).send({status:false , message: "mobile number is required 10 digit"})
    }

    if(!/^\+?([6-9]{1})\)?[-. ]?([0-9]{1})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone)){
      return res.status(400).send({status:false, message:"give proper phone no. in form of number"})
    }
    
    let mob = await userModel.findOne({phone: user.phone })

    if(mob !== null){
        return res.status(400).send({status:false, Message:`${phone} mobile already use`})
    }



    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res.status(400).send({status: false,message: `Email should be a valid email address`});
        return;
      }

      const isEmailAlredyUsed = await userModel.findOne({ email });
      if (isEmailAlredyUsed) {
        return res
          .status(400)
          .send({
            status: false,
            message: `${email} email address is already registered`,
          });
      }

      if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)){
        return res.status(400).send({status:false , message: "password required at least one number, one lowercase and one uppercase letter at least eight characters"})
    }

    if(user.password.length > 15){
        return res.status(400).send({status:false , message: "password length is required less than 15"})
    }

    let data = await userModel.create(user)
    res.status(201).send({status: true, message: data})
}
catch(err){
    res.status(500).send({status:false, message: err.message})
}
}


const loginUser = async function (req, res) {
    try {
      const requestBody = req.body;
      if (!validator.isValidRequestBody(requestBody)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "Invalid request parameters. Please provide login details",
          });
      }
  
      //Extract params
      let { email, password } = requestBody;
  
      //Validation starts -
      if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: `Email is required for login` });
      }
  
      //Email validation whether it is entered perfectly or not.
      email = email.trim();
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res
          .status(400)
          .send({
            status: false,
            message: `Email should be a valid email address`,
          });
        return;
      }
      if (!validator.isValid(password)) {
        //Password is entered correctly or not.
        return res
          .status(400)
          .send({ status: false, message: `Password is mandatory for login` });
      }
      //Validitions ends
  
      const findAuthor = await userModel.findOne({ email, password }); //finding author details in DB to get a match of the provided Email and password.
  
      if (!findAuthor) {
        return res
          .status(401)
          .send({
            status: false,
            message: `Invalid login credentials. Please check the details & try again.`,
          });
      }
  
      //creating JWT
      let token = jwt.sign({
        userId: findAuthor._id,
        iat: Math.floor(Date.now() / 1000), //time of issuing the token./1000 convert millisecond to second
        exp: Math.floor(Date.now() / 1000) + 60*60*24  //setting token expiry time limit.
    }, secretKey);


      res.header("x-api-key", token);
      return res
        .status(201)
        .send({
          status: true,
          message: `user login successfully`, 
          data: { token }
        });
    } catch (error) {
      res.status(500).send({ status: false, Error: error.message });
    }
  };



module.exports.Createuser = Createuser
module.exports.loginUser = loginUser