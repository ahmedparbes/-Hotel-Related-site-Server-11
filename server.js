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

const uri = "mongodb+srv://hotelbook:ctcOevmHfQom8ceE@cluster0.9z7i3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("HotelDB");
        const hotelCollection = database.collection("hotels");
        // Post API
        app.post('/hotels', async (req, res) => {
            const hotels = req.body;
            const result = await hotelCollection.insertOne(hotels);
            res.send(hotels);
        })
        // FIND

        app.get('/hotels', async (req, res) => {
            const cursors = hotelCollection.find({});
            const result = await cursors.toArray()
            res.send(result);
        })

        app.listen(port, () => {
            console.log('run with', port)
        })


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);