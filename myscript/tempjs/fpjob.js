const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_1"}
const backup = {shopName:"shopa",confirm_password:"server_1"}
const restore = {shopName:"shopa",confirm_password:"server_1",filePath:"backupData/01_07_2021_job.json"}

const addcustom={
        id:2       ,
        date: new Date().toISOString().substring(0,10),
    
        title:"second job",
        category:"second group",
        body:"ssss sss sss sss ssss sss sss sss ss",
    
        photoUrl1:[""],
        videoLink:"",
        active:true,
        
        comment:"aaa ment ........",
        usernameComment:"Jack",
}

const updatecustom={
    id:2       ,
    title:"hello hello",
    category:"hello hello",
}



const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/fpjob/mytest`,{},myheader)
        console.log('fpjob/mytest')
        console.log(result1.data)

        const result222= await axios.post(`http://${mainUrl}/fpbasicdata/init`,init,myheader)
        console.log('fpbaicdata/init')
        console.log(result222.data)

        const result2= await axios.post(`http://${mainUrl}/fpjob/init`,init,myheader)
        console.log('fpbaicdata/init')
        console.log(result2.data)

        const result3= await axios.post(`http://${mainUrl}/fpjob/backup`,backup,myheader)
        console.log('fpjob/backup')
        console.log(result3.data)

        const result4= await axios.post(`http://${mainUrl}/fpjob/restore`,restore,myheader)
        console.log('fpjob/restore')
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

        const result7= await axios.post(`http://${mainUrl}/fpjob/getlimit`,{},myheader2)
        console.log('fpjob/getlimit')
        console.log(result7.data)

        const result8= await axios.post(`http://${mainUrl}/fpjob/addcustom`,addcustom,myheader2)
        console.log('fpjob/addcustom')
        console.log(result8.data)

        const result9= await axios.post(`http://${mainUrl}/fpjob/getlimit`,{},myheader2)
        console.log('fpjob/getlimit')
        console.log(result9.data)

        const result10= await axios.post(`http://${mainUrl}/fpjob/updatecustom`,updatecustom,myheader2)
        console.log('fpjob/updatecustom')
        console.log(result10.data)

        const result11= await axios.post(`http://${mainUrl}/fpjob/getlimit`,{},myheader2)
        console.log('fpjob/getlimit')
        console.log(result11.data)

        const result12= await axios.post(`http://${mainUrl}/fpjob/deletecustom`,{id:2},myheader2)
        console.log('fpjob/deletecustom')
        console.log(result12.data)

        const result13= await axios.post(`http://${mainUrl}/fpjob/getlimit`,{},myheader2)
        console.log('fpjob/getlimit')
        console.log(result13.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('fpjob')
getStart()