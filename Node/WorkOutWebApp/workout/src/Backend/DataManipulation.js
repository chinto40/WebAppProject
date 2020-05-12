const mysql = require("mysql");
const Promise = require("promise");
let express = require("express");
let router = express.Router();
const http = require("http");

// instance of mysql connection,..
// let con; to define it and use it as a indicator for insta the sql connection creating a singleton...
let insta = () => {
  if (insta.con === "undefined") {
    insta.con = mysql.createConnection({
      //host: 'http://136.50.22.117:80/phpmyadmin/index.php',
      //host: "http://136.50.22.117:80/phpmyadmin/db_structure.php?server=1&db=school",
      host: "136.50.22.117",
      user: "chinto",
      password: "password",
      database: "school",
      port: "3306",
    });
  }
};
//  insta();

let con = mysql.createConnection(
  "mysql://stumbling_sweat_sliders:DC2j!CePCjTnrH@DL7@easel1.fulgentcorp.com:3306/stumbling_sweat_sliders"
);

con.connect((err) => {
  if (err) {
    console.log("Error connecting to DB: " + err);
    return;
  }
  console.log("Connection Successful");
});
console.log("**Connection: " + con);
console.log("***state is: " + con.state);

//In case i need a function to connect...
const DBConnect = () => {
  con.connect((err) => {
    if (err) {
      console.log("Error connecting to DB: " + err);
      return;
    }
    console.log("Connection Successful");
  });
};
//DBConnect()

/* Ends the Database Communications...*/
function TheEnd() {
  con.end((err) => {});
}

/**************************************
        Reading From the Database 
    ****************************************/

router.readAll2 = () => {
  console.log("before query statment");
  let Prom = new Promise(function (resolve, reject) {
    con.query("Select * From users", (err, data) => {
      console.log("Inside query statment");
      if (err) {
        console.log("Error: " + err);
        reject(err);
        throw err;
      }
      console.log("return from inside the function"); // how to parse data
      // let test = {UserID:data[0].UserID , FirstName: data[0].FirstName, LastName: data[0].LastName}

      //console.log('Inside the Testing: '+ test)
      //console.log('returning: ' + test)
      //console.log('Inside Data ' + JSON.stringify(data))
      resolve(data);
    });
  });
  return Prom;
};

router.readAuthUser = (username, password) => {
  let prom = new Promise(function (resolve, reject) {
    con.query("Select UserLogin, UserPassword FROM users", (err, data) => {
      if (err) {
        reject(err);
        throw err;
      }
      let i = 0;
      data.forEach((element) => {
        if (
          username === data[i].UserLogin &&
          password === data[i].UserPassword
        ) {
          resolve(true);
        }
        i++;
      });
      resolve(false);
    });
  });
  return prom;
};

// trying too sync the insert and return statment.
router.registerUser = async (user) => {
  let prom = await new Promise(function (reject, resolve) {
    //insertIntoUser(user.LastName,user.firstname,user.userLog,user.password)
    resolve({ status: true, userID: getUserID(user.UserLog) });
  });
  /* if(prom.status == true){
//********************************************************************************************* */
  // Need to pass the params. UserLog, CurCalories,GoCalories,CurWeight,GoWeight,
  // actLevel,UserHeight)=>{
  //    let GoalCal =  // Calorie Formula..
  //  insertIntoUserStat(prom.userID, user)
  // }*/
  return prom;
};
//'Insert INTO users Set ?', {UserID: 4,FirstName: user.FirstName,LastName: user.LastName,UserLogin:user.userID,UserPassword:user.password},(err,res)=>
router.insertIntoUser = (lastname, firstname, userLog, userPass) => {
  //let UserObj = {FirstName:firstname, LastName:lastname, UserLogin: userLog, UserPassword:userPass}
  let UserList = [firstname, lastname, userLog, userPass];
  con.query(
    "Insert INTO users(FirstName, LastName, UserLogin, UserPassword) VALUES(?,?,?,?)",
    UserList,
    (err, data) => {
      if (err) {
        throw err;
      }
    }
  );
};
//Going to use this to insert into USer stat

// UserID, Current_Calories, Goal_Calories,
// Current_Weight, Goal_Weight, Activity_Level, User_Height
router.insertIntoUserStat = (
  userID,
  CurCalories,
  GoCalories,
  CurWeight,
  GoWeight,
  actLevel,
  UserHeightFT,
  UserHightIn,
  UserGender,
  UserAge
) => {
  let UserList = [
    userID,
    CurCalories,
    GoCalories,
    CurWeight,
    GoWeight,
    actLevel,
    UserHeightFT,
    UserHightIn,
    UserGender,
    UserAge,
  ];
  console.log(UserList);
  //calculations to get Goal caloriries..
  let query =
    "Insert INTO User_Stats(UserID, Current_Calories, Goal_Calories,Current_Weight,Goal_Weight, Activity_Level,User_Height_Ft,User_Height_In,User_Gender,User_Age) Values(?,?,?,?,?,?,?,?,?,?)";
  con.query(query, UserList, (err, data) => {
    if (err) {
      throw err;
    }
  });
};

//gets Calories..
router.getUserCalories = (userID, date) => {
  // dd/mm/yyyy
  let query =
    "Select Calorie_Counter From User_Calories where User_ID=? and Date=?";
  let prom = new Promise(function (resolve, reject) {
    con.query(query, [userID, date], (err, data) => {
      if (err) {
        reject(err);
        throw err;
      }
      resolve(JSON.stringify(data[0]));
    });
  });
  return prom;
};

router.insertIntoWeightLog = (UserWight,UserID,Date) =>{
  con.query("Insert INTO User_Weight_Log (Weight_Counter,User_ID,Date) Values (?,?,?)",
            [UserWight,UserID,Date],(err,data)=>{
              if(err){
                throw err;
              }

            });
}

//IDK why i wrote this..
router.setUserCalories = (UserID, date, calories) => {
  let query =
    "Update User_Calories Set Calorie_Counter = ? Where User_ID = ? and Date=?";
  con.query(query, [calories, UserID, date], (err, data) => {
    if (err) {
      throw err;
    }
    //else code should run and should now be inserted.
  });
};
//Insert a new User Calorie Log..
router.InsertUserCalories = (UserID, date, calories) => {
  let query =
    "Insert into User_Calories(Calorie_Counter, User_ID, Date) VALUES (?,?,?)";
  con.query(query, [calories, UserID, date], (err, data) => {
    if (err) {
      throw err;
    }
    //else code should run and should now be inserted.
  });
};

router.insertWorkoutImage = (WorkoutName, WorkoutGroupID, Path) => {
  con.query(
    "Insert into WorkOut_Object (Workout_Name, Workout_GroupID,Workout_ImagePath) VALUES(? , ?, ?)",
    [WorkoutName, WorkoutGroupID, Path],
    (err, data) => {
      if (err) {
        throw err;
      }
      //else Query Should run and insert..
    }
  );
};

router.getUserStats = (UserID) => {
  return new Promise(function (resolve, reject) {
    con.query(
      "Select * from User_Stats WHERE UserID = ?",
      UserID,
      (err, data) => {
        if (err) {
          reject(err);
        }
        //console.log("In database: "+JSON.stringify(data[0]));
        resolve(JSON.stringify(data[0]));
      }
    );
  });
};

//Checking to see if a row for calories exists...
router.CheckCreateCalories = (UserID, date) => {
  return new Promise(function (resolve, reject) {
    con.query(
      "Select EXISTS (Select * from User_Calories WHERE User_ID = ? AND Date = ?)",
      [UserID, date],
      (err, data) => {
        if (err) {
          reject(err);
        }
        data.forEach((element) => {
          console.log(JSON.stringify(data) + "***");
          resolve(
            data[0][
              "EXISTS (Select * from User_Calories WHERE User_ID = " +
                UserID +
                " AND Date = '" +
                date +
                "')"
            ]
          );
        });
      }
    );
  });
};

/*
 * Going to check if a User exists.. If you user exsit then reject the username upon creation..
 */
router.checkUserExists = (UserLogin) => {
  //console.log('Inside funtion: '+UserLogin)
  return new Promise(function (resolve, reject) {
    con.query(
      "Select EXISTS (Select * from users WHERE UserLogin = ?)",
      UserLogin,
      (err, data) => {
        if (err) {
          reject(err);
        }
        // console.log(JSON.stringify(data)+"***\n"  + JSON.stringify(data[0]));
        data.forEach((element) => {
          resolve(
            data[0][
              "EXISTS (Select * from users WHERE UserLogin = '" +
                UserLogin +
                "')"
            ]
          );
        });
      }
    );
  });
};

//Use this to return
router.getUser = (userLog) => {
  let Prom = new Promise(function (resolve, reject) {
    con.query(
      "Select * from users Where UserLogin = ?",
      userLog,
      (err, data) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(JSON.stringify(data[0]));
      }
    );
  });
  return Prom;
};

//Returns  1 if there is at least one row returned.. Which means it exists.
router.checkIfWorkoutExists = (workoutName) => {
  return new Promise(function (resolve, reject) {
    con.query(
      "Select EXISTS(Select * from WorkOut_Object WHERE Workout_Name = ?)",
      workoutName,
      (err, data) => {
        if (err) {
          reject(err);
        }
        data.forEach((element) => {
          resolve(
            data[0][
              "EXISTS(Select * from WorkOut_Object WHERE Workout_Name = '" +
                workoutName +
                "')"
            ]
          );
        });
      }
    );
  });
};
//Gets a single workout by name
router.getWorkout = (workOutName) => {
  return new Promise(function (resolve, reject) {
    con.query(
      "Select * from WorkOut_Object Where Workout_Name = ?",
      workOutName,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.stringify(data[0]));
      }
    );
  });
};

//Grabs all the workouts there..
router.getAllWorkOuts = () => {
  return new Promise(function (resolve, reject) {
    con.query("Select * from WorkOut_Object", (err, data) => {
      if (err) {
        reject(err);
      }
      //console.log("Workouts: " + JSON.stringify(data))
      resolve(JSON.stringify(data));
    });
  });
};

/* 
          Gets the Current Weight for a Specific User. 
        */
router.getCurrentUserWeight = (UserID) => {
  return new Promise(function (resolve, reject) {
    con.query(
      "Select Current_Weight From User_Stats Where UserID = ?",
      UserID,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.stringify(data[0]));
      }
    );
  });
};

router.getUserWeightLog = (UserID) =>{
    return new Promise(function (resolve,reject){
      con.query("Select * FROM User_Weight_Log WHERE User_ID = ?",UserID,(err,data)=>{
        if(err){
          throw err;
        }
        resolve(JSON.stringify(data[0]));
      })
    })
}

//Update the the Current weight for one user..
router.setCurrentUserWeight = (UserID, newWeight) => {
  return new Promise(function (resolve, reject) {
    //Dont need this.. not getting anything back just updateing my table...
    con.query(
      "UPDATE User_Stats SET Current_Weight=? WHERE UserID=?",
      [newWeight, UserID],
      (err, data) => {
        if (err) {
          reject(err);
        }
      }
    );
  });
};

router.setCurrentUserCalories = (UserID, cal) => {
  return new Promise(function (resolve, reject) {
    //Dont need this.. not getting anything back just updateing my table...
    con.query(
      "UPDATE User_Stats SET Current_Calories=? WHERE UserID=?",
      [cal, UserID],
      (err, data) => {
        if (err) {
          reject(err);
        }
      }
    );
  });
};

/**************************************
        Insert function for the Database 
    ****************************************/

router.insertUser = (user) => {
  insta.con.query(
    "Insert INTO users Set ?",
    {
      UserID: 4,
      FirstName: user.FirstName,
      LastName: user.LastName,
      UserLogin: user.userID,
      UserPassword: user.password,
    },
    (err, res) => {
      if (err) {
        console.log("Error: " + err);
        throw err;
      }
      console.log("Last User " + res);
    }
  );
};
//Inserting to the database.. Had to use a function call to avoid repeating
// Inserting values..
const newUser = {
  UserID: 3,
  FirstName: "Count",
  LastName: "Dracula",
  UserLogin: "abc123",
  UserPassword: "password",
};
function InsertNewUser(newUser) {
  con.query("Insert INTO users Set ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: " + err);
      throw err;
    }
    console.log("Last User " + res);
  });
  //InsertNewUser(newUser);
  /**************************************
        Update Function the Database 
    ****************************************/

  const UpdateLastNameValues = (userID, ColName, val) => {
    insta.con.query(
      "Update users Set LastName = ? Where UserID=?",
      [val, userID],
      (err, res) => {
        if (err) {
          console.log("Error In Update: " + err);
          throw err;
        }
      }
    );
    console.log("Col: " + ColName + "\nVal is: " + val);
  };

  //UpdateLastNameValues(3,'LastName','Monster');

  /**************************************
        Delete Function for the Database 
    ****************************************/

  /****
   * To Stop Hanging when running this Node DataManipulation we need to close the connection.
   * When Running this file Uncomment this function.
   */
  // con.end((err) =>{
  // })

  /******************
   * Connection Ending
   ****************/
}

/***************************
 * Testing Code...
 ***************************/
module.exports.hello = () => {
  console.log("Hello World!!");
};
//module.exports = this.readAll();
module.exports = router;
