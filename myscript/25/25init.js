const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
 mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init_server_auth = {shopName:"shopa",confirm_password:"server_auth"}
const init_server_1 = {shopName:"shopa",confirm_password:"server_1"}
const init_server_25 = {shopName:"shopa",confirm_password:"server_25"}
const init_server_27 = {shopName:"shopa",confirm_password:"server_27"}

 getStart=async()=>{

    try {
        let result

        /*
        result= await axios.post(`http://${mainUrl}/shop/shopinit`,init_server_auth,myheader)
        console.log('shop/init')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/user/userinit`,init_server_auth,myheader)
        console.log('user/init')
        console.log(result.data)
        

        result= await axios.post(`http://${mainUrl}/fpbasicdata/init`,init_server_1,myheader)
        console.log('fpbasicdata/init')
        console.log(result)

         result= await axios.post(`http://${mainUrl}/fpjob/init`,init_server_1,myheader)
        console.log('fpjob/init')
        console.log(result)

        result= await axios.post(`http://${mainUrl}/p25basicdata/init`,init_server_25,myheader)
        console.log('p25basicdata/init')

        result= await axios.post(`http://${mainUrl}/p25job/init`,init_server_25,myheader)
        console.log('p25job/init')
       
        result= await axios.post(`http://${mainUrl}/p25customer/init`,init_server_25,myheader)
        console.log('p25customer/init')

        result= await axios.post(`http://${mainUrl}/p25know/init`,init_server_25,myheader)
        console.log('p25know/init')

        result= await axios.post(`http://${mainUrl}/p25sticker/init`,init_server_25,myheader)
        console.log('p25sticker/init')

        result= await axios.post(`http://${mainUrl}/p27basicdata/init`,init_server_27,myheader)
        console.log('p27basicdata/init')

        result= await axios.post(`http://${mainUrl}/p27group/init`,init_server_27,myheader)
        console.log('p27group/init')
       
        result= await axios.post(`http://${mainUrl}/p27product/init`,init_server_27,myheader)
        console.log('p27product/init')

        result= await axios.post(`http://${mainUrl}/p27partner/init`,init_server_27,myheader)
        console.log('p27partner/init')

        result= await axios.post(`http://${mainUrl}/p27transaction/init`,init_server_27,myheader)
        console.log('p27transaction/init')

        result= await axios.post(`http://${mainUrl}/p27transactionlog/init`,init_server_27,myheader)
        console.log('p27transactionlog/init') 
        */
    }
    catch (err){
        console.log(err)
    }
}

console.log('p25job')
getStart()