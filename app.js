var express = require('express');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://<dbuser>:<dbpassword>@ds135963.mlab.com:35963/heroku_rqzz8p9t";
//const client = new MongoClient(uri, {useNewUrlParser: true});
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist/PennyPinchers')));

const angularEntry = path.join(__dirname, 'dist/PennyPinchers/index.html');

/*client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });*/

app.get('/login', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.get('/register', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})