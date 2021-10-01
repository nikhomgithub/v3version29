const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_27"}

const getcustom={
    id:1
    
}

const updatecustom={
    id:1,
    title:[ 'นาย', 'นาง', 'นางสาว','love you']

}



const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p27shop/shoplogin`,shoplogin,myheader)
        console.log('p27shop/shoplogin')
        console.log(result1.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`http://${mainUrl}/p27user/login`,userlogin,myheader1)
        console.log('p27user/login')
        console.log(result2.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}}


        let result= await axios.post(`http://${mainUrl}/p27basicdata/init`,init,myheader)
        console.log('p27basicdata/init')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27basicdata/getcustom`,getcustom,myheader2)
        console.log('p27basicdata/getcustom')
        console.log(result.data)
        console.log(result.data.data[0].title)

        
        result= await axios.post(`http://${mainUrl}/p27basicdata/updatecustom`,updatecustom,myheader2)
        console.log('p27basicdata/updatecustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27basicdata/getcustom`,getcustom,myheader2)
        console.log('p27basicdata/getcustom')
        console.log(result.data)
        console.log(result.data.data[0].title)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()