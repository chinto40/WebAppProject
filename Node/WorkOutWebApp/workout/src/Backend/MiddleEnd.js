const DB = require('./DataManipulation.js')

let mid =()=>{
    console.log('Hellow')

}



/*  Here the getter syntax for get api call...
comp(func) {
    this.callHelloBackend(func)
      .then((req, res) => {
        alert(res.Hello);
        //this.setState({ data: res.Hello }).then();
        this.setState(res).then();
      })
      .catch(err => console.log(err));
  }

  callHelloBackend = async (func) => {
    const response = await fetch("/"+func); // use fetch to connect to backend
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.Error);
    }
    let temp = JSON.parse(JSON.stringify(body));
    this.setState(temp[1]);
    alert("after changes " + this.state);
  };

  buttonOnAction = () => {
    this.comp('getUser')
  };
  */


  /* Here doing a post api call.. with button on action.. 
  ButtonTwoWay = () =>{
   // this.setState({ UserID: 4, firstName : 'Victory', lastName: 'Stone', userLogin: 'xyz123',password:'password' });
    this.sendToServer('getUserAuthentication');
  }

  sendToServer= async (name)=>{
    let respond = await fetch(('/'+name),{ // awaits for data.. 
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        }
      }).then((result)=> {
            if(result.status >= 200){ //returning 200 which means it sucessful // 400 means bad 
              return result.json();
            }else{
              throw new Error ('Something aint right Here >:| !' + result.status)
            }
          }) 
        this.state.Auth = respond; // saving it to the state.. 
        alert('after Everything: ' + this.state.Auth)
      }*/