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
        const countryCollection = client.db("SP-TOURISTS").collection("countries");
        
        // all
        app.get("/countries",async(req,res)=>{
            const cursor = countryCollection.find();
            const result=await cursor.toArray()
            res.send(result)
        })
        // update place
        app.patch("/touristsUpdate/:id",async(req,res)=>{
            const id=req.params.id
            const item=req.body
            const query={_id:new ObjectId(id)}
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    image:item.image,
                    tourists_spot_name:item.tourists_spot_name,
                    country_Name:item.country_Name,
                    location:item.location,
                    description:item.description,
                    average_cost:item.average_cost,
                    seasonality:item.seasonality,
                    travel_time:item.travel_time,
                    totaVisitorsPerYear:item.totaVisitorsPerYear,
                    name:item.name,
                    email:item.email,
                },
              };
              const result = await touristsCollection.updateOne(query, updateDoc, options)
              res.send(result)
        })
        // delete place
        app.delete("/tourists/:_id",async(req,res)=>{
            const id=req.params._id
            const query={_id:new ObjectId(id)}
            const result=await touristsCollection.deleteOne(query)
            res.send(result)
        })
        // user places
        app.get("/tourists/:user", async(req,res)=>{
            const userEmail=req.params.user
            const query={email: userEmail}
            const cursor =await touristsCollection.find(query)
            const result=await cursor.toArray()
            res.send(result)
        })
        // country places
        app.get("/countryplace/:country", async(req,res)=>{
            const country=req.params.country
            const query={country_Name: country}
                console.log(country)
            const cursor =await touristsCollection.find(query)
            const result=await cursor.toArray()
            res.send(result)
        })
        // get one tourists
        app.get("/touristsDetails/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:new ObjectId(id)}
            const result =await touristsCollection.findOne(query)
            res.send(result)
        })
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
