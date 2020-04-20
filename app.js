var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://anngo:1&pCveVl@ds135963.mlab.com:35963/heroku_rqzz8p9t";
const client = new MongoClient(url, {useNewUrlParser: true});
const PORT = process.env.PORT || 5000;

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'dist/PennyPinchers')));
app.use(express.json());
app.use(bodyparser.json());

const angularEntry = path.join(__dirname, 'dist/PennyPinchers/index.html');

var collection;
client.connect(err => {
    if(err) throw err;
    console.log("Connected to MongoDB");
    collection = client.db("heroku_rqzz8p9t").collection("pinchers");
  });

app.get('/login', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('/register', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.post('/register', async (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    let user = {
        email: email,
        password: hashedPassword
    };
    collection.insertOne(user, (err, result) => {
        if(err) throw err;
        console.log("New User Inserted");
    });
});
app.get('/home', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('/goals', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('/archive', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('/settings', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('/initial', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('*', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});

client.close();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})