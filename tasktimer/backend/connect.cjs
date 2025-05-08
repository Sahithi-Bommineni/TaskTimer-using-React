const {MongoClient, ServerApiVersion} = require("mongodb");
const { Collection } = require("mongoose");
require("dotenv").config({path:"./config.env"});

    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db,{
        serverApi:{
            version:ServerApiVersion.v1,
            strict:true,
            deprecationErrors:true,
        }
    });

    let database

    module.exports={
        connectToServer: () =>{
            database = client.db("tasktimer"); 
        },
        getDb: () =>{
            return database;
        }
    }

//     async function main(){
//     try{
//         await client.connect();

//     const collections=await client.db("tasktimer").collections();
//     collections.forEach((collection) => console.log(collection.s.namespace.collection));
//     }
//     catch(e){
//         console.error(e);
//     }
//     finally{
//         await client.close();
//     }
    
// }
// main()