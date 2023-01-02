const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_db"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


//Select Query
app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM register";
    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

//Insert Query
app.post('/api/post', (req, res) => {
    const {username, email, password} = req.body;
 const sqlInsert = "INSERT INTO register (username, email, password) VALUES (?,?,?)";
    db.query(sqlInsert, [username,email,password],(error, result) => {
        if(error){
            console.log("error", err);
        }
    });
});

//Delete Query
app.delete('/api/remove/:id', (req, res) => {
    const {id} = req.params;
    const sqlDelete  = "DELETE FROM  register WHERE id = ?";
    db.query(sqlDelete, id, (error,result) => {
        if(error){
            console.log(error);
        }
    });
});

app.get('/api/get/:id', (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM register WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

//Update Query
app.put('/api/update/:id', (req, res) => {
    const {id} = req.params;
    const {username, email,password} = req.body;
    const sqlUpdate = "UPDATE register SET username = ?, email = ?, password = ? WHERE id=?";
    db.query(sqlUpdate, [username, email, password, id], (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });

});

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
 const sqlLogin = "SELECT * FROM register WHERE username=? AND password= ? ";
    db.query(sqlLogin, [username,password],(error, result) => {
        if(error){
            console.log("error", error);
        }else{
            if(result[0]){
                res.send(result);
                console.log(result[0].email);
            }else{
                res.send({message: "Wrong username/password enterted"});
                console.log("wrong");
            }
        }
    });
});

app.get('/', (req, res) => {
   
    res.send("Hello Node.js");
});
app.listen(5000, () => {
    console.log("Server is running on 5000 port");
});