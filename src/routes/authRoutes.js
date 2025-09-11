import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router();


// Register a new user endpoint /auth/register path 
router.post('/register',async (req,res)=>{

    const {username,password} = req.body
  
    const hashedPassword = bcrypt.hashSync(password,8)
    
    //Using try catch block to save new user and hashed pasw to DB  
    try{

        const user = await prisma.user.create({
            //The first field ID is autoincremented and set 
            data:{
            username,
            password:hashedPassword
            }
        })

        //create a token
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'}) 

        res.json({token})
        

    }catch(error){
        console.log(error.message)
        res.sendStatus(503)
    }

 

})
// Login a user endpoint /auth/login path
router.post('/login',async (req,res) =>{

    //get the email and check the password asssociated with that email in the DB 
    //we have to one way encrypt and compare the password the user entered 

    const {username,password} = req.body 

    try{
        //geting the user
        const user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        //checking if such user exists if so then proceed on password check 
        if(!user){return res.status(404).send({message:"User not found!"})}
        //hash-compare the password with the users hashed password in the DB
        const isValidPassword = bcrypt.compareSync(password,user.password)
        if(!isValidPassword) {return res.status(401).send({message:"Invalid password!"})}
        
        console.log(user)
        //if we pass the password check then successfull auth
        //since user is authenticated need to give them a token so they can perform crud actions

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'24h'})
        res.json({token})

    }catch(error){
        console.log(error.message)
        res.sendStatus(503) // sending error in the backend code 503
    }


})

export default router