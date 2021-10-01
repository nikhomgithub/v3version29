const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_27"}

const getlimit={
    id:1 
}

const updatecustom={
    id:1,
    price:900,
}

const addcustom={
    id:2,
    barcode:"1",
    name:"สายไฟ................",
    groupId:1,
    groupName:"main",
    photoUrl1:["https://picsum.photos/200"],
    unit:"อัน",
    price:100,
    remark:"ของแท้",
    isRawMat:false,
    detail:[
        {id:1,
        barcode:"1",
        name:"mux",
        groupId:"1",
        groupName:"main",
        unit:"อัน",
        remark:"dee",
        isRawMat:false,
        quantity:10,
        price:100,
        result:1000
        },
        {id:2,
        barcode:"2",
        name:"stero",
        groupId:"1",
        groupName:"main",
        unit:"อัน",
        remark:"good",
        isRawMat:true,
        quantity:10,
        price:100,
        result:1000
        },
    ],
    //stock:100,
    //order:100,
    //plan:100
}

const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p27shop/shoplogin`,shoplogin,myheader)
        console.log('p27shop/shoplogin')
        console.log(result1.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`http://${mainUrl}/p27user/login`,userlogin,myheader1)
        console.log('p27user/login')
        console.log(result2.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}}


        let result= await axios.post(`http://${mainUrl}/p27product/init`,init,myheader)
        console.log('p27product/init')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27product/getlimit`,getlimit,myheader2)
        console.log('p27product/getlimit')
        console.log(result.data)

        
        result= await axios.post(`http://${mainUrl}/p27product/updatecustom`,updatecustom,myheader2)
        console.log('p27product/updatecustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27product/getlimit`,getlimit,myheader2)
        console.log('p27product/getlimit')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27product/addcustom`,addcustom,myheader2)
        console.log('p27product/addcustom')
        console.log(result.data)

        result= await axios.post(`http://${mainUrl}/p27product/getlimit`,{},myheader2)
        console.log('p27product/getlimit')
        console.log(result.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()