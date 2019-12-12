//Server in Package.json Server: node-env-run server --exec nodemon
const express = require('express')
const http = require('http')

const router = express.Router();

const app = express()
const port = process.env.PORT || 8080;


/*
    GET- request that get's data
    POST- reuest that sends data
    PUT - request that updates data
    DELETE- request that deletes
*/

app.get('/Hell', (req,res)=>{
    console.log("Inside the server function")
    res.send({Hello:'True'});
})

app.get('/Hello',(req,res)=>{
    
    res.send({Hello:'TrueH3',
            hey:"Worm"});
})
app.get('/',(req,res)=>{
    res.send({Hello:'True/'});
})
let test = 'Before test';
app.post('/test1', (req,res)=>{
    console.log('Inside Post: ' + res.json(req.body))
    test = (req.body)
    //console.log('****'+test.data);
    //res.send({test:'true'})
});

app.post('/test',(req,res)=>{
    res.send({Hello: test})
})

// module.exprots = ()=> new Promise((res,req)=> {
//     router.get('/Hello', (req,res)=>{
//         console.log("Inside the server function")
//         res.send({Hello:'True'});
//     })
//     app.get('/Hello',(req,res)=>{
//         res.send({Hello:'TrueH2'});
//     })
//     app.get('/',(req,res)=>{
//         res.send({Hello:'True/'});
//     })
// })

var server = http.createServer(app).listen(port)