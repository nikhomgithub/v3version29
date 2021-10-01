const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_1"}
const backup = {shopName:"shopa",confirm_password:"server_1"}
const restore = {shopName:"shopa",confirm_password:"server_1",filePath:"backupData/01_07_2021_basicdata.json"}

const updatecustom={id:1,category:["ซ่อม","ผลิต","ใหม่","ทดลอง"]}

const getStart=async()=>{

        const result1= await axios.post(`http://${mainUrl}/fpbasicdata/mytest`,{},myheader)
        console.log('fpshop/mytest')
        console.log(result1.data)

        const result2= await axios.post(`http://${mainUrl}/fpbasicdata/init`,init,myheader)
        console.log('fpbaicdata/init')
        console.log(result2.data)

        const result3= await axios.post(`http://${mainUrl}/fpbasicdata/backup`,backup,myheader)
        console.log('fpbasicdata/backup')
        console.log(result3.data)

        const result4= await axios.post(`http://${mainUrl}/fpbasicdata/restore`,restore,myheader)
        console.log('fpbasicdata/restore')
        console.log(result4.data)


        const result5= await axios.post(`http://${mainUrl}/fpshop/shoplogin`,shoplogin,myheader)
        console.log('fpshop/shoplogin')
        console.log(result5.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result5.data.shopToken}`}}
    
        const result6= await axios.post(`http://${mainUrl}/fpuser/login`,userlogin,myheader1)
        console.log('fpuser/login')
        console.log(result6.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result5.data.shopToken}`,
        'Userauthorization':`b ${result6.data.userToken}`}}

        const result7= await axios.post(`http://${mainUrl}/fpbasicdata/getcustom`,{},myheader2)
        console.log('fpbasicdata/getcustom')
        console.log(result7.data)
        console.log(result7.data.data[0].category)

        const result8= await axios.post(`http://${mainUrl}/fpbasicdata/updatecustom`,updatecustom,myheader2)
        console.log('fpbasicdata/updatecustom')
        console.log(result8.data)

        const result9= await axios.post(`http://${mainUrl}/fpbasicdata/getcustom`,{},myheader2)
        console.log('fpbasicdata/getcustom')
        console.log(result9.data)
        console.log(result9.data.data[0].category)

}

console.log('fpbasicdata')
getStart()