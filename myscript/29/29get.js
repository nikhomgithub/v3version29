
const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}


const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p29shop/shoplogin`,shoplogin,myheader)
        console.log('p29shop/shoplogin')
        console.log(result1.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`http://${mainUrl}/p29user/login`,userlogin,myheader1)
        console.log('p29user/login')
        console.log(result2.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}}

        //console.log(myheader2)
        result= await axios.post(`http://${mainUrl}/p29product/getlimit`,{},myheader2)

        
        result= await axios.post(`http://${mainUrl}/p29basicdata/getcustom`,{},myheader2)
        console.log('p29transaction/getcustom')
        console.log(result.data)
        //console.log(result.data.data[0].detail)

        result= await axios.post(`http://${mainUrl}/p29product/getlimit`,{},myheader2)
        console.log('p29product/getlimit')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p29group/getcustom`,{},myheader2)
        console.log('p29group/getcustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p29partner/getlimit`,{},myheader2)
        console.log('p29partner/getlimit')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p29transaction/getlimit`,{},myheader2)
        console.log('p29transaction/getlimit')
        console.log(result.data)    

        result= await axios.post(`http://${mainUrl}/p29transactionlog/getlimit`,{},myheader2)
        console.log('p29transactionlog/getlimit')
        console.log(result.data)    
        
        result= await axios.post(`http://${mainUrl}/p29tabletemplate/getcustom`,{},myheader2)
        console.log('p29tabletemplate/getcustom')
        console.log(result.data.data)
        /*
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
        */
    }
    catch (err){
        console.log(err)
    }
}

console.log('p29job')
getStart()