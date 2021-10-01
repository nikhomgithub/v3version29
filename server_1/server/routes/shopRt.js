const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const dataRt = require('./dataRt')
const params=require('./params')

const checkNone=()=>{return (req,res,next)=>{next()}}
//const checkShopToken=require('../middleware/checkShopToken');

const param=params.shop

const routeTemplate=[

    {route:"shoplogin",type:"post",useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
     
]  

dataRt({router,param,routeTemplate})

module.exports = router;

//shopsignup,shoplogin,ownerlogin,
//shopchangepassword,ownerchangepassword,
//getshop,getlimitshop,deleteshop,updateshop,
//adduser,login,changepassword,
//shopinit,shopbackup,shoprestore,
//userinit,userbackup,userrestore