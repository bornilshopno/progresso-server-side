import app from "./app.js";
import { client } from "./config/mongodb.js";
// import { client } from "./config/mongodb";
const port = 5000;



let server;


const bootstrap = async () => {
    await client.connect();
    console.log("connected to : MongoDB");
    // const db= await client.db("todosDB");
    // const collection =await db.collection("todos");
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


bootstrap();