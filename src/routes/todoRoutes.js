import express from 'express'
import prisma from '../prismaClient.js'



const router = express.Router();

//Get all todo's for a logged in user
router.get('/',async (req,res)=>{

    const userTodos = await prisma.todo.findMany({

        where: {
            userId: req.userId
        }
    })
    
    res.json(userTodos)

})

//Create a new todo
router.post('/',async (req,res) =>{

    //since it is a post method in the request we have the task we need to post
    const {task} = req.body

    const todo = await prisma.todo.create({
        data:{
            task,
            userId: req.userId

        }

    })
    res.json(todo)
})

//Update a todo -> We are using :id dynamic query parameter since we
//need to identify which todo we need to update
router.put('/:id',async (req,res) =>{

    const {completed} = req.body
    const {id} = req.params
  
    

    const updateTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),  // id of todo
            userId: req.userId // id of the user
        },
        data: {
            completed: !!completed // double excl in order to convert to boolean
            // double excl converts to bool basead on truthiness written as string 
        }

    })
    res.json(updateTodo)


})
//Again using dynamic query param in order to know which todo to del
router.delete('/:id',async (req,res) =>{

    const {id} = req.params

    const deleteTodo = await prisma.todo.delete({
        where:{
            userId:req.userId,
            id:parseInt(id)
        }
    })
    res.send({message:"To-do deleted succesfully!"})

})

export default router