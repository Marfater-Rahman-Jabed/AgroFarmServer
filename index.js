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
        const GrainOilCollection = client.db('AgroFarm').collection('GrainOilCollection')
        const FishCollection = client.db('AgroFarm').collection('FishCollection')
        const FruitCollection = client.db('AgroFarm').collection('FruitCollection')
        const MemberCollection = client.db('AgroFarm').collection('MemberCollection')
        const BlogCollection = client.db('AgroFarm').collection('BlogCollection')


        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = VegetableCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/productsGrainOil', async (req, res) => {
            const query = {}
            const cursor = GrainOilCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/productsFish', async (req, res) => {
            const query = {}
            const cursor = FishCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/productsFruit', async (req, res) => {
            const query = {}
            const cursor = FruitCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/Members', async (req, res) => {
            const query = {}
            const cursor = MemberCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/blogs', async (req, res) => {
            const query = {}
            const cursor = BlogCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray()
            res.send(result)
        })





        app.post('/uploadVegetableProduct', async (req, res) => {
            const query = req.body;
            const result = await VegetableCollection.insertOne(query)
            res.send(result)
        })
        app.post('/uploadGrainProduct', async (req, res) => {
            const query = req.body;
            const result = await GrainOilCollection.insertOne(query)
            res.send(result)
        })
        app.post('/uploadFishProduct', async (req, res) => {
            const query = req.body;
            const result = await FishCollection.insertOne(query)
            res.send(result)
        })
        app.post('/uploadFruitProduct', async (req, res) => {
            const query = req.body;
            const result = await FruitCollection.insertOne(query)
            res.send(result)
        })
        app.post('/uploadMembers', async (req, res) => {
            const query = req.body;
            const result = await MemberCollection.insertOne(query)
            res.send(result)
        })
        app.post('/uploadBlog', async (req, res) => {
            const query = req.body;
            const result = await BlogCollection.insertOne(query)
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
        app.delete('/deleteGrainProducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await GrainOilCollection.deleteOne(query)
            res.send(result);
        })
        app.delete('/deleteFishProducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await FishCollection.deleteOne(query)
            res.send(result);
        })
        app.delete('/deleteFruitProducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await FruitCollection.deleteOne(query)
            res.send(result);
        })
        app.delete('/deleteMembers/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await MemberCollection.deleteOne(query)
            res.send(result);
        })
        app.delete('/deleteBlog/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await BlogCollection.deleteOne(query)
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