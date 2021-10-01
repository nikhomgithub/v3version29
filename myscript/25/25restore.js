const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
 mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init_server_auth = {shopName:"shopa",confirm_password:"server_auth"}
const init_server_1 = {shopName:"shopa",confirm_password:"server_1"}
const init_server_25 = {shopName:"shopa",confirm_password:"server_25"}
const init_server_27 = {shopName:"shopa",confirm_password:"server_27"}

const date="27_07_2021"

const restoreBasicData={...init_server_25,filePath:`backupData/${date}_basicdata.json`}
const restoreJob={...init_server_25,filePath:`backupData/${date}_job.json`}
const restoreCustomer={...init_server_25,filePath:`backupData/${date}_customer.json`}
const restoreKnow={...init_server_25,filePath:`backupData/${date}_know.json`}
const restoreSticker={...init_server_25,filePath:`backupData/${date}_sticker.json`}
const restoreTableTemplate={...init_server_25,filePath:`backupData/${date}_sticker.json`}

 getStart=async()=>{

    try {
        
        let result
        result= await axios.post(`http://${mainUrl}/p25basicdata/restore`,restoreBasicData,myheader)
        console.log('p25basicdata/restore')

        
        result= await axios.post(`http://${mainUrl}/p25job/restore`,restoreJob,myheader)
        console.log('p25job/restore')

        result= await axios.post(`http://${mainUrl}/p25customer/restore`,restoreCustomer,myheader)
        console.log('p25customer/restore')

        result= await axios.post(`http://${mainUrl}/p25know/restore`,restoreKnow,myheader)
        console.log('p25know/restore')

        /*
        result= await axios.post(`http://${mainUrl}/p25sticker/restore`,restoreSticker,myheader)
        console.log('p25sticker/restore')

        result= await axios.post(`http://${mainUrl}/p25tabletemplate/restore`,restoreTableTemplate,myheader)
        console.log('p25tabletemplate/restore')
        */
    }
    catch (err){
        console.log(err)
    }
}

console.log('p25backup')
getStart()