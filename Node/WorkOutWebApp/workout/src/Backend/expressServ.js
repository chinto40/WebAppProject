//Server in Package.json Server: node-env-run server --exec nodemon
const express = require('express')
const http = require('http')
const DB = require('./DataManipulation.js')
let bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
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
    console.log('**Inside Hello Getter***');
    res.send({Hello:'TrueH3',
            hey:"Worm"});
})

app.get('/getUser', async (req,res)=>{
    console.log('** Retreiving all the users in the list. ')
    //const users = JSON.parse(JSON.stringify(DB.readAll()))
    const users = await DB.readAll2()
    console.log('Print first on the list... ' + JSON.stringify(users))
    res.send(JSON.stringify(users));
})

app.post('/getUserAuthentication', async (req, res)=>{
    console.log('in post to authenticate')
    let user = JSON.parse(JSON.stringify(req.body));
    console.log('UserLogin: '+ user.UserLogin +'\nUser Password: ' + user.UserPassword)
    
    let auth = await DB.readAuthUser(user.UserLogin,user.UserPassword) // passing in username and password
    console.log('Authentication: ' + auth)
    res.send(auth);
})

app.get('/',(req,res)=>{
    console.log('404 Not Found!!')
    res.send({error: '404 NOT FOUND'});
})

app.post('/test1', (req,res)=>{
    console.log('Inside Post: ' + res.json(req.body))
    test = (req.body)
    //console.log('****'+test.data);
    //res.send({test:'true'})
});

app.get('/getTesting', (req,res)=>{
    //this.testing = req.body;
  
    res.send(this.testing)
});

app.all('/test',(req, res)=>{
    console.log('Testing sucessfull' + req.body.data);
    res.send({data:'Completions'})
})

app.post('/postingTest',(req,res)=>{
    //DB.insertUser(req.body);
    console.log("******** inside post request")
    //res.send({connection: 'Connection Successful'})
    res.sendStatus(200);
})
var server = http.createServer(app).listen(port)

