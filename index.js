var mysql = require('mysql');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());



var con = mysql.createConnection({
	host: process.env.REACT_APP_HOST,
	user: process.env.REACT_APP_USER,
	password: process.env.REACT_APP_PASSWORD,
	database: process.env.REACT_APP_DATABASE
})

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});


// function addDetails(newObj){
//     var sql = `insert into student(name,roll,branch) values('${newObj.name}',${newObj.roll},'${newObj.branch}')`;
//     con.query(sql,function(err){
//         if (err) throw err;
//         console.log("1 row inserted!");
//     });
// }

function deleteStudent(roll){
    var sql = `delete from student where roll=${roll}`;
    con.query(sql,function(err){
        if (err) throw err;
        console.log("1 row deleted!");
    })
}

app.get('/students',(req,res)=>{
    let sql = 'select * from student';
    let result1;
    con.query(sql,function(err,result){
        if (err) throw err;
        res.json(result);
    })
});

app.post('/students',(req,res)=>{
    const {name, roll, branch} = req.body
    var sql = `insert into student(name,roll,branch) values('${name}',${roll},'${branch}')`;
    con.query(sql,function(err){
        if (err) throw err;
    });
    res.send("Student entry created")
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});





// let stu1 = {
//     name: "Dinesh",
//     roll: 5,
//     branch: "cse",
// }

// addDetails(stu1);
// deleteStudent(5);