const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//
// 



app.use(express.json())
app.use(cors())


// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.4jznvny.mongodb.net/?retryWrites=true&w=majority`;
console.log((uri))

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
        const itemsCollection = client.db('AgroFarm').collection('itemsCollection')


        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            };
            const cursor = itemsCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })


    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('AgroFarm Server is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})