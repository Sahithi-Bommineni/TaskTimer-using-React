const client = require("./connect.cjs")
const express = require("express")
const cors = require("cors")

const app = express(); //represents express, to instantiate express
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, ()=>{
    client.connectToServer();
    console.log(`Server is running on port ${PORT}`);
})