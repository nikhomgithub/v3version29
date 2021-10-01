const axios = require('axios')

let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="vrpshop.net"

const shopQry = {shopName:"shopa",password:"shopa"}
const userQry = {username:"usera",password:"usera"}

const server_1_Qry ={shopName:"shopa",confirm_password:"vrpshop_server_1"}
const server_25_Qry ={shopName:"shopa",confirm_password:"vrpshop_server_25"}
const server_27_Qry ={shopName:"shopa",confirm_password:"vrpshop_server_27"}


const getInit = async () => {
    try {
        
        //await axios.post(`https://${mainUrl}/fpbasicdata/backup`,server_1_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/fpjob/backup`,server_1_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p25basicdata/backup`,server_25_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p25customer/backup`,server_25_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p25job/backup`,server_25_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p25know/backup`,server_25_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p25sticker/backup`,server_25_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p27basicdata/backup`,server_27_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p27group/backup`,server_27_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p27partner/backup`,server_27_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p27product/backup`,server_27_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p27transaction/backup`,server_27_Qry,myheader)
        
        //await axios.post(`https://${mainUrl}/p27transactionlog/backup`,server_27_Qry,myheader)
        
    } catch (error) {
        console.log('error')
      }
    }

console.log('backup all')
getInit()
