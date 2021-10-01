const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_25"}
const backup = {shopName:"shopa",confirm_password:"server_25"}
const restore = {shopName:"shopa",confirm_password:"server_25",filePath:"backupData/02_07_2021_customer.json"}

const addcustom={
    id:2,
    title:"นาย",
    name:"สงครามมมมมมมมม",
    surname:"ดี",
    phone:["12345","67890"],
    customerType:"ปกติ",
    address:[{
        number:"12",
        tambon:"หมี่แดง",
        district:"เวียงพิง",
        province:"เชียงของ",
        postcode:"12345"
    }],
    photoUrl1:[""],     
    remark:"ของแท้",
    
}

const updatecustom={
    id:2       ,
    title: "คุณ นายยยยยยยยยยยย",
    name:"hello hello",
}



const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p25customer/mytest`,{},myheader)
        console.log('p25customer/mytest')
        console.log(result1.data)

        const result222= await axios.post(`http://${mainUrl}/p25basicdata/init`,init,myheader)
        console.log('p25baicdata/init')
        console.log(result222.data)

        const result2= await axios.post(`http://${mainUrl}/p25customer/init`,init,myheader)
        console.log('p25customer/init')
        console.log(result2.data)

        const result333= await axios.post(`http://${mainUrl}/p25job/init`,init,myheader)
        console.log('p25job/init')
        console.log(result333.data)

        const result3= await axios.post(`http://${mainUrl}/p25customer/backup`,backup,myheader)
        console.log('p25customer/backup')
        console.log(result3.data)

        const result4= await axios.post(`http://${mainUrl}/p25customer/restore`,restore,myheader)
        console.log('p25customer/restore')
        console.log(result4.data)


        const result5= await axios.post(`http://${mainUrl}/p25shop/shoplogin`,shoplogin,myheader)
        console.log('p25shop/shoplogin')
        console.log(result5.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result5.data.shopToken}`}}
    
        const result6= await axios.post(`http://${mainUrl}/p25user/login`,userlogin,myheader1)
        console.log('p25user/login')
        console.log(result6.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result5.data.shopToken}`,
        'Userauthorization':`b ${result6.data.userToken}`}}

        const result7= await axios.post(`http://${mainUrl}/p25customer/getlimit`,{},myheader2)
        console.log('p25customer/getlimit')
        console.log(result7.data)

        const result8= await axios.post(`http://${mainUrl}/p25customer/addcustom`,addcustom,myheader2)
        console.log('p25customer/addcustom')
        console.log(result8.data)

        const result9= await axios.post(`http://${mainUrl}/p25customer/getlimit`,{},myheader2)
        console.log('p25customer/getlimit')
        console.log(result9.data)

        const result10= await axios.post(`http://${mainUrl}/p25customer/updatecustom`,updatecustom,myheader2)
        console.log('p25customer/updatecustom')
        console.log(result10.data)

        const result11= await axios.post(`http://${mainUrl}/p25customer/getlimit`,{},myheader2)
        console.log('p25customer/getlimit')
        console.log(result11.data)

        const result12= await axios.post(`http://${mainUrl}/p25customer/deletecustom`,{id:2},myheader2)
        console.log('p25customer/deletecustom')
        console.log(result12.data)

        const result13= await axios.post(`http://${mainUrl}/p25customer/getlimit`,{},myheader2)
        console.log('p25customer/getlimit')
        console.log(result13.data)

        const result15= await axios.post(`http://${mainUrl}/p25tabletemplate/getcustom`,{},myheader2)
        console.log('p25tabletemplate/getcustom')
        console.log(result15.data)
    }
    catch (err){
        console.log(err)
    }
}

console.log('p25customer')
getStart()