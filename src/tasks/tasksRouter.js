import express from "express";
import { client } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const tasksRouter = express.Router()

const db = client.db("progresso");
const taskCollection = db.collection("tasks")

//get all data
tasksRouter.get("/", async (req, res) => {
    const allTasks = await taskCollection.find().toArray();
    res.json(allTasks)
})

//Get a single data
tasksRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const task = await taskCollection.findOne({ _id: new ObjectId(id) })
    res.json(task)
})

//POST a data
tasksRouter.post("/add-task", async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    const result = await taskCollection.insertOne({
        title: title,
        description: description,
        priority: priority,
        status: "to-do",
        dueDate: dueDate,
        createdAt: new Date().toString()
    })
    res.json(result)
})

//Delete operation using param
tasksRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result)
})

//update a full task
tasksRouter.put("/update-task/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const { title, description, priority, status, dueDate } = req.body;
    console.log(id, title, description, priority, status, dueDate)
    const result = await taskCollection.updateOne(filter,
        { $set: { title, description, priority, status, dueDate } },
        { upsert: true })
    res.json(result)
})





export default tasksRouter;