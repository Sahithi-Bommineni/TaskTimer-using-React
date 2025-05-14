const express = require("express") //import express
const mongoose = require("mongoose") //import mongoose to use mongodb on local
const Tasks = require("./model"); //importing Schema from model.js
const cors = require("cors");


const app = express(); //represents express, to instantiate express

mongoose.connect('mongodb+srv://sahithi2499:s1h2t2h3@cluster0.syr2ar0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>console.log('Db is connected')
)
app.use(express.json());
app.use(cors({
    origin: '*' //from any frontend, we can access backend
}))

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.post('/addtask', async(req,res)=>{
    
    try{
        const {task} = req.body;
        const newData = Tasks({task})
        await newData.save();
        return res.json(await Tasks.find())
    }
    catch(err){
        console.log(err);
    }
})
app.get('/gettask', async(req,res)=>{
    
    try{
        return res.json(await Tasks.find())
    }
    catch(err){
        console.log(err);
    }
})
app.delete('/delete/:id', async(req,res)=>{
    try{
        await Tasks.findByIdAndDelete(req.params.id);
        return res.json(await Tasks.find())
    }
    catch(err){
        console.log(err);
    }
})

app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`);
})