const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()

const port = 5000
// medilware
app.use(cors())
app.use(express.json())
// mongodb information

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MD_USER}:${process.env.MD_PASS}@cluster0.kaocfbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        // Send a ping to confirm a successful connection
        const touristsCollection = client.db("SP-TOURISTS").collection("tourists");
        // get all tourists plase
        app.get("/tourists",async(req,res)=>{
            const cursor = touristsCollection.find();
            const result=await cursor.toArray()
            res.send(result)
        })
        // cretate tourists plasce
       app.post("/tourists",async(req,res)=>{
        const tourist=req.body
        const result=await touristsCollection.insertOne(tourist)
        res.send(result)
       })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);















app.get("/", async (req, res) => {
    res.send("hello word")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
