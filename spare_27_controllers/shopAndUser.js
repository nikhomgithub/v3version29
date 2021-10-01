const casual = require('casual');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
var uuid = require("uuid");
fs = require('fs');

const { createTableTemplate } = require('./ctUtil');
//const tableTemplate=require('./tableTemplate')
//post=>localhost:3001/shop/shopsignup
//{"shopName":"shopa", "password":"shopa", "ownerName":"shopa", "ownerPassword":"shopa","ownerEmail":"a@mail.com"}

const shopsignup= async (req,res,next)=>{
    //console.log(req.body)
    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        const { shopName,password, ownerName,ownerPassword, ownerEmail,
            ...remainigkeys}=req.body;

        let newShop=new Data (req.body);

        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}
        if(!ownerName){throw {message:"Enter ownerName"}}
        if(!ownerPassword){throw {message:"Enter ownerPassword"}}
        if(!ownerEmail){throw {message:"Enter ownerEmail"}}
        const resultShopname = await Data.findOne({shopName}).lean()
        if(resultShopname){throw {message:"shop name already exist"}}
        const resultOwnername = await Data.findOne({ownerName}).lean()
        if(resultOwnername){throw {message:"owner name already exist"}}
        const hash_password=await bcrypt.hash(password,10)
        newShop.password=hash_password;
        const hash_owner_password=await bcrypt.hash(ownerPassword,10)  
        newShop.ownerPassword=hash_owner_password;
        newShop.active=true
        newShop.code=uuid.v4()
        newShop.dateIn=new Date().toISOString().substring(0,10)
        
        newShop.ownerActive=true
        newShop.ownerCode=uuid.v4()
        const resultSave=await newShop.save();
        //authConnection.close()
        return res.status(200).send({message:"shop added successfully"})
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
}

//---------------------
const shoplogin= async (req,res,next)=>{
    console.log('shoplogin')
    try {
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    

        if(process.env.AUTH_CONNECTION=="true"){
            console.log('auth conection = true...')
            Data=require('../modals/Auth').Shop;
        }else{
            console.log('auth connection = false...')
            Data=require('../modals/Shop')
        }    
        //--------------------

        const {shopName,password}=req.body

        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}

        const resultFind=await Data.findOne({shopName}).lean()

        if(!resultFind) {throw {message:'Invalid shop name'}}

        const {_id,code,active}= resultFind
        if(!active){throw {message:'Inactive shop'}}

        const isMatch=await bcrypt.compare(password,resultFind.password)
        if(!isMatch) {throw {message:'Invalid password'}}

        const token =await jwt.sign( {id:shopName,code},
                                      process.env.JWT_SECRET,
                                      {expiresIn:'365d'} ) //36000
        ////authConnection.close()                    
        return res.status(200).json({ shopToken:token  })   
    }
    catch(error){
        ////authConnection.close()
        return res.status(400).send(error);
    }
}
//---------------------
const ownerlogin= async (req,res,next)=>{

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        const {ownerName,ownerPassword}=req.body

        //console.log('1')
        if(!ownerName){throw {message:"Enter ownerName"}}
        if(!ownerPassword){throw {message:"Enter ownerPassword"}}

        const resultFind=await Data.findOne({ownerName}).lean()
        if(!resultFind) {throw {message:'Invalid owner name'}}
        //console.log('2')
        const {ownerCode,ownerActive}= resultFind
        if(!ownerActive){throw {message:'Inactive owner'}}
        //console.log('3')
        
        const isMatch=await bcrypt.compare(ownerPassword,resultFind.ownerPassword)
        if(!isMatch) {throw {message:'Invalid password'}}
        //console.log('4')
        const token =await jwt.sign( {ownerName,ownerCode},
                                    process.env.JWT_SECRET,
                                    {expiresIn:'365d'} )
        //authConnection.close()
        return res.status(200).json({ ownerToken:token  })   
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
}
//-----------------------------------
const shopchangepassword=async (req,res,next)=>{

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        const {shopName,password,newPassword1,newPassword2}=req.body;
        //console.log(req.body)
        //Simple validation
        if(!shopName){throw {message:"Enter shopName"}}
        if(!password){throw {message:"Enter password"}}
        if(!newPassword1){throw {message:"Enter newPassword1"}}
        if(!newPassword2){throw {message:"Enter newPassword2"}}

        //check new password and confirmed new password
        if(newPassword1!=newPassword2)
        { throw {message:'Recheck new password'}}
                
        //let finalresult={}
        const result=await Data.findOne({shopName}).lean()
        if(!result) { throw {message:'Invalid shop name'}};
        if(!result.active){ throw {message:'Inactive shop'}}
    
        const isMatch=await bcrypt.compare(password,result.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        const hash_password = await bcrypt.hash(newPassword1,10)
        
        await Data.updateOne( {shopName},
                              {$set:{ password:hash_password,
                              code:uuid.v4() }
                            } )

        //authConnection.close()
        return res.status(200).json({message:"change password successfully"})
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
        
}
//----------------------------------
//post=>localhost:3001/*/ownerchangepassword
const ownerchangepassword=async (req,res,next)=>{
    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        const {ownerName,ownerPassword,newOwnerPassword1,newOwnerPassword2}=req.body;

        if(!ownerName){throw {message:"Enter ownerName"}}
        if(!ownerPassword){throw {message:"Enter ownerPassword"}}
        if(!newOwnerPassword1){throw {message:"Enter newOwnerPassword1"}}
        if(!newOwnerPassword2){throw {message:"Enter newOwnerPassword2"}}

        //console.log(req.body)
        //Simple validation
        //check new password and confirmed new password
        if(newOwnerPassword1!=newOwnerPassword2)
        { throw {message:'Recheck new password'}}

        //let finalresult={}
        const result=await Data.findOne({ownerName}).lean()
        if(!result) { throw {message:'Invalid owner name'}};
        if(!result.ownerActive){ throw {message:'Inactive owner'}}
    
        const isMatch=await bcrypt.compare(ownerPassword,result.ownerPassword)
        if(!isMatch) {throw {message:'Invalid password'}}
        const hash_owner_password = await bcrypt.hash(newOwnerPassword1,10)
        
        await Data.updateOne( {ownerName},
                              {$set:{ ownerPassword:hash_owner_password,
                                ownerCode:uuid.v4() }
                            } )
        //authConnection.close()        
        return res.status(200).json({message:"change owner password successfully"})
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
}
//---------------------------
const getshop=async(req,res,next)=>{
    //no shopId is required
    let {sort,confirm_password,...remaining}=req.body
    if(!sort){ sort={dateIn:1} }
    const qryObject={...remaining}
    try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }

        const count = Data.find(qryObject).lean().countDocuments()
        const lastRecord = Data.findOne({}).sort({dateIn:-1})
        const result= Data.find(qryObject).lean()
                        .select("-password")
                        //.select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .select("-shopId")
                        .sort(sort)
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            temp={data:results[0],count:results[1],lastRecordId:results[2]._id}
            
            //authConnection.close()
            res.status(200).json(temp)
        });            
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send({message:"getshop fail"})
    }
}
//--------------------------
const getlimitshop=async(req,res,next)=>{
    //no shopId is required

    let {pageNumber,sort,limitRow,confirm_password,...remaining}=req.body
    
    if(!limitRow){limitRow=10}
    if(limitRow<1){limitRow=1}
    if(limitRow>50){limitRow=50}

    if(!pageNumber){ pageNumber=1 }
    if(pageNumber<1){ pageNumber=1 }

    if(!sort){ sort={dateIn:1} }
    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }

        const count = Data.find({...remaining}).lean().countDocuments()
        const lastRecord = Data.findOne({}).sort({dateIn:-1})
        const result= Data.find({...remaining}).lean()
                        .skip((pageNumber-1)*limitRow).limit(limitRow)
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .sort(sort)
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            temp={data:results[0],count:results[1],lastRecordId:results[2]._id}
            
            //authConnection.close()
            res.status(200).json(temp)
        });
    }
    catch (error){
        //authConnection.close()
        return res.status(400).send({message:"getlimitshop fail"})
    }
}

const deleteshop=async(req,res,next)=>{
    //no shopId is required
    const {shopName,confirm_password}=req.body
    const qryObject={shopName}

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }

        const resDelete = await Data.deleteMany(qryObject)
        
        //authConnection.close()
        return res.status(200).json({message:"deleteshop successfully"})
    }
    catch (error){
        //authConnection.close()
        return res.status(400).send({message:"deleteshop fail"})
    }
}

const updateshop=async(req,res,next)=>{

    const {_id,shopName,password,
               ownerName,ownerPassword,confirm_password,
           ...remaining}=req.body
    
    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }

        //check user shop
        if(password||ownerPassword){ 
            throw {message:"No password update allowed"}
        }
    
        const qryObject={shopName}
        let dataTosave={...remaining}

        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )

        //authConnection.close()
        return res.status(200).json({message:"update succesfully"})
    }
    catch (error){
        //authConnection.close()
        return res.status(400).send(error)
    }
}

//==================================
//===================================
//post=>localhost:3001/*/login
const login= async (req,res,next)=>{
    //console.log(req.body)
    //console.log(req.user)
    const shopId=req.shopId
    //console.log(shopId)
    const {username,password}=req.body;

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        if(!username){ throw {message:"Enter username"} }
        if(!password){ throw {message:"Enter password"} }

        const resultFind=await Data.findOne({username,shopId}).lean()
        if(!resultFind) {throw {message:'Invalid username'} }
    
        const {id,code,userLevel,active}= resultFind
        if(!active){throw {message:'Inactive user'} }
        
        const isMatch=await bcrypt.compare(password,resultFind.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        
        const token =await jwt.sign( {id:id.toString(),code},
                                      process.env.JWT_SECRET,
                                     {expiresIn:'365d'} ) //36000
        
        //authConnection.close()
        return res.status(200).json({ username,
                                      [req.tokenName]:token  })    
    }
    catch(error){        
        //authConnection.close()
        return res.status(400).send(error);
    }
}
//----------------
//post=>localhost:3001/*/changepassword
const changepassword=async (req,res,next)=>{
    //console.log('change password')
    //console.log(req.body)

    try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        const shopId=req.shopId
        const {username,password,newPassword1,newPassword2}=req.body;
        //console.log(req.body)
        //Simple validation
        if(!username){throw {message:"Enter username"}}
        if(!password){throw {message:"Enter password"}}
        if(!newPassword1){throw {message:"Enter newPassword1"}}
        if(!newPassword2){throw {message:"Enter newPassword2"}}

        //check new password and confirmed new password
        if(newPassword1!=newPassword2){ throw {message:'Recheck new password'}}
        
        //let finalresult={}
        const result=await Data.findOne({username,shopId}).lean()
        if(!result) { throw {message:'Invalid username'} };
        if(!result.active){ throw {message:'Inactive user'}}
    
        const isMatch=await bcrypt.compare(password,result.password)
        if(!isMatch) {throw {message:'Invalid password'}}
        const hash_password = await bcrypt.hash(newPassword1,10)
        
        await Data.updateOne( {username,shopId},
                              {$set:{ password:hash_password,
                               code:uuid.v4() }
                            } )

        //authConnection.close()
        return res.status(200).json({message:"change password successfully"})
    }
    catch(err){
        //authConnection.close()
        return res.status(400).send(error);
    }       
}
//---------------------------------
const adduser= async (req,res,next)=>{
    //console.log('adduser')

    const shopId=req.shopId
    const { id,username,password,
            userLevel }=req.body;         

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------
        let newUser=new Data ({...req.body,shopId});

        if(!username){throw {message:"Enter userame"} }
        if(!password){throw {message:"Enter password"} }
        if(!id){throw {message:"Enter id"} }
        if(!userLevel){throw {message:"Enter userLevel"} }
        
        //const resultShop=await Data.findOne({shopId}).lean()
        //if(!resultShop) { throw 'shopId does not exist'};
        //console.log('1')

        const resultUsername = await Data.findOne({username,shopId}).lean()
        if(resultUsername){throw {message:"Invalid username'"} }
        
        //console.log('2')

        const hash_password=await bcrypt.hash(password,10)
        newUser.password=hash_password;
       
        newUser.active=true
        newUser.code=uuid.v4()
        newUser.dateIn=new Date().toISOString().substring(0,10)

        const resultSave=await newUser.save();
        //console.log('3')
        //authConnection.close()
        return res.status(200).json({message:"user is added successfully"})
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
}

//========================
const shopinit= async (req,res,next)=>{
    //console.log('1')
    //console.log(req.routeAddress)
    //console.log('shopinit')
    //console.log(process.env.AUTH_CONNECTION=="true")
    const {shopName,password,confirm_password}=req.body
    try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            console.log('1')
            Data=require('../modals/Auth').Shop;

        }else{
            console.log('2')
            Data=require('../modals/Shop')
        }    
        //--------------------
        //console.log('3')
        if(!shopName){throw {message:"Enter shopName"}}
        
        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
        //console.log('4')

        //let result = null
          let newData=new Data({...req.initData});

          if(req.initData.password){
              const hash_password=await bcrypt.hash(req.initData.password,10)
              newData.password=hash_password;
          }
          if(req.initData.ownerPassword){
              const owner_hash_password=await bcrypt.hash(req.initData.ownerPassword,10)
              newData.ownerPassword=owner_hash_password;
          }
          //console.log('5')

          const resDelete = await Data.deleteMany({shopName})
          //console.log('6')

          const result=await newData.save()
          //console.log('4')
          //authConnection.close()
          return res.status(200).json('shopInit succesfully')   
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
  }
  //--------------------------------------
  
  //get=>localhost:3001/*/restore
  const shoprestore=async(req,res,next)=>{

    const {shopName,password,filePath,confirm_password}=req.body
      try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

          if(!shopName){throw {message:"Enter shopName"}}
          if(!filePath){throw {message:"Enter filePath"}}
    
          if(!confirm_password)
           {return res.status(400).json("enter confirm_password") }
          if(confirm_password!==process.env.CONFIRM_PASSWORD)
           {return res.status(400).json("invalid confirm_password") }
    
          const restoreData = require(`../data/${filePath}`)
  
          if(!restoreData){throw {message:"Invalid file"} }
          if(!restoreData.table){throw {message:"Wrong filePath"} }
          //end check
  
          //console.log(restoreData.table)
          if(Array.isArray(restoreData.table)){

            const resDelete = await Data.deleteMany({shopName})      
            const result=await Data.create(restoreData.table)
            
            //authConnection.close()
            return res.status(200).json({message:"restore Shop succesfully"})
          }
          else {
            //authConnection.close()
            throw { message:"restoreData is not array" }
          } 
      }
      catch(error){
          //authConnection.close()
          return res.status(400).send({message:"restore fail"})
      }
  }
  //------------------------------------
  //get=>localhost:3001/*/backup
  //all backup to file
  const shopbackup=async(req,res,next)=>{
      const {shopName,password,filePath,confirm_password}=req.body
      try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').Shop;
        }else{
            Data=require('../modals/Shop')
        }    
        //--------------------

        if(!shopName){throw {message:"Enter shopName"}}
  
        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }

        let temp=req.routeAddress.split("/")
        const today=new Date().toISOString()
        const year=today.substring(0,4)
        const month=today.substring(5,7)
        const date=today.substring(8,10)
        const fileName=`${date}_${month}_${year}_${temp[1]}.json`
        const fullPath=`${req.backupData}${fileName}`

        const result=await Data.find({shopName}).select("-_id").lean()
        if(!result) {throw {message:'Invalid shop name'}}
        //authConnection.close()

        const obj={table:result}
        const json = JSON.stringify(obj);
       
        //fs.writeFile(fullPath, json, function (err) {if (err) return console.log(err);console.log('Hello World > helloworld.txt');});
        
        fs.writeFile(fullPath, json, 'utf8', 
            (err)=>{ 
                if(err){
                   throw {message:"shop backup fail"}
                }
                else {
                    return res.status(200).json({message:'shop backup succesfully'}) 
                }
            }
        );
        
      }
      catch(error){
          //authConnection.close()
          return res.status(400).send(error);
      }
  }
//==================================================
const userinit= async (req,res,next)=>{
    //console.log('1')
    //console.log(req.routeAddress)
    console.log('userinit')

    const {shopName,password,confirm_password}=req.body
  
    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        if(!shopName){throw {message:"Enter shopName"}}
        if(!confirm_password)
            {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
            {return res.status(400).json("invalid confirm_password") }
  
        //let result = null
          let newData=new Data({...req.initData,shopId:shopName});

          if(req.initData.password){
              const hash_password=await bcrypt.hash(req.initData.password,10)
              newData.password=hash_password;
          }
          
          const resDelete = await Data.deleteMany({shopId:shopName})
  
          const result=await newData.save()
          //console.log('4')
          //authConnection.close()
          return res.status(200).json('userInit succesfully')   
  
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send(error);
    }
  }
  //--------------------------------------
  
  //get=>localhost:3001/*/restore
  const userrestore=async(req,res,next)=>{
      const {shopName,password,filePath,confirm_password}=req.body
      try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

         if(!shopName){throw {message:"Enter shopName"}}
         if(!filePath){throw {message:"Enter filePath"}}
  
         if(!confirm_password)
            {return res.status(400).json("enter confirm_password") }
         if(confirm_password!==process.env.CONFIRM_PASSWORD)
            {return res.status(400).json("invalid confirm_password") }
  
          const restoreData = require(`../data/${filePath}`)
  
          if(!restoreData){throw {message:"Invalid file"} }
          if(!restoreData.table){throw {message:"Wrong filePath"} }
          //end check
  
          //console.log(restoreData.table)
          if(Array.isArray(restoreData.table)){
             //console.log("2")
             await Data.deleteMany({shopId:shopName})   
             //console.log("3")
             await Data.create(restoreData.table)
             //authConnection.close()
             //console.log("4")
             return res.status(200).json({message:"restore User succesfully"})
          }
          else {
             //authConnection.close()
             throw { message:"restoreData is not array" }
          } 
      }
      catch(error){
          //authConnection.close()
          return res.status(400).send({message:"restore fail"})
      }
  }
  //------------------------------------
  //get=>localhost:3001/*/backup
  //all backup to file
  const userbackup=async(req,res,next)=>{
      const {shopName,password,filePath,confirm_password}=req.body

      try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        if(!shopName){throw {message:"Enter shopName"}}
    
        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
    
        let temp=req.routeAddress.split("/")
        const today=new Date().toISOString()
        const year=today.substring(0,4)
        const month=today.substring(5,7)
        const date=today.substring(8,10)
        const fileName=`${date}_${month}_${year}_${temp[1]}.json`
        const fullPath=`${req.backupData}${fileName}`

        //check ShopName,password

        const result= await Data.find({shopId:shopName}).select("-_id").lean()
        if(!result){throw {message:`Invalid ${temp[1]}`}}
        //authConnection.close()

        const obj={table:result}
        const json = JSON.stringify(obj);
       
        //fs.writeFile(fullPath, json, function (err) {if (err) return console.log(err);console.log('Hello World > helloworld.txt');});
        
        fs.writeFile(fullPath, json, 'utf8', 
            (err)=>{ 
                if(err){
                   throw {message:"shop backup fail"}
                }
                else {
                    return res.status(200).json({message:'shop backup succesfully'}) 
                }
            }
        );
    
      }
      catch(error){
          //authConnection.close()
          return res.status(400).send(error);
      }
  }

//===================================
//===================================
const getuser=async(req,res,next)=>{
    //no shopId is required
    let {sort,confirm_password,shopName,...remaining}=req.body
    if(!sort){ sort={dateIn:1} }

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
        if(!shopName)
        {return res.status(400).json("enter shopName") }

        const qryObject={...remaining,shopId:shopName}

        const count = Data.find(qryObject).lean().countDocuments()
        const lastRecord = Data.findOne({}).sort({dateIn:-1})
        const result= Data.find(qryObject).lean()
                        .select("-password")
                        //.select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .select("-shopId")
                        .sort(sort)
        let temp

        Promise.all([result, count,lastRecord]).then((results)=>{
            temp={data:results[0],count:results[1],lastRecordId:results[2]._id}
            
            //authConnection.close()
            res.status(200).json(temp)
        });            
    }
    catch(error){
        //authConnection.close()
        return res.status(400).send({message:"getshop fail"})
    }
}
//--------------------------
const getlimituser=async(req,res,next)=>{
    //no shopId is required
    let {pageNumber,sort,limitRow,shopName,confirm_password,...remaining}=req.body

    if(!limitRow){limitRow=10}
    if(limitRow<1){limitRow=1}
    if(limitRow>50){limitRow=50}

    if(!pageNumber){ pageNumber=1 }
    if(pageNumber<1){ pageNumber=1 }

    if(!sort){ sort={dateIn:1} }

    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
        if(!shopName)
        {return res.status(400).json("enter shopName") }
        const qryObject={...remaining,shopId:shopName}

        const count = Data.find(qryObject).lean().countDocuments()
        const lastRecord = Data.findOne({}).sort({dateIn:-1})
        const result= Data.find({...remaining}).lean()
                        .skip((pageNumber-1)*limitRow).limit(limitRow)
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .sort(sort)
        let temp

        Promise.all([result, count,lastRecord]).then((results)=>{
            temp={data:results[0],count:results[1],lastRecordId:results[2]._id}
            
            //authConnection.close()
            res.status(200).json(temp)
        });
    }
    catch (error){
        //authConnection.close()
        return res.status(400).send({message:"getlimitshop fail"})
    }
}
//....................................
const deleteuser=async(req,res,next)=>{
    //no shopId is required
    const {id,username,shopName,confirm_password}=req.body

    try{

        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------

        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
        //console.log('1')
        if(!shopName)
        {return res.status(400).json("enter shopName") }
        if(!username)
        {return res.status(400).json("enter username") }
        //console.log('2')
        const qryObject={username,shopId:shopName}

        //console.log('3')
        const resDelete = await Data.deleteMany(qryObject)
        
        //authConnection.close()
        return res.status(200).json({message:"deleteuser by username successfully"})
    }
    catch (error){
        //authConnection.close()
        return res.status(400).send({message:"deleteuser by username fail"})
    }
}
//.....................................
const updateuser=async(req,res,next)=>{
    //console.log('0')
    const {_id,shopName,username,password,
               ownerName,ownerPassword,
               confirm_password,
           ...remaining}=req.body
    
    try{
        //-------------------
        //const {authConnection} = require('../modals/AuthConnection');
        let Data    
        if(process.env.AUTH_CONNECTION=="true"){
            Data=require('../modals/Auth').User;
        }else{
            Data=require('../modals/User')
        }    
        //--------------------
        //check user shop
        if(password){ 
            throw {message:"No password update allowed"}
        }
        if(!shopName)
        {return res.status(400).json("enter shopName") }
        if(!username)        
        {return res.status(400).json("enter username") }
        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
        const qryObject={username,shopId:shopName}

        const dataTosave=remaining

        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )
        //console.log('7')
        //authConnection.close()
        return res.status(200).json({message:"update user by username succesfully"})
    }
    catch (error){
        //authConnection.close()
        return res.status(400).send({message:"update user by username fail"})
    }
}

//==========================
const shopAndUser={
    shopsignup,shoplogin,ownerlogin,
    shopchangepassword,ownerchangepassword,
    getshop,getlimitshop,deleteshop,updateshop,
    adduser,login,changepassword,
    shopinit,shopbackup,shoprestore,
    
    userinit,userbackup,userrestore,
    getuser,getlimituser,deleteuser,updateuser,
}

module.exports = shopAndUser;