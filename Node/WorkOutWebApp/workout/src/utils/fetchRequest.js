import React from "react";

/***************************** Post Functions********************************************************************* */
export let addToLatestCalorieCount = (jsonObj) => {
  // addCalorie - UserID, UserName, Calorie_Counter(What Calorie count you want to add to overall)
  sendServer("addCalorie", jsonObj);
};

export let getLatestCaloriesForUser = (jsonObj) => {
  // getCalories - UserID, UserLogin
  sendServer("getCalories", jsonObj);
  //return sendServer('/getCalories',jsonObj);
};

export let getCaloriesForSpecificDate = (jsonObj) => {
  // GetCaloriestForDate - UserLogin, date MM-DD-YYYY
  sendServer("getCaloriesForDate", jsonObj);
  //return sendServer('/getCaloriesForDate', jsonObj);
};

export let getUserWeight = (jsonObj) => {
  // GetUserWeight - UserID
  sendServer("getUserWeight", jsonObj);
  //return sendServer('/getUserWeight',jsonObj)
};

export let setUsersWeight = (jsonObj) => {
  // Set UserWeight - UserID, NewWeight
  sendServer("setUserWeight", jsonObj);
};

export let getASingleWorkout = (jsonObj) => {
  // Get Single Workout -  Workout_Name
  sendServer("getSingleWorkout", jsonObj);
  //return sendServer('/getSingleWorkout',jsonObj)
};

export let insertWorkoutIntoTable = (jsonObj) => {
  // Insert Workout - Workout_Name, Workout_GroupID, Workout_ImagePath'
  sendServer("InsertWorkout", jsonObj);
};

export const getUserAuthentication = (jsonObj) => {
  //GetUserAuth - UserLogin, UserPassword
  //sendServer("/getUserAuthentication", jsonObj);
  console.log("** In Get User Function..");
  return sendServer("getUserAuthentication", jsonObj);
};

export let registerUser = (jsonObj) => {
  // Register User - LastName,FirstName,UserLogin,User_Gender, User_Age,UserPassword, Current_Calories,Goal_Calories,Current_Weight,Goal_Weight,Activity_Level,User_Height_Ft,User_Height_In
  return sendServer("registerUser", jsonObj);
  //return sendServer("testReg",jsonObj )
};

export let addCalorieLog = (jsonObj) => {
  // addCalories - UserID, Calorie_Counter
  sendServer("addCalorie", jsonObj);
};

export let getUserWeightLog = (jsonObj)=>{
 return  sendServer("getUserWeightLog",jsonObj);
}

export let getSingleUser = (jsonObj) => {
  // getUser - UserLogin
  sendServer("getUser", jsonObj);
  //return sendServer('/getUser',jsonObj)
};

export let getSingleUserStats = (jsonObj)=>{
  return sendServer('getUserStats',jsonObj);
};

let sendServer = (fetchName, jsonObj) => {
  return new Promise(function (resolve, reject) {
    fetch("/" + fetchName, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(jsonObj),
    })
      .then((result) => {
        result.json().then((data) => {
          //alert("Result: " + JSON.stringify(data));
          resolve(JSON.stringify(data));
        });
        //return result;
      })
      .catch((error) => {
        //console.log('ERROR: ' + error);
        reject(error);
      });
  });
};
/***************************END OF POST METHODS************************************************* */

/**************************START OF GET METHODS ************************ */

let callHelloBackend = (name) => {
  // alert("before Promise")
  return new Promise(function (resolve, reject) {
    //alert("before Getter")
    fetch("/" + name)
      .then((data) => {
        // use fetch to connect to backend
        //alert("\n\n**Data: " + data + "\n\n**");
        data.json().then((data) => {
          //alert("In callHelloBackend: " + JSON.stringify(data));
          resolve(data); // IDk how to test this.. or send it as String or if it works by just returning JSON object.
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export let getAllTheWorkouts = async () => {
  let workouts = await callHelloBackend("GetAllWorkouts");
  //alert("In fetch: " + typeof workouts);
  return workouts; // Should return a JSON obj
};

export let getAllUsers = () => {
  return callHelloBackend("getAllUsers");
};
/**************************END OF GET METHODS ************************ */
