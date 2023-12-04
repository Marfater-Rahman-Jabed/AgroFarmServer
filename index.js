const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.4jznvny.mongodb.net/?retryWrites=true&w=majority`;
console.log((uri))

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const VegetableCollection = client.db('AgroFarm').collection('VegetableCollection')


        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = VegetableCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/uploadVegetableProduct', async (req, res) => {
            const query = req.body;
            const result = await VegetableCollection.insertOne(query)
            res.send(result)
        })

        app.delete('/deleteProducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await VegetableCollection.deleteOne(query)
            res.send(result);
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