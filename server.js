const express = require("express");

const Port = 3001;
const app = express();
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello Fucking World");
})


// User dummy data
let users = [
    {id: 1, name: "Shubhayu"},
    {id: 2, name: "chaman"},
    {id: 3, name: "Chutiya"}
]
// Get Method
app.get("/users",(req,res)=>{
    res.json(users);
    
})

// Get method by single user id
app.get("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if(!user){
        res.status(401).json({
            message: "No User Found By this Specific Id"
        })
    };
    res.json(user)
    })
// Post Mthod
app.post("/users",(req,res) => {
    //{name} is object destructing which helps to define values from and object and put in the variable
    const {name} = req.body;
    const newUser = {
        id: users.length + 1,
        name: name
    }
    users.push(newUser);
    res.status(201).json(newUser)
})

// PUT or UPDATE USER 
app.put("/users/:id",(req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if(!user){
        res.status(401).json({
            message: "User not found"
        })
    }
    user.name = req.body.name;
    res.json(user)
})

// Delete
app.delete("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.filter(u => id!==u.id)
    res.json({
        message: "User Delete"
    })
})

app.listen(Port,()=>{
    console.log(`Server is running on port http://localhost:3001`)
})