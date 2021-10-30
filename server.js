const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


app.use(cors());
// Send Json data
app.use(express.json());

// ctcOevmHfQom8ceE
// hotelbook

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9z7i3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("HotelDB");
        const hotelCollection = database.collection("hotels");
        const userCollection = database.collection("users");
        const orderCollection = database.collection("orders");

        // HOTELS DATA

        app.post('/hotels', async (req, res) => {
            const hotels = req.body;
            const result = await hotelCollection.insertOne(hotels);
            res.send(hotels);
        });

        app.get('/hotels', async (req, res) => {
            const cursors = hotelCollection.find({});
            const result = await cursors.toArray()
            res.send(result);
        });

        app.get('/hotels/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await hotelCollection.findOne(query);
            res.send(result);
        });


        // USER API

        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollection.insertOne(users);
            res.send(result);
        });

        // ALL USERS DATA

        app.get('/users', async (req, res) => {
            const cursors = userCollection.find({});
            const result = await cursors.toArray();
            res.send(result);
        });



        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.json(result)
        });

        // ALL ORDERS DATA

        // app.post('/orders', async (req, res) => {
        //     const orders = req.body;
        //     const reuslt = await userCollection.insertOne(orders)
        //     res.json(result);
        // })

        app.get('/orders', async (req, res) => {
            const cursors = userCollection.find({});
            const result = await cursors.toArray();
            res.send(result)
        });

        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _Id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })



        app.listen(port, () => {
            console.log('run with', port)
        });


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);