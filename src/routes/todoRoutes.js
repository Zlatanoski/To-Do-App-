import express from 'express'
import prisma from '../prismaClient.js'



const router = express.Router();

//Get all todo's for a logged in user
router.get('/',(req,res)=>{

})

//Create a new todo
router.post('/',(req,res) =>{


})

//Update a todo -> We are using :id dynamic query parameter since we
//need to identify which todo we need to update
router.put('/:id',(req,res) =>{

})
//Again using dynamic query param in order to know which todo to del
router.delete('/:id',(req,res) =>{

})

export default router