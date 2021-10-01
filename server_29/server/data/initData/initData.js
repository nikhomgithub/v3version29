const tableTemplate=require('./tableTemplate')
const uuid = require("uuid");

//==============================
const shopInit={
    shopName:"shopa",
    password:"shopa",
    active:true,
    code:uuid.v4(),
    dateIn: new Date().toISOString().substring(0,10),
    
    ownerName:"ownera",
    ownerPassword:"ownera",
    ownerActive:true,
    ownerCode:uuid.v4(),
    
    ownerEmail:'a@mail.com'
}
//-----------------------------
const userInit={
    id:1,
    username:"usera",
    password:"usera",
    active:true,
    code:uuid.v4(),
    userLevel:"admin",
    dateIn: new Date().toISOString().substring(0,10),
    name:"usera",
    surname:"usera"
}

//--------------------------------------
const basicDataInit={
    id:1,
    title:["นาย","นาง","นางสาว"],
    unit:["อัน","ชิ้น","แผ่น"],
    userLevel:["admin","staff","visitor"],
    //transactionType:["ซื้อ","ขาย","จอง"],
    //transactionStatus:["เสร็จ","ไม่เสร็จ"],
    branch:["สาขาหลัก","สาขาย่อย1"],


    transactionType:[{
        groupId:1,
        groupName:"ใบจอง",
        transactionGroupType:"ขาย",
        transactionCode:"BR",
        effectOrder:"บวก",
        effectPlan:"คงที่",
        effectStock:"คงที่",
    }],

    transactionGroupType:["ขายออก","ซื้อเข้า","อื่นๆ"],

    transactionStatus:["ยกเลิก"],
    active:["active","cancel"],

    partnerType:["ผู้ซื้อ","ผู้ขาย"],

    effectStock:["บวก","ลบ","คงที่"],
    effectOrder:["บวก","ลบ","คงที่"],
    effectPlan:["บวก","ลบ","คงที่"],

    tax:[{
        taxName:"vat",
        taxActive:true,
        taxRate:7,
    }],

    //partnerType:["ผู้ซื้อ","ผู้ขาย"],
    
    routeAuth:[
     
     {id:1,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},

     {id:4,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:5,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},

     {id:8,routeAddress:'/group/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:9,routeAddress:'/group/deletegroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:10,routeAddress:'/group/addgroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:11,routeAddress:'/group/updategroup', routeName:"N/A", userLevel:["admin","staff"]},


     {id:26,routeAddress:'/partner/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:27,routeAddress:'/partner/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:28,routeAddress:'/partner/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:29,routeAddress:'/partner/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:30,routeAddress:'/partner/deletemany', routeName:"N/A", userLevel:["admin","staff"]},

     {id:33,routeAddress:'/transaction/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:34,routeAddress:'/transaction/deletetransaction', routeName:"N/A", userLevel:["admin","staff"]},
     {id:35,routeAddress:'/transaction/addtransaction', routeName:"N/A", userLevel:["admin","staff"]},
     {id:36,routeAddress:'/transaction/updatetransaction', routeName:"N/A", userLevel:["admin","staff"]},
     {id:37,routeAddress:'/transaction/deletemany', routeName:"N/A", userLevel:["admin","staff"]},


     {id:39,routeAddress:'/transactionlog/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:40,routeAddress:'/transactionlog/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:41,routeAddress:'/transactionlog/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:42,routeAddress:'/transactionlog/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:34,routeAddress:'/transaction/deletemany', routeName:"N/A", userLevel:["admin","staff"]},
  

     {id:45,routeAddress:'/basicdata/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:46,routeAddress:'/basicdata/deletecustom', routeName:"N/A", userLevel:["admin"]},
     {id:47,routeAddress:'/basicdata/addcustom', routeName:"N/A", userLevel:["admin"]},
     {id:48,routeAddress:'/basicdata/updatecustom', routeName:"N/A", userLevel:["admin"]},

     {id:52,routeAddress:'/product/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:53,routeAddress:'/product/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:54,routeAddress:'/product/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:55,routeAddress:'/product/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:56,routeAddress:'/product/deletemany', routeName:"N/A", userLevel:["admin","staff"]},
   
     {id:58,routeAddress:'/tabletemplate/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:59,routeAddress:'/tabletemplate/updatetabletemplate', routeName:"N/A", userLevel:["admin","staff","visitor"]},
    
     {id:62,routeAddress:'/sticker/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:63,routeAddress:'/sticker/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:64,routeAddress:'/sticker/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:65,routeAddress:'/sticker/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:66,routeAddress:'/sticker/deletemany', routeName:"N/A", userLevel:["admin","staff"]},  

    ]
}

//------------------------------------
//------------------------------------
const productInit={
    id:1,
    barcode:"1",
    productName:"สายไฟ",

    groupId:1,
    groupName:"main",

    photoUrl1:["https://picsum.photos/200"],
    unit:"อัน",
    price:100,
    remark:"ของแท้",

    priceLevel:[{price:100,remark:"ทุน"}],////
    
    isRawMat:false,

    detail:[
        {id:1,
        barcode:"1",
        productName:"mux",

        groupId:"1",
        groupName: "main",

        unit:"อัน",
        price:100,
        priceLevel:[{price:100,remark:"ทุน"}],

        quantity:10,
        result:1000,
        remark:"dee",
        isRawMat:false,
        photoUrl1:["https://picsum.photos/id/23/200/300"]
        },

        {id:2,
        barcode:"2",
        productName:"stero",

        groupId:"1",
        groupName: "main",
     
        unit:"อัน",
        price:100,
        priceLevel:[{price:100,remark:"ทุน"}],
        
        quantity:10,
        result:1000,
        remark:"good",
        isRawMat:true,
        photoUrl1:["https://picsum.photos/id/23/200/300", "https://picsum.photos/id/7/200/300"]
        },
    ],
    stock:100,
    order:100,
    plan:100
}
//-------------------------------------
const groupInit={
    id:1,
    mainGroup:null,
    parentGroup:[],
    groupName: "main",
    children:[],
    parentId:null,
}

// 
//
//-------------------------------------
const partnerInit={
    id:1,
    title:"นาย",
    name:"จิตติ",
    phone:["12345","67890"],
    partnerType:"ผู้ซื้อ",

    //partnerype:"ปกติ",
    address:[{
        number:"12",
        tambon:"หมี่แดง",
        district:"เวียงพิง",
        province:"เชียงของ",
        postcode:"12345"
    }],
    photoUrl1:[""],     
    remark:"ของแท้",
}
//-----------------------------------

//-------------------------------
const transactionInit={
    id:1,
    date:"2018-01-21",
    remindDate:"2018-01-21",
    branch:"สาขาหลัก",

    transactionName:"tname",
    transactionType:"ใบจอง",
    transactionCode:"BR",
    transactionGroupType:"ขาย",
    transactionStatus:"open",
    reference:"",
    active:"active",
    //transactionType:"งานซ่อม",
    //status:"open",
    
    effectStock:"คงที่",
    effectOrder:"เพิ่ม",
    effectPlan:"คงที่",

    photoUrl1:[""],

    partnerId:1,
    partnerType:"ผู้ซื้อ",

    title:"นาย",
    name:"จิตติ",
    phone:["12345","67890"],

    
    address: {
        number:"12",
        tambon:"good",
        district:"bad",
        province:"well",
        postcode:"2345",
    },

    remark:"ของแท้",
    
    total:100,
    reduction:20,
    
    grandTotal:80,

    tax:[{
        taxName:"vat",
        taxActive:true,
        taxRate:7,
    }],

    detail:[
    {
        id:1,
        barcode:"1",
        productName:"สายพาน",

        groupId:1,
        groupName: "main",

        unit:"เส้น",
        price:100,
        priceLevel:[{price:100,remark:"ทุน"}],

        quantity:1,
        result:100,
        remark:"ok",
        isRawMat:false,

        partnerId:1,
        name:"John",
        photoUrl1:["https://picsum.photos/id/2/200/300", "https://picsum.photos/id/47/200/300"]
    },
    {
        id:2,
        barcode:"1",
        productName:"นำมันเครือ่ง",

        groupId:1,
        groupName: "main",

        unit:"แกลลอน",
        price:500,
        priceLevel:[{price:100,remark:"ทุน"}],

        quantity:1,
        result:100,
        remark:"ok",
        isRawMat:false,

        partnerId:1,
        name:"John",
        photoUrl1:["https://picsum.photos/id/7/200/300"]
    },
]
    
}
//--------------------------------------

//-----------------------------------
const transactionLogInit={
  ...transactionInit,
  status:"open"
}
//-----------------------------------------

//-----------------------------------------
const stickerInit={
    id:1,
    recordName:"abcd",
    date:"2021-12-31",
    thaiDate:"",
    recordBy:"Peter",

    xPerLine:4,
    heightP:297,
    widthP:210,

    gridColumnGap:2,
    gridRowGap:2,
    showBorder:true,

    paddingTopP:5,
    paddingBottomP:5,
    paddingLeftP:5,
    paddingRightP:5,

    showCode:true,
    showBarCode:true,

    heightB:20,
    widthB:1,
    fontSizeCode:10,

    showName:true,
    fontSizeName:10,

    showPrice:true,
    fontSizePrice:10,
    
    showUnit:true,
    fontSizeUnit:10,

    productData : [
        {code:"1234",name:"coloa",price:100,unit:"ขวด",qty:10},
        {code:"4aa5",name:"pepsi",price:200,unit:"ขวด",qty:5},
    ]

}

//-----------------------------------------
const initData= {
                    shopInit,userInit,
                    basicDataInit,tableTemplate,
                    productInit,groupInit,
                    partnerInit,
                    transactionInit,transactionLogInit,
                    stickerInit
                }



module.exports = initData;