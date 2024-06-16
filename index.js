const express= require("express")
const mongoose = require("mongoose");
const parser = require("body-parser");
const dotenv= require("dotenv");
const bodyParser = require("body-parser");

const app= express();
dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/formind')
var db = mongoose.connection
db.on('error', ()=> console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/register", (req,res) =>{
    var name = req.body.name
    var email= req.body.email
    var password = req.body.password
    

    var data={
        "Name": name,
        "EmailAddress" : email,
        "Password": password,
    }
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")

    })
})

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

//mo
const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/pages/index.html");
 })



app.get("/success",(req,res)=>{
    res.sendFile(__dirname +"/pages/success.html")
})

app.listen(port,()=>{
    console.log(`server is Running on port ${port}`);

})
