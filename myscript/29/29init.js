const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_29"}
const backup = {shopName:"shopa",confirm_password:"server_29"}
const restoretransaction = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_transaction.json"}
const restoretransactionlog = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_transactionlog.json"}
const restorepartner = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_partner.json"}
const restoregroup = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_group.json"}
const restoreproduct = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_product.json"}
const restorebasicdata = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_basicdata.json"}


const getStart=async()=>{

    try {

        let result1

        
        result1= await axios.post(`http://${mainUrl}/p29transaction/init`,init,myheader)
        console.log('p29transaction/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p29transactionlog/init`,init,myheader)
        console.log('p29transactionlog/init')
        console.log(result1.data)

    
        result1= await axios.post(`http://${mainUrl}/p29partner/init`,init,myheader)
        console.log('p29partner/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p29product/init`,init,myheader)
        console.log('p29product/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p29group/init`,init,myheader)
        console.log('p29group/init')
        console.log(result1.data)


        result1= await axios.post(`http://${mainUrl}/p29basicdata/init`,init,myheader)
        console.log('p29basicdata/init')
        console.log(result1.data)
        
        
        result1= await axios.post(`http://${mainUrl}/p29tabletemplate/init`,init,myheader)
        console.log('p29tabletemplate/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p29sticker/init`,init,myheader)
        console.log('p29sticker/init')
        console.log(result1.data)
    }
    catch (err){
        console.log(err)
    }
}

console.log('p29init')
getStart()


/*
const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_29"}
const backup = {shopName:"shopa",confirm_password:"server_29"}
const restoretransaction = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_transaction.json"}
const restoretransactionlog = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_transactionlog.json"}
const restorepartner = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_partner.json"}
const restoregroup = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_group.json"}
const restoreproduct = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_product.json"}
const restorebasicdata = {shopName:"shopa",confirm_password:"server_29",filePath:"backupData/02_07_2021_basicdata.json"}

const getStart=async()=>{

    try {
        //let result1
        //result1= await axios.post(`http://${mainUrl}/p29transaction/init`,init,myheader)
        //console.log('p29transaction/init')
        //console.log(result1.data)

        //result1= await axios.post(`http://${mainUrl}/p29transactionlog/init`,init,myheader)
        //console.log('p29transactionlog/init')
        //console.log(result1.data)

    
        result1= await axios.post(`http://${mainUrl}/p29partner/init`,init,myheader)
        console.log('p29partner/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p29product/init`,init,myheader)
        console.log('p29product/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p29group/init`,init,myheader)
        console.log('p29group/init')
        console.log(result1.data)


        result1= await axios.post(`http://${mainUrl}/p29basicdata/init`,init,myheader)
        console.log('p29basicdata/init')
        console.log(result1.data)
        
        //----------------------------------
        
         result1= await axios.post(`http://${mainUrl}/p29transaction/backup`,backup,myheader)
        console.log('p29transaction/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p29transactionlog/backup`,backup,myheader)
        console.log('p29transactionlog/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p29partner/backup`,backup,myheader)
        console.log('p29partner/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p29product/backup`,backup,myheader)
        console.log('p29product/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p29group/backup`,backup,myheader)
        console.log('p29group/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p29basicdata/backup`,backup,myheader)
        console.log('p29basicdata/backup')
        console.log(result1.data)
        //--------------------------------

        result1= await axios.post(`http://${mainUrl}/p29transaction/restore`,restoretransaction,myheader)
        console.log('p29transaction/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p29transactionlog/restore`,restoretransactionlog,myheader)
        console.log('p29transactionlog/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p29partner/restore`,restorepartner,myheader)
        console.log('p29partner/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p29product/restore`,restoreproduct,myheader)
        console.log('p29product/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p29group/restore`,restoregroup,myheader)
        console.log('p29group/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p29basicdata/restore`,restorebasicdata,myheader)
        console.log('p29basicdata/restore')
        console.log(result1.data)
        

    }
    catch (err){
        console.log(err)
    }
}
*/