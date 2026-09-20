const express = require('express');
const app = express();
require('dotenv').config();

const logger = require('./logger');
const glocalErrorhandler = require('./global_error_handler');
const validator = require('./validator');
const validatePatchTodo = require('./validator_for_PATCH_request');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// Parse incoming JSON request
app.use(express.json());

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(logger);



//creating todos array
let todos = [
    {id: 1,task: "Learn Node.js",Completed: false},
    {id: 2,task: "Learn Express.js",Completed: false},
    {id: 3,task: "Build a REST API",Completed: false},
    {id: 4,task: "Build a CRUD API",Completed: false}
]

//GET all todos
app.get('/todos' ,(req ,res ,next)=>{
  try{
     res.status(200).json(todos)
  }catch(error){
    next(error)
  }
})


//GET specific todos
app.get('/todos/:id' ,(req ,res ,next)=>{
  try{
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);

     if(isNaN(id)){
      return res.status(404).json({error: "Invalid ID"});
     }
    if(!todo){
      return res.status(404).json({error: "Todo not found"});
    }
    res.status(200).json(todo);
    
  }catch(error){
    next(error)
  }}
);


//POST a todo
app.post('/todos',validator,(req ,res ,next)=>{
  
  try{
      const {task} = req.body;
  if(!task){
    return res.status(400).json({message: "Task is required"});
  }

  const newTodo = { id: todos.length + 1, task, Completed: false };
  todos.push(newTodo);
  return res.status(201).json(newTodo);

}catch(error){
    next(error)
  }});
 

//UPDATE a todo by id
app.patch('/todos/:id', validatePatchTodo, (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  Object.assign(todo, req.body);
  return res.status(200).json({ message: 'Todo updated successfully', todo });
});


//DELETE a todo by id
app.delete('/todos/:id' ,(req ,res ,next)=>{
const id = parseInt(req.params.id);
const initialLength = todos.length;
todos = todos.filter((todo) => todo.id !== id);
if(todos.length === initialLength){
  return res.status(404).json({message: "Todo not found"}); 
}
res.status(200).json({message: "Todo deleted successfully"});
}
)

// Global error handling middleware
app.use(glocalErrorhandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});