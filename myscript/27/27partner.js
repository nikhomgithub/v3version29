const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_27"}

const getlimit={
    id:1 
}

const updatecustom={
    id:1,
    name:"xxdfas fdsfdsaf safsa ",
}

const addcustom={
    id:2,
    title:"นาย",
    name:"จิตติ.....",
    phone:["12345","67890"],
    photoUrl1:[""],     
    remark:"ของแท้",
    partnerType:"ผู้ซื้อ",
    //partnerype:"ปกติ",
    address:[{
        number:"12",
        tambon:"หมี่แดง",
        district:"เวียงพิง",
        province:"เชียงของ",
        postcode:"12345"
    }],
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


        let result= await axios.post(`http://${mainUrl}/p27partner/init`,init,myheader)
        console.log('p27partner/init')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27partner/getlimit`,getlimit,myheader2)
        console.log('p27partner/getlimit')
        console.log(result.data)

        
        result= await axios.post(`http://${mainUrl}/p27partner/updatecustom`,updatecustom,myheader2)
        console.log('p27partner/updatecustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27partner/getlimit`,getlimit,myheader2)
        console.log('p27partner/getlimit')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27partner/addcustom`,addcustom,myheader2)
        console.log('p27partner/addcustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27partner/getlimit`,{},myheader2)
        console.log('p27partner/getlimit')
        console.log(result.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()