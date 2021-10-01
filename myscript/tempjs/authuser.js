const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shopinit={shopName:"shopa",confirm_password:"v3"}
const userinit={shopName:"shopa",confirm_password:"v3"}

const getuser={shopName:"shopa",confirm_password:"v3"}
const getlimituser={shopName:"shopa",confirm_password:"v3"}

const userbackup={shopName:"shopa",confirm_password:"v3"}
const userrestore={shopName:"shopa",confirm_password:"v3",filePath:"backupData/01_07_2021_user.json"}


const deleteuser={shopName:"shopa",username:"usera",confirm_password:"v3"}
const updateuser={shopName:"shopa",username:"usera",confirm_password:"v3",ownerEmail:"aaaaaa"}


const getStart = async()=>{

    
    const result_shopinit= await axios.post(`http://${mainUrl}/shop/shopinit`,shopinit,myheader)
    console.log('shopinit')
    console.log(result_shopinit.data)

    const result2= await axios.post(`http://${mainUrl}/user/userinit`,userinit,myheader)
    console.log('userinit')
    console.log(result2.data)

    const result3= await axios.post(`http://${mainUrl}/user/getuser`,getuser,myheader)
    console.log('getuser')
    console.log(result3.data)

    const result4= await axios.post(`http://${mainUrl}/user/userbackup`,userbackup,myheader)
    console.log('userbackup')
    console.log(result4.data)

    const result5= await axios.post(`http://${mainUrl}/user/userrestore`,userrestore,myheader)
    console.log('userrestore')
    console.log(result5.data)

    const result6= await axios.post(`http://${mainUrl}/user/getlimituser`,getlimituser,myheader)
    console.log('getlimituser')
    console.log(result6.data)

    const result7= await axios.post(`http://${mainUrl}/user/updateuser`,updateuser,myheader)
    console.log('updateuser')
    console.log(result7.data)

    const result8= await axios.post(`http://${mainUrl}/user/deleteuser`,deleteuser,myheader)
    console.log('deleteuser')
    console.log(result8.data)

    const result9= await axios.post(`http://${mainUrl}/user/userinit`,userinit,myheader)
    console.log('userinit again')
    console.log(result9.data)
}


console.log('appuser')
getStart()