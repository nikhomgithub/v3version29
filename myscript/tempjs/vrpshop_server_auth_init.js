const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
mainUrl="vrpshop.net"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"vrpshop_server_auth"}

 getStart=async()=>{

    try {

        let result= await axios.get(`http://${mainUrl}/test`,myheader)
        console.log('fpshop/init')
        console.log(result.data)

       // result= await axios.post(`http://${mainUrl}/user/init`,init,myheader)
       // console.log('fpuser/init')
       // console.log(result.data)
      
    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()