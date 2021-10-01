const axios = require('axios')

let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shopQry = {shopName:"shopa",password:"shopa"}
const userQry = {username:"usera",password:"usera"}

const initQry ={shopName:"shopa",confirm_password:"server_25"}
const restoreJobQry ={...initQry,filePath:"backupData/13_07_2021_job.json"}
const restoreCustomerQry ={...initQry,filePath:"backupData/13_07_2021_customer.json"}
const restoreBasicDataQry ={...initQry,filePath:"backupData/13_07_2021_basicdata.json"}

const getInit = async () => {
    try {
  
      const result1= await axios.post(`http://${mainUrl}/p25shop/shoplogin`,shopQry,myheader)
      
      const myheader1={ headers: {'Content-Type': 'application/json',
                          'Shopauthorization':`b ${result1.data.shopToken}`}
               }
      
      const result2= await axios.post(`http://${mainUrl}/p25user/login`,userQry,myheader1)
  
      const myheader2={ headers: {
          'Content-Type': 'application/json',
          'Shopauthorization':`b ${result1.data.shopToken}`,
          'Userauthorization':`b ${result2.data.userToken}`}
      }
      let result= await axios.post(`http://${mainUrl}/p25know/init`,initQry,myheader2)

      console.log(result.data)
      //let result= await axios.post(`http://${mainUrl}/p25job/restore`,restoreJobQry,myheader2)

      //result= await axios.post(`http://${mainUrl}/p25customer/restore`,restoreCustomerQry,myheader2)


      //result= await axios.post(`http://${mainUrl}/p25basicdata/restore`,restoreBasicDataQry,myheader2)


    } catch (error) {
        console.log('error')
      }
    }
    console.log('add job active')
    getInit()
