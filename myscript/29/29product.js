
const tempProduct={
    "id": "1",
    "barcode": "1",
    "name": "สายไฟ",
    "groupId": "3",
    "groupName": "group3",
    "unit": "อัน",
    "price": "100",
    "priceLevel": [ { "price": "100", "remark": "ทุน" } ],
    "remark": "ของแท้",
    "isRawMat": "false",
    "detail":
    [ {
        //"_id": undefined,
        "id": "1",
        "barcode": "1 dsaf",
        "name": "mux my friend ok jing",
        "groupId": "1",
        "groupName": "main",
        "unit": "อัน",
        "price": "100",
        "quantity": "10",
        "result": "1000",
        "remark": "dee",
        "isRawMat": "false" 
    },
    {
        //"_id": undefined,
        "id": "2",
        "barcode": "2 dsf",
        "name": "stero dfd fdsf",
        "groupId": "1",
        "groupName": "main",
        "unit": "อัน",
        "price": "100",
        "quantity": "10",
        "result": "1000",
        "remark": "good",
        "isRawMat": "true" } ],
    "stock": "0",
    "order": "0",
    "plan": "0",
    "photoUrl1": [ "https://picsum.photos/200" ] 
}


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


        
        result= await axios.post(`http://${mainUrl}/p29product/updatecustom`,tempProduct,myheader2)
        console.log('p29product/getcustom')
        console.log(result.data)

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