const mysql = require('mysql');
const Promise = require('promise')
let express = require('express')
let router = express.Router()

    // instance of mysql connection,.. 
    // let con; to define it and use it as a indicator for insta the sql connection creating a singleton... 
    let insta = ()=>{
        if (insta.con === 'undefined'){
            insta.con = mysql.createConnection({
                //host: 'http://136.50.22.117:80/phpmyadmin/index.php',
                //host: "http://136.50.22.117:80/phpmyadmin/db_structure.php?server=1&db=school",
                host: '136.50.22.117',
                user: 'chinto',
                password: 'password',
                database: 'school',
                port: '3306'
            });
        }
    }
  //  insta();

    let con = mysql.createConnection('mysql://stumbling_sweat_sliders:DC2j!CePCjTnrH@DL7@easel1.fulgentcorp.com:3306/stumbling_sweat_sliders',
    )

    con.connect((err) =>{
        if(err){
            console.log('Error connecting to DB: ' + err);
            return;
        }
        console.log('Connection Successful');
    });
    console.log('**Connection: ' + con)
    console.log('***state is: ' + con.state)

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
    //DBConnect()

    /* Ends the Database Communications...*/
    function TheEnd (){
        con.end((err) =>{
    
            })  
        }

    /**************************************
        Reading From the Database 
    ****************************************/ 

   router.readAll2 = ()=>{
        console.log('before query statment')
        let Prom  = new Promise(function(resolve, reject){
            con.query('Select * From users',(err, data) =>{
                console.log('Inside query statment')
                if(err){
                    console.log('Error: ' + err);
                    reject(err)
                    throw err;
                }
            console.log('return from inside the function'); // how to parse data
           // let test = {UserID:data[0].UserID , FirstName: data[0].FirstName, LastName: data[0].LastName}

            //console.log('Inside the Testing: '+ test)
            //console.log('returning: ' + test)
            //console.log('Inside Data ' + JSON.stringify(data))
            resolve (data)
            })
            
        })
        return Prom;
   }

    router.readAuthUser = (username, password) =>{
        let prom = new Promise(function(resolve, reject){  
            con.query('Select UserLogin, UserPassword FROM users',(err ,data)=>{
                    if(err){
                        reject(err)
                        throw err;
                    }
                    let i = 0;
                    data.forEach(element => {
                        if(username === data[i].UserLogin && password === data[i].UserPassword){
                            resolve(true);
                        }
                    i++;
                });
            resolve(false);
        })
    }) 
    return prom;
};
  
    // reading in from the database..
  /*  router.readAll = ()=>{
        let test = {};
        let def =  Q.defer();
        let prom =  Q.Promise((resolve, reject)=>{
            con.query('Select * From users',(err, data) =>{
                if(err){
                    console.log('Error: ' + err);
                    def.reject(err)
                    throw err;
                }
                //console.log(data[0].UserID); // how to parse data
                test = {UserID:data[0].UserID , FirstName: data[0].FirstName, LastName: data[0].LastName}
                console.log('Inside the Testing: '+ JSON.stringify(test))
                // def.resolve(JSON.stringify(data))
                def.resolve(data[0].FirstName)
            })
        })
        console.log('***Ending of function call: ')
       console.log('Last Promise: '+ def.promise);
       // return  JSON.stringify(Promise.all(def.promise))
       return  def.promise;
    }*/

   
    //console.log('\n**Database is outside: '+ insta.con.state);
    // Authenticating User from the Database... **********************************************
    /*router.readAuthUser2 = (username, password) =>{
        let result = false;
        let def =  Q.defer(); // using q to defer a promise.. 
        let prom = Q.Promise((resolve, reject)=>{
            con.query('Select UserLogin, UserPassword FROM users',(err ,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    def.reject(err)
                    throw err;
                }
                console.log('in the middle' + password);
                console.log('\n**Database is inside: '+ con.state);
                let i =0;
                result = false;
                data.forEach(element => {
                    console.log(data[i].UserLogin + ' : ' + data[i].UserPassword + ', ' + username + ':' + password);
                    if(username === data[i].UserLogin && password === data[i].UserPassword){
                        console.log('true-true');
                        result = true;
                        def.resolve(result);
                    }
                i++;
            });
            console.log('inner Results: '+ result);
            def.resolve(result);
        });
    });
        console.log('out Results: '+ result);
        return def.promise;
    };*/

    /**************************************
        Insert function for the Database 
    ****************************************/ 

        router.insertUser = (user)=>{
            insta.con.query('Insert INTO users Set ?', {UserID: 4,FirstName: user.FirstName,LastName: user.LastName,UserLogin:user.userID,UserPassword:user.password},(err,res)=>{
                if(err){
                    console.log('Error: ' + err);
                    throw err;
                }
                console.log('Last User ' + res);
            });
        }
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
    //InsertNewUser(newUser);
    /**************************************
        Update Function the Database 
    ****************************************/ 
    const UpdateLastNameValues = (userID, ColName, val)=>{
        insta.con.query('Update users Set LastName = ? Where UserID=?', 
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
module.exports.hello = () =>{
    console.log('Hello World!!');
}
//module.exports = this.readAll();
module.exports = router;