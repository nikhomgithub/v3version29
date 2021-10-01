const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_27"}
const backup = {shopName:"shopa",confirm_password:"server_27"}
const restore = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_tabletemplate.json"}

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

        result= await axios.post(`http://${mainUrl}/p27tabletemplate/getcustom`,{},myheader2)
        console.log('p27partner/getcustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27tabletemplate/backup`,backup,myheader2)
        console.log('p27partner/backup')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27tabletemplate/restore`,restore,myheader2)
        console.log('p27partner/restore')
        console.log(result.data)


        result= await axios.post(`http://${mainUrl}/p27tabletemplate/getcustom`,{},myheader2)
        console.log('p27partner/getcustom')
        console.log(result.data.data)

        const tableName= 'basicDataTableTemplate'
        const template=result.data.data[0].template

        result= await axios.post(`http://${mainUrl}/p27tabletemplate/updatetabletemplate`,
                {tableName,template},myheader2)
        console.log('p27tabletemplate/updatetabletemplate')
        console.log(result.data.data)

        result= await axios.post(`http://${mainUrl}/p27tabletemplate/getcustom`,{},myheader2)
        console.log('p27partner/getcustom')
        console.log(result.data.data)
    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()