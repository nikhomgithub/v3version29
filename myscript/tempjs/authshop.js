const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shopinit={shopName:"shopa",confirm_password:"server_auth"}
const shopsignup = {shopName:"shopb",password:"shopb",ownerName:"ownerb",ownerPassword:"ownerb",ownerEmail:"ownerb@mail.com"}
const shoplogin = {shopName:"shopb",password:"shopb"}
const shoplogin2 = {shopName:"shopb",password:"shopboy"}

const ownerlogin = {ownerName:"ownerb",ownerPassword:"ownerb"}
const ownerlogin2 = {ownerName:"ownerb",ownerPassword:"ownerboy"}

const shopchangepassword={shopName:"shopb",password:"shopb",newPassword1:"shopboy",newPassword2:"shopboy"}
const ownerchangepassword={ownerName:"ownerb",ownerPassword:"ownerb",newOwnerPassword1:"ownerboy",newOwnerPassword2:"ownerboy"}

const getshop={confirm_password:"server_auth"}
const getlimitshop={confirm_password:"server_auth"}

const deleteshop={shopName:"shopb",confirm_password:"server_auth"}
const updateshop={shopName:"shopb",confirm_password:"server_auth",ownerEmail:"aaaaaa"}


const shopbackup={shopName:"shopb",confirm_password:"server_auth"}
const shoprestore={shopName:"shopb",confirm_password:"server_auth",filePath:"backupData/01_07_2021_shop.json"}


const getStart = async()=>{
    
    const result_shopinit= await axios.post(`http://${mainUrl}/shop/shopinit`,shopinit,myheader)
    console.log('shopinit')
    console.log(result_shopinit.data)

    const result_shopsignup= await axios.post(`http://${mainUrl}/shop/shopsignup`,shopsignup,myheader)
    console.log('shopsignup')
    console.log(result_shopsignup.data)

    
    const result_shoplogin= await axios.post(`http://${mainUrl}/shop/shoplogin`,shoplogin,myheader)
    console.log('shoplogin')
    console.log(result_shoplogin.data)

    const result4= await axios.post(`http://${mainUrl}/shop/shopchangepassword`,shopchangepassword,myheader)
    console.log('shopchangepassword')
    console.log(result4.data)

    const result5= await axios.post(`http://${mainUrl}/shop/shoplogin`,shoplogin2,myheader)
    console.log('shoplogin')
    console.log(result5.data)

    const result6= await axios.post(`http://${mainUrl}/shop/ownerlogin`,ownerlogin,myheader)
    console.log('ownerlogin')
    console.log(result6.data)

    const result7= await axios.post(`http://${mainUrl}/shop/ownerchangepassword`,ownerchangepassword,myheader)
    console.log('ownerchangepassword')
    console.log(result7.data)

    const result8= await axios.post(`http://${mainUrl}/shop/ownerlogin`,ownerlogin2,myheader)
    console.log('ownerlogin')
    console.log(result8.data)
  
    const result9= await axios.post(`http://${mainUrl}/shop/getshop`,getshop,myheader)
    console.log('getshop')
    console.log(result9.data)

    const result12= await axios.post(`http://${mainUrl}/shop/updateshop`,updateshop,myheader)
    console.log('updateshop')
    console.log(result12.data)

    const result10= await axios.post(`http://${mainUrl}/shop/getlimitshop`,getlimitshop,myheader)
    console.log('getlimitshop')
    console.log(result10.data)
    
    const result13= await axios.post(`http://${mainUrl}/shop/shopbackup`,shopbackup,myheader)
    console.log('shopbackup')
    console.log(result13.data)

    const result11= await axios.post(`http://${mainUrl}/shop/deleteshop`,deleteshop,myheader)
    console.log('deleteshop')
    console.log(result11.data)

    const result15= await axios.post(`http://${mainUrl}/shop/getshop`,getshop,myheader)
    console.log('getshop')
    console.log(result15.data)

    const result17= await axios.post(`http://${mainUrl}/shop/shoprestore`,shoprestore,myheader)
    console.log('shoprestore')
    console.log(result17.data)

    const result16= await axios.post(`http://${mainUrl}/shop/getshop`,getshop,myheader)
    console.log('getshop')
    console.log(result16.data)

    const result20= await axios.post(`http://${mainUrl}/shop/deleteshop`,deleteshop,myheader)
    console.log('deleteshop')
    console.log(result20.data)
}


console.log('appshop')
getStart()