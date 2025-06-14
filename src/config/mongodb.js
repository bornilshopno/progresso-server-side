import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
dotenv.config(); 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pqwog.mongodb.net/progresso?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


