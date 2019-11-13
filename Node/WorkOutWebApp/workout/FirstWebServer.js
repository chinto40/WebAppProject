const http = require('http');
const readL = require('readline')
const mods = require('./myMods.js');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

// this code works..
/* 
const myInter = readL.createInterface({
    readInput: fs.createReadStream('./test.html')
});

myInter.on('line', (fileLine) =>{
    
})*/

http.createServer(mods.requestListener).listen(PORT);



//console.log(mods.requestListener());

/*http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(mods.requestListener('test.html'))
    res.end();
}).listen(PORT);
*/
/*const fs = require('fs');

const PORT = process.env.PORT || 80;


let listener = (request,response)=>{
    // here we use this to send a confirmation that everything went well
    // 200 is Ok Code. and the other parameter is tell that we are sending 
    // a textfile. 
   fs.readFile('./test.html','utf-8',(err,data)=>{
        if(err){
            // if error print here
            response.writeHead(200, {'Content-Type':'text/plain'});
            response.write(`${err}`); // printing error
            response.end();
        }else{ // no errors
            response.writeHead(200, {'Content-Type':'text/plain'});
            response.write(data);
            response.end();
        }
   })

   const server = http.createServer(listener);
   server.listen(3000);*/


   


   
//}