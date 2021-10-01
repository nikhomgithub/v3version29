const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_25"}
const backup = {shopName:"shopa",confirm_password:"server_25"}
const restore = {shopName:"shopa",confirm_password:"server_25",filePath:"backupData/02_07_2021_job.json"}

const addcustom={
        id:2,
        dateIn:"2021-01-01",
        dateTarget:"2021-01-19",
        dateOut:"2021-01-29",
    
        photoUrl1:["https://picsum.photos/200/300"],
        photoUrl2:["https://picsum.photos/200/300"],
    
        //transactionType:"งานซ่อม",
        //status:"open",
        
        jobType:"เรือรดน้ำ",
        jobStatus:"เสร็จแล้ว",
    
        customerId:1,
        title:"นาย",
        name:"กกกกกกกกกกกก",
        surname:"ทนทนทนทนทนท",
        phone:["12345","67890"],
    
        remark:"ด่วน",
    
        jobValue:1000,
        progress:100
    
}

const updatecustom={
    id:2       ,
    title: "คุณ นายยยยยยยยยยยย",
    name:"hello hello",
}



const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p25job/mytest`,{},myheader)
        console.log('p25job/mytest')
        console.log(result1.data)

        const result222= await axios.post(`http://${mainUrl}/p25basicdata/init`,init,myheader)
        console.log('p25baicdata/init')
        console.log(result222.data)

        const result2= await axios.post(`http://${mainUrl}/p25job/init`,init,myheader)
        console.log('p25baicdata/init')
        console.log(result2.data)

        const result3= await axios.post(`http://${mainUrl}/p25job/backup`,backup,myheader)
        console.log('p25job/backup')
        console.log(result3.data)

        const result4= await axios.post(`http://${mainUrl}/p25job/restore`,restore,myheader)
        console.log('p25job/restore')
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

        const result7= await axios.post(`http://${mainUrl}/p25job/getlimit`,{},myheader2)
        console.log('p25job/getlimit')
        console.log(result7.data)

        const result8= await axios.post(`http://${mainUrl}/p25job/addcustom`,addcustom,myheader2)
        console.log('p25job/addcustom')
        console.log(result8.data)

        const result9= await axios.post(`http://${mainUrl}/p25job/getlimit`,{},myheader2)
        console.log('p25job/getlimit')
        console.log(result9.data)

        const result10= await axios.post(`http://${mainUrl}/p25job/updatecustom`,updatecustom,myheader2)
        console.log('p25job/updatecustom')
        console.log(result10.data)

        const result11= await axios.post(`http://${mainUrl}/p25job/getlimit`,{},myheader2)
        console.log('p25job/getlimit')
        console.log(result11.data)

        const result12= await axios.post(`http://${mainUrl}/p25job/deletecustom`,{id:2},myheader2)
        console.log('p25job/deletecustom')
        console.log(result12.data)

        const result13= await axios.post(`http://${mainUrl}/p25job/getlimit`,{},myheader2)
        console.log('p25job/getlimit')
        console.log(result13.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p25job')
getStart()