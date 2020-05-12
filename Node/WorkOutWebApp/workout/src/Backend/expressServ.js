//Server in Package.json Server: node-env-run server --exec nodemon
const express = require("express");
const http = require("http");
const DB = require("./DataManipulation.js");
let bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
/*
    GET- request that get's data
    POST- reuest that sends data
    PUT - request that updates data
    DELETE- request that deletes
*/

let server = http.createServer(app).listen(port);

app.get("/Hell", (req, res) => {
  console.log("Inside the server function");
  res.send({ Hello: "True" });
});

app.get("/Hello", (req, res) => {
  console.log("**Inside Hello Getter***");
  res.send({ Hello: "TrueH3", hey: "Worm" });
});

app.post("/getUser", async (req, res) => {
  // gets one single user.
  let obj = JSON.parse(JSON.stringify(req.body));
  return JSON.stringify(await DB.getUser(obj.UserLogin));
});

app.get("/getAllUsers", async (req, res) => {
  console.log("** Retreiving all the users in the list. ");
  //const users = JSON.parse(JSON.stringify(DB.readAll()))
  const users = await DB.readAll2();
  console.log("Print first on the list... " + JSON.stringify(users));
  res.send(JSON.stringify(users));
});

app.post("/getUserAuthentication", async (req, res) => {
  console.log("in post to authenticate");
  let user = JSON.parse(JSON.stringify(req.body));
  console.log(
    "UserLogin: " + user.UserLogin + "\nUser Password: " + user.UserPassword
  );

  if ((await DB.checkUserExists(user.UserLogin)) == 1) {
    console.log("**in auth if");
    let auth = await DB.readAuthUser(user.UserLogin, user.UserPassword); // passing in username and password
    console.log("Authentication: " + auth);
    res.send(JSON.stringify({ status: auth, mes: "Found User!" }));
    res.end();
    //console.log("Shouldnt reach here");
  } else {
    console.log("**Fail.. ");
    res.send(JSON.stringify({ status: false, mes: "Error:user Not Found." }));
  }
});

app.get("/", (req, res) => {
  console.log("404 Not Found!!");
  res.send({ error: "404 NOT FOUND" });
});

app.post("/test1", (req, res) => {
  console.log("Inside Post: " + res.json(req.body));
  test = req.body;
  //console.log('****'+test.data);
  //res.send({test:'true'})
});

app.get("/getTesting", (req, res) => {
  //this.testing = req.body;

  res.send(this.testing);
});

app.all("/test", (req, res) => {
  console.log("Testing sucessfull" + req.body.data);

  res.send({ data: "Completions" });
});

app.post('/getUserStats',async (req,res) =>{
    let obj = JSON.parse(JSON.stringify(req.body));
    //let obj = {UserLogin:'YumYum33'};
    let user = JSON.parse(await DB.getUser(obj.UserLogin))
    let userState = JSON.parse(await DB.getUserStats(user.UserID));
    //console.log("**Inside Userstats: "+ JSON.stringify(userState));
    res.send(JSON.stringify(userState));
    res.end
})


/*Ready */
app.get("/GetAllWorkouts", async (req, res) => {
  let workouts = JSON.parse(await DB.getAllWorkOuts());
  console.log("In expressServ: " + JSON.stringify(workouts));
  //res.status = 200;
  res.send(JSON.stringify(workouts));
  //return (workouts)
  //res.end;
});
//Inserts Workout into the database.. **Ready
app.post("/InsertWorkout", async (req, res) => {
  //let obj = JSON.parse(JSON.stringify(req.body))
  test = {
    Workout_Name: "Bench",
    Workout_GroupID: 1,
    Workout_ImagePath: "../components/images/Bench.png",
  };
  let obj = JSON.parse(JSON.stringify(test));

  if ((await DB.checkIfWorkoutExists(obj.Workout_Name)) == 0) {
    DB.insertWorkoutImage(
      obj.Workout_Name,
      obj.Workout_GroupID,
      obj.Workout_ImagePath
    ); //Group ID for Specific body Group or could just be left to blank..
    res.sendStatus(200);
  }
  res.sendStatus(400);
});

app.post("/getSingleWorkout", async (req, res) => {
  let obj = JSON.parse(JSON.stringify(req.body));
  if ((await DB.checkIfWorkoutExists(obj.Workout_Name)) == 1) {
    res.send(await DB.getWorkout(obj.Workout_Name));
  }
  res.sendStatus(400); //Doesnt Exists..
});

//Gets the Current User Weight...
app.post("/getUserWeight", async (req, res) => {
  let obj = JSON.parse(JSON.stringify(req.body));
  let user = JSON.parse(await DB.getUser(obj.UserName));
  let currentWeight = await DB.getCurrentUserWeight(user.UserID);
  res.send(JSON.stringify({ Current_Weight: currentWeight }));
});

//Sets the Weight for the current User.
app.post("/setUserWeight", async (req, res) => {
  let obj = JSON.parse(JSON.stringify(req.body));
  let user = JSON.parse(await DB.getUser(obj.UserName));
  let date = new Date();
  let today =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(); // MM-DD-YYYY
  
  //let userS = JSON.parse(await DB.getCurrentUserWeight(user.UserID));
  
  DB.insertIntoWeightLog(obj.newWeight, user.UserID,today);

  ///UserWight,UserID,Date
  DB.setCurrentUserWeight(user.UserID, obj.newWeight); // or whatever the name is
  res.sendStatus(200);
});

app.post('/getUserWeightLog', async (req,res)=>{
  let obj = JSON.parse(JSON.stringify(req.body));
  let user = JSON.parse(await DB.getUser(obj.UserName));
  return await DB.getUserWeightLog(user.UserID);
});

//**Ready **Checks to see if the usr name is taken before
app.post("/registerUser", async (req, res) => {
  // TODO: Here we need to set up the Database for a new User..
  //let test = {LastName: "Drake",FirstName: "Nathan",UserLogin: "ElDorado40",User_Gender: 'M', User_Age: 34 ,UserPassword: "sic parvis magna", Current_Calories: 0,Goal_Calories: 0,Current_Weight: 180,Goal_Weight: 160,Activity_Level: 3,User_Height_Ft: 6,User_Height_In: 2}
  //let obj = JSON.parse(JSON.stringify(test));
  let obj = JSON.parse(JSON.stringify(req.body));

  let active = 1;
  //console.log("Weight:[" + Number(obj.Current_Weight) + "]");
  //console.log("Userlogin:[" + obj.UserLogin + "]");
  //console.log("User Height FT:[" + Number(obj.User_Height_Ft) + "]");
  //console.log("User Height IN:[" + obj.User_Height_In + "]");
  //console.log("Activity Level:[" + obj.Activity_Level + "]");
  //console.log("Gender:[" + obj.User_Gender[0] + "]");
  //console.log("Gender2*:[" + obj.User_Gender + "]");

  if ((await DB.checkUserExists(obj.UserLogin)) == 0) {
    let RealGoalCal = 0;
    // if user doesnt exist then it will create one...  Check...
    switch (obj.Activity_Level) {
      case 0: // Little to no Exersice
        active = 1.2;
        break;
      case 1: // 1 - 3 times /week
        active = 1.3;
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
    //console.log("** 1 GOLCAL: " + RealGoalCal)

    if (obj.User_Gender == 1) {
      //M or F
      RealGoalCal =
        (66 +
          6.3 * Number(obj.Current_Weight) +
          12.9 *
            (Number(obj.User_Height_Ft) * 12 + Number(obj.User_Height_In)) -
          6.8 * Number(obj.User_Age)) *
        active;
      // -500 for 1 pound a week gonna leave you at 3,500 weekly.
      // -1000 daily for 2 pounds a week, will leave you at 7000 less weekly.
      //console.log("** 2M GOLCAL: " + RealGoalCal)
      RealGoalCal -= 1000;
    } else {
      RealGoalCal =
        (655 +
          4.3 * Number(obj.Current_Weight) +
          4.7 * (Number(obj.User_Height_Ft) * 12 + Number(obj.User_Height_In)) -
          4.7 * Number(obj.User_Age)) *
        active;
      // -500 for 1 pound a week gonna leave you at 3,500 weekly.
      // -1000 daily for 2 pounds a week, will leave you at 7000 less weekly.
      // console.log("** 2F GOLCAL: " + RealGoalCal)
      RealGoalCal -= 1000;
    }
    // console.log("** 3 GOLCAL: " + RealGoalCal)

    /*  
      Look at code to render Video
      Look at Attack Script  URl encoding in http
      Alert in javasctipt = use the alert in attaack script js lib call js-override.js
        old will hook on to certainfunction and wil have some major to restict cross script att
        but will have to find another way to generate an alert.. 

    */
    await DB.insertIntoUser(
      obj.LastName,
      obj.FirstName,
      obj.UserLogin,
      obj.UserPassword
    ); // inserting first user creating the userID.
    let getUser = JSON.parse(await DB.getUser(obj.UserLogin));

    //create calorie list here..
    let date = new Date();
    let today =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(); // MM-DD-YYYY
    console.log("Before CheckCreateCalories Line 196");
    let i = await DB.CheckCreateCalories(getUser.UserID, today);
    if (i == 0) {
      let dates = new Date();
      let today =
        dates.getMonth() +
        1 +
        "-" +
        dates.getDate() +
        "-" +
        dates.getFullYear(); // MM-DD-YYYY
      await DB.InsertUserCalories(getUser.UserID, today, 0);
    }
    console.log("Before GetUSerCalories Line 208");
    let getUserStats = await DB.getUserCalories(getUser.UserID, today);
    let getUserStat = JSON.parse(getUserStats);

    obj.Goal_Calories = parseInt(RealGoalCal);
    console.log("Before InsertIntoUserStat Line 213");
    console.log("** 4 GOLCAL: " + RealGoalCal);
    DB.insertIntoUserStat(
      getUser.UserID,
      getUserStat.Calorie_Counter,
      RealGoalCal.valueOf(),
      obj.Current_Weight,
      obj.Goal_Weight,
      obj.Activity_Level,
      obj.User_Height_Ft,
      obj.User_Height_In,
      obj.User_Gender,
      obj.User_Age
    ); // Getting the userid stored in returnUser into
   // let user = JSON.parse(await DB.getUser(obj.UserName));
    DB.insertIntoWeightLog(obj.Current_Weight, getUser.UserID,today);
    // res.sendStatus(200);
    res.send(JSON.stringify({ status: true, msg: "Success!" }));
    res.end();
  } else {
    //res.sendStatus(400);
    res.send(JSON.stringify({ status: false, msg: "Success!" }));
    res.end();
  }
});

/*Gets the date based on day.. So like last week or another day.*/
app.post("/getCaloriesForDate", async (req, res) => {
  // making it a post api call because we are sending data from frontend in this case user ID.
  let body = JSON.parse(JSON.stringify(req.body));
  let calCounter = await DB.getUserCalories(body.UserLogin, req.date); //gets the user calorie counter for a user and the specific date.

  res.send(JSON.stringify({ Calorie_Counter: calCounter }));
});

//Gets the calories for a user for today...
app.post("/getCalories", async (req, res) => {
  // making it a post api call because we are sending data from frontend in this case user ID.
  let date = new Date();
  let today =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(); // MM-DD-YYYY

  let body = JSON.parse(JSON.stringify(req.body));
  let user = JSON.parse(await DB.getUser(obj.UserName));
  let i = await DB.CheckCreateCalories(user.UserID, today);
  if (i == 0) {
    // if non found inserting new blank check
    await DB.InsertUserCalories(user.UserID, today, 0);
  } //gets the caloriecounter
  let calCounter = await DB.getUserCalories(body.UserLogin, today); //gets the user calorie counter for a user and the specific date.
  res.send(JSON.stringify({ Calorie_Counter: calCounter }));
});

//Sets the user calories for today..
app.post("/addCalorie", async (req, res) => {
  
  let date = new Date();
  let today =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(); // MM-DD-YYYY
  let body = JSON.parse(JSON.stringify(req.body));
  let user = JSON.parse(await DB.getUser(body.UserName));
  let i = await DB.CheckCreateCalories(user.UserID, today);
  if (i == 0) {
    await DB.InsertUserCalories(user.UserID, today, 0);
  } //gets the caloriecounter
  //might have to get the userID.. from DB if userLogin is passed in...
  //** let UserID = await DB.getUser(body.UserLogin);
  //let counter = await DB.getUserCalories(UserID);

  let counter = JSON.parse(await DB.getUserCalories(body.UserName));
  await DB.setUserCalories(user.UserID, today, (Number(counter) + Number(body.calories))); // going to get the calories + calories in datavbase...
  
  DB.setCurrentUserCalories(user.UserID,counter + body.calories);
  res.sendStatus(200);
});
app.post("/postingTest", (req, res) => {
  //DB.insertUser(req.body);
  console.log("******** inside post request");
  //res.send({connection: 'Connection Successful'})
  res.sendStatus(200);
});

   /* TODO: 
        setCurrentUserWeight needs to be updated in DataManipulation
         parameters need to be updated to have the fields UserName, date, newWeight
         need to create a table in database for User_Weight logs
         need to make sure logs in User_Weight are updated in User_Stats.Current_Weight */
      //setUsersWeight(logInfo);
      // Will current weight automatically be updated? If not, do that here.
      // make sure the goal calories gets updated