const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}
const changepassword={username:"usera",password:"usera",newPassword1:"userb",newPassword2:"userb"}
const changepassword2={username:"usera",password:"userb",newPassword1:"usera",newPassword2:"usera"}

const getStart=async()=>{

    try {
    const result1= await axios.post(`http://${mainUrl}/shop/shoplogin`,shoplogin,myheader)
    console.log('shop/shoplogin')
    console.log(result1.data)

    const result2= await axios.post(`http://${mainUrl}/p25shop/shoplogin`,shoplogin,myheader)
    console.log('fpshop/shoplogin')
    console.log(result2.data)

    const myheader1={ headers: {'Content-Type': 'application/json',
    'Shopauthorization':`b ${result1.data.shopToken}`}}

    const result3= await axios.post(`http://${mainUrl}/p25user/login`,userlogin,myheader1)
    console.log(result3.data)


    const result4= await axios.post(`http://${mainUrl}/p25user/changepassword`,changepassword,myheader1)
    console.log('changepassword')
    console.log(result4.data)

    const result5= await axios.post(`http://${mainUrl}/p25user/changepassword`,changepassword2,myheader1)
    console.log('changepassword back')
    console.log(result5.data)
    }
    catch(err){
        console.log(err)
    }
}


console.log('p25shop')
getStart()