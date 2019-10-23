//import {hello} from './DataManipulation.js';
// amazon s3 for digital images.. 
// Q module api to use for deffered promises.. 
const DB = require('./DataManipulation.js');
const mysql = require('mysql')
const prom = require('promise');
 
const row =  DB.readAuthUser('xtd781','password')
if(row){
    console.log('In Test: true');
}else{
    console.log('In test: false');
    console.log("No promise herer");
}

