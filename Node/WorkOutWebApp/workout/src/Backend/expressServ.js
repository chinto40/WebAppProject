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
})

app.get('/getAllUsers', async (req,res)=>{
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


app.post('/registerUser', async(req, res)=>{
// TODO: Here we need to set up the Database for a new User..
// User_Stats  - UserID, Current_Calories, Goal_Calories, Current_Weight, Goal_Weight,Activity_Level, User_Height
// users - UserID, LastName,FirstName, UserLogin, UserPassword
    let test = {LastName: "Dragon",FirstName: "Born",UserLogin: "DragonBorn",UserPassword: "password", Current_Calories: 0,Goal_Calories: 0,Current_Weight: 0,Goal_Weight: 0,Activity_Level: 0,User_Height: 0}
    //let obj = JSON.parse(JSON.stringify(req.body));
    let goalCalMale = 6.3 * test.Current_Weight + (12.9 * (Need to see how we are passing in hieght) - (6.8* Need Age))
    let obj = JSON.parse(JSON.stringify(test));
   let returnUser = await DB.insertIntoUser(obj.LastName, obj.FirstName,obj.UserLogin,obj.UserPassword) // inserting first user creating the userID.
   let getUser = await DB.getUser(obj.UserLogin)
    //userID, CurCalories,GoCalories,CurWeight,GoWeight,actLevel,UserHeight
    let status =  DB.resinsertIntoUser(getUser.UserID,obj.Goal_Calories,obj.); // Getting the userid stored in returnUser into

   // console.log('Print list... ' + JSON.stringify(users))
    res.send(JSON.stringify(obj))
})



//Gets the calories for a user...
app.post('/getCalories', async (req, res)=>{
        let body = JSON.parse(JSON.stringify(req.body))
        let calCounter = await DB.getUser(body.UserLogin,body.Date) //gets the user calorie counter for a user and the specific date. 

        res.send(JSON.stringify({Calorie_Counter: calCounter}))
})



app.post('/postingTest',(req,res)=>{
    //DB.insertUser(req.body);
    console.log("******** inside post request")
    //res.send({connection: 'Connection Successful'})
    res.sendStatus(200);
})
var server = http.createServer(app).listen(port)

