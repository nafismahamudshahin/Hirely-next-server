import express from "express";
import cors from "cors";
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


const client = new MongoClient(process.env.MONGODB);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

const dbConnecte = await connectToMongoDB();
const db = dbConnecte.db("hirelydb");
const usersdb = db.collection("user");

app.get("/", (req, res) => {
    res.send("server is running")
})

app.get("/users", async (req, res) => {
    const user = await usersdb.find({}).toArray();
    res.send(user)
})

app.listen(port, (req, res) => {
    console.log(`server running on port ${port}`)
})