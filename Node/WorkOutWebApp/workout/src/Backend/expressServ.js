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

/*Ready */
app.get('/GetAllWorkouts', async(req,res)=>{
    let workouts = await DB.getAllWorkOuts();
    res.send(JSON.stringify(workouts));
})
//Inserts Workout into the database.. **Ready
app.post('/InsertWorkout', async (req,res)=>{
    //let obj = JSON.parse(JSON.stringify(req.body))
    test = {Workout_Name: "Bench", Workout_GroupID: 1, Workout_ImagePath: '../components/images/Bench.png'};
    let obj = JSON.parse(JSON.stringify(test))

    if(await DB.checkIfWorkoutExists(obj.Workout_Name) == 0){
        DB.insertWorkoutImage(obj.Workout_Name,obj.Workout_GroupID,obj.Workout_ImagePath ) //Group ID for Specific body Group or could just be left to blank.. 
        res.sendStatus(200);
    }
    res.sendStatus(400);
})


app.post('/getSingleWorkout', async(req,res)=>{
    let obj = JSON.parse(JSON.stringify(req.body))
    if(await DB.checkIfWorkoutExists(obj.Workout_Name)== 1){
         res.send((await (DB.getWorkout(obj.Workout_Name))))
    }
     res.sendStatus(400)
})

//Gets the Current User Weight... 
app.post('/getUserWeight', async(req,res)=>{
    let obj = JSON.parse(JSON.stringify(req.body));
    let currentWeight = await DB.getCurrentUserWeight(obj.UserID);
    res.send(JSON.stringify({Current_Weight: currentWeight}))
})

//Sets the Weight for the current User.
app.post('/setUserWeight', (req, res)=>{
    let obj = JSON.parse(JSON.stringify(req.body))
    DB.setCurrentUserWeight(obj.UserID, obj.NewWeight) // or whatever the name is
    res.sendStatus(200)
})

//**Ready **Checks to see if the usr name is taken before 
app.post('/registerUser', async(req, res)=>{
// TODO: Here we need to set up the Database for a new User..
   // let test = {LastName: "Drake",FirstName: "Nathan",UserLogin: "Morgan76",User_Gender: 'M', User_Age: 34 ,UserPassword: "sic parvis magna", Current_Calories: 0,Goal_Calories: 0,Current_Weight: 180,Goal_Weight: 160,Activity_Level: 3,User_Height_Ft: 6,User_Height_In: 2}
   //let obj = JSON.parse(JSON.stringify(test)); 
   let obj = JSON.parse(JSON.stringify(req.body));
    
    let active = 0;
    if( await DB.checkUserExists(obj.UserLogin) == 0){ // if user doesnt exist then it will create one...  Check... 
        switch(obj.Activity_Level){
            case 0: // Little to no Exersice
                active = 1.2;
                break;
            case 1: // 1 - 3 times /week
                active =  1.3;
                break;
            case 2: // 4-5 time / week
                active = 1.7;
                break;
            case 3: // 6- 7 times a week
                active = 1.9;
                break;
        }
        /*
        * This is how many calories your body needs to maintain itself based on active level.. 
        * - 500 daily | 7*500 = 3500 weekly = one pound lost per week..
        * - 1000 daily | 7 * 1000 = 7000 weekly = two pounds lost per week..
        */
       if(obj.User_Gender == 'M'){ //M or F
        obj.Goal_Calories =( 66 + (6.3 * obj.Current_Weight) + (12.9 * ((obj.User_Height_Ft *12) + obj.User_Height_In)) - (6.8* obj.User_Age)) * active; 
        // -500 for 1 pound a week gonna leave you at 3,500 weekly.
        // -1000 daily for 2 pounds a week, will leave you at 7000 less weekly. 
        obj.Goal_Calories -= 1000
    }else{ 
        obj.Goal_Calories = (655 +(4.3 * obj.Current_Weight) + 4.7 * ((obj.User_Height_Ft *12) + obj.User_Height_In) - (4.7 * obj.UserAge)) * active;
        // -500 for 1 pound a week gonna leave you at 3,500 weekly.
        // -1000 daily for 2 pounds a week, will leave you at 7000 less weekly. 
        obj.Goal_Calories -= 1000
    }
        await DB.insertIntoUser(obj.LastName, obj.FirstName,obj.UserLogin,obj.UserPassword) // inserting first user creating the userID.
        let getUser = JSON.parse(await DB.getUser(obj.UserLogin))

        //create calorie list here.. 
        let date = new Date();
        let today = ((date.getMonth()+1)+  '-' +date.getDate() + '-' +  date.getFullYear()); // MM-DD-YYYY
        let i = await DB.CheckCreateCalories(getUser.UserID,today);
        if(i == 0){
            let dates = new Date();
            let today = ((dates.getMonth()+1)+  '-' +dates.getDate() + '-' +  dates.getFullYear()); // MM-DD-YYYY 
            await DB.InsertUserCalories(getUser.UserID, today,0);
        }
        let getUserStats =  await DB.getUserCalories(getUser.UserID, today);
        let getUserStat = JSON.parse( getUserStats);
        
         DB.insertIntoUserStat(getUser.UserID,getUserStat.Calorie_Counter,obj.Goal_Calories,obj.Current_Weight,obj.Goal_Weight,obj.Acticity_Level,obj.User_Height_Ft, obj.User_Height_In,obj.User_Gender,obj.User_Age); // Getting the userid stored in returnUser into
        res.sendStatus(200)
    }else{
      
        res.sendStatus(400) 
    }
})

/*Gets the date based on day.. So like last week or another day.*/
app.post('/getCaloriesForDate', async (req, res)=>{ // making it a post api call because we are sending data from frontend in this case user ID.
        let body = JSON.parse(JSON.stringify(req.body))
        let calCounter = await DB.getUserCalories(body.UserLogin,req.date) //gets the user calorie counter for a user and the specific date. 

        res.send(JSON.stringify({Calorie_Counter: calCounter}))
})


//Gets the calories for a user for today...
app.post('/getCalories', async (req, res)=>{ // making it a post api call because we are sending data from frontend in this case user ID.
    let date = new Date();
    let today = ((date.getMonth()+1)+  '-' +date.getDate() + '-' +  date.getFullYear()); // MM-DD-YYYY
        
    let body = JSON.parse(JSON.stringify(req.body))
    let i = await DB.CheckCreateCalories(body.UserID,today);
    if(i == 0){ // if non found inserting new blank check
        await DB.InsertUserCalories(body.UserID, today,0);
    }//gets the caloriecounter
    let calCounter = await DB.getUserCalories(body.UserLogin,today) //gets the user calorie counter for a user and the specific date. 
    res.send(JSON.stringify({Calorie_Counter: calCounter}))
})

//Sets the user calories for today.. 
app.post('/addCalorie', async (req,res)=>{
    let date = new Date();
    let today = ((date.getMonth()+1)+  '-' +date.getDate() + '-' +  date.getFullYear()); // MM-DD-YYYY
    let body = JSON.parse(JSON.stringify(req.body))
    let i = await DB.CheckCreateCalories(body.UserID,today);
    if(i == 0){
        await DB.InsertUserCalories(body.UserID, today,0);
    }//gets the caloriecounter
    //might have to get the userID.. from DB if userLogin is passed in...
    //** let UserID = await DB.getUser(body.UserLogin);
    //let counter = await DB.getUserCalories(UserID);
    let counter = await DB.getUserCalories(body.UserName);
    DB.setUserCalories(body.UserLogin, today,(counter+body.Calorie_Counter)); // going to get the calories + calories in datavbase... 
    res.sendStatus(200)
})


app.post('/postingTest',(req,res)=>{
    //DB.insertUser(req.body);
    console.log("******** inside post request")
    //res.send({connection: 'Connection Successful'})
    res.sendStatus(200);
})
var server = http.createServer(app).listen(port)

