import express from "express";
import { client } from "../config/mongodb.js";





const userRouter = express.Router();
const db = client.db("progresso");
const userCollection = db.collection("users")


userRouter.post("/new-user", async (req, res) => {
    const user = req.body;
    //for social login=>checking if registered already
    const query = { email: user.email }
    const userAlready = await userCollection.findOne(query);
    if (userAlready) {
        return res.send({ message: "Previously Registered User", insertedId: null })
    }
    //add operation
    const result = await userCollection.insertOne(user);
    res.send(user, {"message":"user created"});

})


export default userRouter;