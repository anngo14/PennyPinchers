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

app.post('/saveuser', (req, res) => {
    collection.updateOne({email: req.body.email},
    { 
        $set: {
            first: req.body.first,
            last: req.body.last,
            phone: req.body.phone,
            date: req.body.date,
            initial: req.body.initial,
            currentBudget: req.body.currentBudget,
            currentExpense: req.body.currentExpense,
            archiveBudget: req.body.archiveBudget,
            archiveExpense: req.body.archiveExpense,
            goals: req.body.goals
        }
    });
    console.log("User Updated");
});
app.get('/login', (req, res) => {
    let urlPath = req.url;
    res.sendFile(angularEntry);
});
app.post('/login', (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;

    collection.find({email: email}).toArray((err, result) => {
        if(err) throw err;
        if(result.length > 0){
            if(bcrypt.compareSync(pass, result[0].password)){
                if(result[0].initial === true){
                    res.send({status: "initial"});
                } else {
                    res.send({status: "success"});
                }
            } else{
                res.send({status: "unsuccessful"});
            }
        } else{
            res.send({status: "unsuccessful"});
        }
    });
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
        password: hashedPassword,
        initial: true
    };
    collection.insertOne(user, (err, result) => {
        if(err){
            console.log(err);
            res.send({status: "unnsuccesful"});
            return;
        } 
        console.log("New User Inserted");
        res.send({status: "success"});
    });
    console.log("User Registered");
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