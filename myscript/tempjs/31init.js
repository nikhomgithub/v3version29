const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_31"}

const getStart=async()=>{

    try {

        let result1

        result1= await axios.post(`http://${mainUrl}/p31basicdata/init`,init,myheader)
        console.log('p31basicdata/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p31sticker/init`,init,myheader)
        console.log('p31sticker/init')
        console.log(result1.data)


        result1= await axios.post(`http://${mainUrl}/p31shop/shoplogin`,shoplogin,myheader)
        console.log('p31shop/shoplogin')
        console.log(result1.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`http://${mainUrl}/p31user/login`,userlogin,myheader1)
        console.log('p31user/login')
        console.log(result2.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`
        }}

        const result= await axios.post(`http://${mainUrl}/p31sticker/getlimit`,{},myheader2)
        console.log('p31sticker/getlimit')
        console.log(result.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p31sticker')
getStart()