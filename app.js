require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//creating todos array
let todos = [
    {id: 1,task: "Learn Node.js",Completed: false},
    {id: 2,task: "Learn Express.js",Completed: false},
    {id: 3,task: "Build a REST API",Completed: false},
    {id: 4,task: "Build a CRUD API",Completed: false}
]

//GET todos
app.get('/todos' ,(req ,res)=>{
    res.status(200).json(todos)
})



//POST a todo
app.post('/todos',(req ,res)=>{
  const {task} = req.body;
  if(!task){
    return res.status(400).json({message: "Task is required"});
  }

  const newTodo = { id: todos.length + 1, task, Completed: false };
  todos.push(newTodo);
  return res.status(201).json(newTodo);
})



//UPDATE a todo by id
app.patch('/todos/:id' ,(req ,res)=>{
const id = parseInt(req.params.id, 10);
const todo = todos.find(todos => todos.id === id);
if(!todo)
  return res.status(404).json({error: "Todo not found"});
Object.assign(todo, req.body);
return res.status(200).json({message: "Todo updated successfully"});
});



//DELETE a todo by id
app.delete('/todos/:id' ,(req ,res)=>{
const id = parseInt(req.params.id);
const initialLength = todos.length;
todos = todos.filter((todo) => todo.id !== id);
if(todos.length === initialLength){
  return res.status(404).json({message: "Todo not found"}); 
}
res.status(200).json({message: "Todo deleted successfully"});
}
)
