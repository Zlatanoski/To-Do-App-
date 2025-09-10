import express from 'express'
import bcrypt from 'bcryptjs'
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
        console.log(error)
        res.sendStatus(503)
    }

 

})
// Login a user endpoint /auth/login path
router.post('/login',(req,res) =>{


})

export default router