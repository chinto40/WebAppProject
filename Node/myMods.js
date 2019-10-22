let fs = require('fs');
let url = require('url')




/*exports.requestListener = function(filename) {
    console.log('before read in and file is: ' + filename)
        fs.readFile(('./'+filename+'/'), 'utf-8',(err,data)=>{
            //console.log('Data is: ' + data)
            if(err){
                console.log('in ERr: ' + data)
                /*res.writeHead(200, {'Content-Type':'text/html'});
                res.write(`${err}`);
                res.end();*/
           // }else{
                //console.log('in here: ' + data)
                /*res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
                res.end();*
                return data;
            }
            console.log('finished');
        })
    }*/

exports.requestListener = function(req,res) {
    ///console.log('before read in')
   //console.log('Log: '+req.log)
    /******************************************************************************/
            // stuff to look up 
    // node js host request example.. 
   // node js post request... 
   /******************************************************************************/



        let path = url.parse(req.url).pathname;
        console.log('Path is: '+path); // gives you the url name... 
        console.log('Dir: '+__dirname) // gives you the complete path of directory
        switch(path){
            case '/':
                fs.readFile(__dirname+'/test.html', 'utf-8',(err,data)=>{
                    if(err){
                        //console.log('in ERr: ' + data)
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.write(`${err}`);
                        res.end();
                    }else{
                        //console.log('in here: ' + data)
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.write(data);
                        res.end();
                    }
                    //console.log('finished');

                })
                break;
            case '/test2.html':
                fs.readFile(__dirname+'/test2.html', 'utf-8',(err,data)=>{
                    if(err){
                        //console.log('in ERr: ' + data)
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.write(`${err}`);
                        res.end();
                    }else{
                        //console.log('in here: ' + data)
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.write(data);
                        res.end();
                    }
                    //console.log('finished');
                })
                break;
            default:
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    res.write(`404 Error: Web Page Not Found!`);
                    res.end();
                break;
            
        }
       // console.log(('test.html').getElementById('input'));
    }
