const Users = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Notes = require('../models/noteModel')
// Register view

const registerView = async (req, res) =>{
  try {
    const {username, email, password} = req.body;
    const user = await Users.findOne({email:email})
    if(user) return res.status(400).json({msg : "The email already exists"})
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = Users({
      username,
      email,
      password : passwordHash
    })
    await newUser.save();
    res.status(200).json({msg: 'Sign up succesfull'});
  }catch(err) {
    return res.status(500).json({msg: err.message})
  }
}

//loginView
const loginView = async (req, res) =>{
  try {
    const {email, password} = req.body;
    const user = await Users.findOne({email : email})
    if (!user) return res.status(400).json({msg: 'User does not exists'})
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: 'Incorrect Password'});
    //if success create  token
    const payload = {id:user._id, name : user.username}
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"});
    res.status(200).json({token, user:user.username})
   // res.json({msg: 'Sign in succesfull'});
  }catch(err) {
    return res.status(500).json({msg: err.message})
  }
}

//verification
const verifiedToken = (req, res) =>{
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) =>{
                if(err) return res.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } 

//new category
const addCategories = async (req, res) =>{
  try {
    const {category} = req.body;
    const user = await Users.findById(req.user.id)
    
    if (user.categories.includes(category)){
      return res.status(400).json({msg: 'Category already exists'}) 
    } else{
            await Users.findByIdAndUpdate(req.user.id,{
              $push: {
             "categories": category
            }
            })
          return res.json({msg: 'category added succesfully'})
       
    }
  }catch(err) {
    return res.status(500).json({msg: err.message})
  }
}

const deleteCategories = async(req, res) =>{
  try {
    const {category} = req.body;
    const user = await Users.findById(req.user.id)
    if (!user.categories.includes(category)){
      return res.status(400).json({msg: "Category doesn't  exists"}) 
    }else{
          await Users.findByIdAndUpdate(req.user.id,{
              $pull: {
             "categories": category
            }
            })
           const response=   await Notes.updateMany({category, user_id:req.user.id}, {
                 $set: {
             "category": "None"
            }
           })
    return res.json(response)
      
    }
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

const getAllCategories = async(req, res)=>{
  try {
    const user = await Users.findById(req.user.id)
    return res.send(user.categories)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

const renameCatagories = async(req, res) =>{
  try {
    const {ogName, newName} = req.body;
    const user = await Users.findById(req.user.id)
    if (!user.categories.includes(ogName)){
      return res.status(400).json({msg: "Category doesn't  exists"}) 
    }else{
        let category = user.categories
        let index = category.indexOf(ogName)
        if (index !== -1) {
            category[index] = newName;
        }
         let response=  await Users.findByIdAndUpdate(req.user.id,{
              $set: {
             "categories": category
            }
            })
        let data = await Notes.updateMany({category,  user_id:req.user.id},{
            $set: {
             "category": newName
            }
        })
    return res.json(data)
      
    }
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}


module.exports = {
  registerView,
  loginView,
  verifiedToken,
  addCategories,
  deleteCategories,
  getAllCategories,
  renameCatagories
}

