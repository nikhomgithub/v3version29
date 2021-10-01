
//1.get data from csv first
/*
let csvToJson = require('convert-csv-to-json');

let fileInputName = 'product.csv'; 
let fileOutputName = 'myProduct.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
*/
/*
0,       1,     2,     3,           4,           5
'code,   unit,  price, name,        maingroup,   group': 
'1010125,ลูก,    900,   หม้อพัก V20S,  01 ปั๊มสามสูบ,  หม้อพัก'
*/












const fs = require('fs');
const product = require("./myProduct.json")
const  axios = require('axios')


const myheader={
    headers: {
      'Content-Type': 'application/json',
      Shopauthorization: 'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNob3BhIiwiY29kZSI6IjhhNzA2Y2ExLTdmN2UtNDU5OC05OGJmLTM1ZTk0ZmY2ZTFmOCIsImlhdCI6MTYyNzU1MDkwOSwiZXhwIjoxNjU5MDg2OTA5fQ.umTf3-ncbHIhq341gDIxirE4a8CwyrIW36YUXMOoVlY',
      Userauthorization: 'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJjb2RlIjoiNDFiNWRkOTktNmRlYy00NjkyLTk0M2QtOTYxYjhkNmNjZmQyIiwiaWF0IjoxNjI3NTUwOTA5LCJleHAiOjE2NTkwODY5MDl9.YKwjsGfItdC7CK-0QjT-G5yHOAmU1u-efaaDZB4cVPg'
    }
}


const sticker={
        //id:1,
        //recordName:"abcd",
        date:"2021-07-29",
        recordBy:"Nikhom",

        xPerLine:4,
        heightP:297,
        widthP:210,

        gridColumnGap:2,
        gridRowGap:1,
        showBorder:true,

        paddingTopP:8,
        paddingBottomP:7,
        paddingLeftP:8,
        paddingRightP:8,

        showCode:true,
        showBarCode:true,

        heightB:20,
        widthB:1,
        fontSizeCode:9,

        showName:true,
        fontSizeName:11,

        showPrice:true,
        fontSizePrice:26,

        showUnit:true,
        fontSizeUnit:10,

        productData : [
            //{code:"1234",name:"coloa",price:100,unit:"ขวด",qty:10},
        ]

}



let tempProductArray=[]
let tempGroup=[]

product.product.map((i,idx)=>{

    let temp=i['code,unit,price,name,maingroup,group']

    const temp2=temp.split(',')

    let tempObj={
        code:temp2[0],
        unit:temp2[1],
        price:parseInt(temp2[2]),
        name:temp2[3],
        group:`${temp2[4]}:${temp2[5]}`
    }

    tempProductArray=[...tempProductArray,tempObj]
    tempGroup=[...tempGroup,`${temp2[4]}:${temp2[5]}`]
})

let uniqueGroupArray = [...new Set(tempGroup)];


let tempStickerArray=[]

let sum=0

uniqueGroupArray.map((i,idx)=>{

    let tempProductData=[]

        tempProductArray.map(j=>{


            if(j.group==i){
                sum=sum+1
                const tempProductDataObj= {
                    code:j.code,
                    name:j.name,
                    price:j.price,
                    unit:j.unit,
                    qty:0
                }
                tempProductData=[...tempProductData,tempProductDataObj]
            }
        })
    
    let tempObj={...sticker,
                id:idx+100,
                recordName:i,
                productData:tempProductData
    }

    tempStickerArray=[...tempStickerArray,tempObj]

})

console.log('start Axios')
//939
const start =901
const end =939
const mainUrl="vrpshop.net"

for(let i=start;i<=end;i++){
    
        axios.post(`https://${mainUrl}/p25sticker/addcustom`,
                             tempStickerArray[i],myheader)
        .then(result=>{
            console.log(result)
        })
        .catch (err=>{
            console.log(err)
        })

}

















//
//console.log(tempStickerArray.length)=939
//console.log(tempStickerArray[100])

//console.log(tempStickerArray[10])
//console.log(tempStickerArray[100])
//console.log(uniqueGroupArray.length)
//console.log(tempProductArray.length)
//console.log(tempProductArray[100])
//console.log(uniqueGroupArray[100])










/*
fs.writeFile("myProduct2.json", tempArray, 'utf8', 
(err)=>{ 
    if(err){
       console.log('err')
       console.log(err)
        //throw {message:`${temp[1]} backup fail`}
    }
    else {
        console.log('succesfully')
        //return res.status(200).json({message:`${temp[1]} backup succesfully`}) 
    }
}
);
*/













/*
//this part for login to gey header
const  axios = require('axios')

let myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl="vrpshop.net"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const getLogin=async()=>{

    try {
        const result1= await axios.post(`https://${mainUrl}/p25shop/shoplogin`,shoplogin,myheader)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`https://${mainUrl}/p25user/login`,userlogin,myheader1)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}}

        console.log(myheader2)
        
    }
    catch (err){
        console.log(err)
    }
}

console.log('p25login')
getLogin()
*/







