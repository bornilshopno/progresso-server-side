import app from "./app.js";
import { client } from "./config/mongodb.js";
// import { client } from "./config/mongodb";
const port = 5000;



let server;


const bootstrap = async () => {
    await client.connect();
    //for checking mongodb when running
    console.log("connected to : MongoDB");
    server = app.listen(port, () => {
        // console.log(`Example app listening on port ${port}`)
    })
}


bootstrap();