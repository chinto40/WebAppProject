const mysql = require('mysql');
const Promise = require('promise')



const con = mysql.createConnection({
    //host: 'http://136.50.22.117:80/phpmyadmin/index.php',
    //host: "http://136.50.22.117:80/phpmyadmin/db_structure.php?server=1&db=school",
    host: "136.50.22.117",
    user: 'chinto',
    password: 'password',
    database: 'school',
    port: '3306'
});

// con.connect((err) =>{
//     if(err){
//         console.log('Error connecting to DB: ' + err);
//         return;
//     }
//     console.log('Connection Successful');
// });

//In case i need a function to connect...
const DBConnect = () =>{
    con.connect((err) =>{
        if(err){
            console.log('Error connecting to DB: ' + err);
            return;
        }
        console.log('Connection Successful');
    });
}

/**************************************
    Reading From the Database 
****************************************/ 

// reading in from the database..
// con.query('Select * From users',(err, data) =>{
//     if(err){
//         console.log('Error: ' + err);
//         throw err;
//     }
//    /// console.log(data[0].UserID); // how to parse data
//    console.log(data[0]);
// })
exports.Auth = false;

// Authenticating User from the Database... **********************************************
 module.exports.readAuthUser = (username, password) =>{
    let result = false;
    let r = false;
     
         con.query('Select UserLogin, UserPassword FROM users',(err ,data)=>{
        
        if(err){
            console.log('Error: ' + err);
            throw err;
        }
        console.log('in the middle' + password);
        let i =0;
        r = false;
        data.forEach(element => {
            console.log(data[i].UserLogin + ' : ' + data[i].UserPassword + ', ' + username + ':' + password);
            if(username === data[i].UserLogin && password === data[i].UserPassword){
                console.log('true-true');
                 r = true;
                 auth = true;
            }
           i++;
        });
        TheEnd();
        console.log('inner Results: '+ r);
        
    })
   
    console.log('out Results: '+ result);
    result = r;
    return result,console.log('Error')


};

/**************************************
    Insert function for the Database 
****************************************/ 

//Inserting to the database.. Had to use a function call to avoid repeating 
// Inserting values..  
const newUser = {UserID:3,FirstName:'Count',LastName:'Dracula',UserLogin:'abc123',UserPassword:'password'};
function InsertNewUser(newUser){
    con.query('Insert INTO users Set ?', newUser,(err,res)=>{
        if(err){
            console.log('Error: ' + err);
            throw err;
        }
        console.log('Last User ' + res);
    });
}
//InsertNewUser(newUser);
/**************************************
    Update Function the Database 
****************************************/ 
const UpdateLastNameValues = (userID, ColName, val)=>{
    con.query('Update users Set LastName = ? Where UserID=?', 
            [val,userID], (err,res) =>{
        if(err){
            console.log('Error In Update: ' + err);
            throw err;
        }
    });
    console.log('Col: ' + ColName + '\nVal is: '+ val);
};


//UpdateLastNameValues(3,'LastName','Monster');

/**************************************
    Delete Function for the Database 
****************************************/ 


/******************
 * Connection Ending
 ****************/
const TheEnd = ()=>{
  con.end((err) =>{

    })  
}
 

/***************************
 * Testing Code... 
 ***************************/
module.exports.hello = () =>{
    console.log('Hello World!!');
}