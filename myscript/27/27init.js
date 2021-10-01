const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
 mainUrl="vrpshop.net"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"vrpshop_server_27"}
const backup = {shopName:"shopa",confirm_password:"vrpshop_server_27"}
const restoretransaction = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_transaction.json"}
const restoretransactionlog = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_transactionlog.json"}
const restorepartner = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_partner.json"}
const restoregroup = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_group.json"}
const restoreproduct = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_product.json"}
const restorebasicdata = {shopName:"shopa",confirm_password:"server_27",filePath:"backupData/02_07_2021_basicdata.json"}

 getStart=async()=>{

    try {
        let result1= await axios.post(`http://${mainUrl}/p27transaction/init`,init,myheader)
        console.log('p27transaction/init')
        console.log(result1.data)

        result1= await axios.post(`http://${mainUrl}/p27transactionlog/init`,init,myheader)
        console.log('p27transactionlog/init')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27partner/init`,init,myheader)
        console.log('p27partner/init')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27product/init`,init,myheader)
        console.log('p27product/init')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27group/init`,init,myheader)
        console.log('p27group/init')
        console.log(result1.data)


         result1= await axios.post(`http://${mainUrl}/p27basicdata/init`,init,myheader)
        console.log('p27basicdata/init')
        console.log(result1.data)

        //----------------------------------
        /*
         result1= await axios.post(`http://${mainUrl}/p27transaction/backup`,backup,myheader)
        console.log('p27transaction/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27transactionlog/backup`,backup,myheader)
        console.log('p27transactionlog/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27partner/backup`,backup,myheader)
        console.log('p27partner/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27product/backup`,backup,myheader)
        console.log('p27product/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27group/backup`,backup,myheader)
        console.log('p27group/backup')
        console.log(result1.data)

         result1= await axios.post(`http://${mainUrl}/p27basicdata/backup`,backup,myheader)
        console.log('p27basicdata/backup')
        console.log(result1.data)
        //--------------------------------

        result1= await axios.post(`http://${mainUrl}/p27transaction/restore`,restoretransaction,myheader)
        console.log('p27transaction/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p27transactionlog/restore`,restoretransactionlog,myheader)
        console.log('p27transactionlog/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p27partner/restore`,restorepartner,myheader)
        console.log('p27partner/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p27product/restore`,restoreproduct,myheader)
        console.log('p27product/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p27group/restore`,restoregroup,myheader)
        console.log('p27group/restore')
        console.log(result1.data)
        
         result1= await axios.post(`http://${mainUrl}/p27basicdata/restore`,restorebasicdata,myheader)
        console.log('p27basicdata/restore')
        console.log(result1.data)
        */

    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()