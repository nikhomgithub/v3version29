//const casual = require('casual');
//const jwt=require('jsonwebtoken');
//const bcrypt=require('bcryptjs');
//const uuid = require("uuid");
//const { array } = require('../middleware/upload');
const { createTableTemplate } = require('./ctUtil');
//const tableTemplate=require('./tableTemplate')
const { table } = require('console');
const fs = require('fs');

const mytest= async (req,res,next)=>{
    console.log('req.body')
    console.log(req.body)
    res.status(200).json({message:"mytest"})
}
//----------------------------------
//for all including shop
const init= async (req,res,next)=>{
  //console.log('1')
  //console.log(req.routeAddress)
  console.log('init')

  const {shopName,password,confirm_password}=req.body
  try{
    if(!shopName){throw {message:"Enter shopName"}}

    console.log('2')
    if(!confirm_password)
    {return res.status(400).json("enter confirm_password") }
    console.log('3')
    if(confirm_password!==process.env.CONFIRM_PASSWORD)
    {return res.status(400).json("invalid confirm_password") }
    const Data=require(req.modal);

    //let result = null
    //console.log(req.shopId)
    console.log('4')
    console.log(req.routeAddress)

    if(req.routeAddress=="/tabletemplate/init"){
        //console.log("/tabletemplate/getcustom")
        //userId from userToken
        console.log('5')
        const resDelete = await Data.deleteMany({shopId:shopName})
        console.log('6')
        
        const userId=1
        console.log('7')
        //console.log('lllllll')
        //const tableTemplate=require('./data/initData/tableTemplate')
        const tableTemplate=req.initData

        console.log('8')
        console.log(tableTemplate)

        const tempTable=createTableTemplate({tableTemplate:tableTemplate,userId,shopId:shopName})

        console.log('9')
        
        //console.log(tempTable)
        const result = await Data.create(tempTable)
        console.log('10')
        //let newData=new Data ({...req.initData,shopId:req.shopId});
        console.log('11')
        //const result=await newData.save()

        //return res.status(200).json('tableTemplate')
        temp={data:result,count:1,lastRecordId:userId}
        res.status(200).json(temp)

    }

    else {
        console.log('11')
        const resDelete = await Data.deleteMany({shopId:shopName})
        console.log('12')
        let newData=new Data ({...req.initData,shopId:shopName});
        console.log('13')
        const result=await newData.save()

        return res.status(200).json(result)
    }
  }
  catch(error){
    return res.status(400).send(error);
  }
}
//--------------------------------------

//get=>localhost:3001/*/restore
const restore=async(req,res,next)=>{
    console.log('1')
    const {shopName,password,filePath,confirm_password,start,stop}=req.body
    try{
        if(!shopName){throw {message:"Enter shopName"}}
        if(!filePath){throw {message:"Enter filePath"}}
        //console.log('2')
        if(!confirm_password)
        {return res.status(400).json("enter confirm_password") }
        if(confirm_password!==process.env.CONFIRM_PASSWORD)
        {return res.status(400).json("invalid confirm_password") }
        //console.log('3')

        const Data=require(req.modal);
        //console.log('3.5')

        const restoreData = require(`../data/${filePath}`)
        //console.log('4')

        if(!restoreData){throw {message:"Invalid file"} }
        if(!restoreData.table){throw {message:"Wrong filePath"} }
        //console.log('5')
        //end check

        if(Array.isArray(restoreData.table)){
            //console.log('6')
            const datalength=restoreData.table.length
            //console.log(datalength)
            if(datalength>1000){    

                if((start>=0)&&(stop>-0)){

                    if(start==0){
                        await Data.deleteMany({shopId:shopName})     
                    }

                    let tempDataToCreate=[]
                    for(let k=start;k<=stop;k++){
                        tempDataToCreate=[...tempDataToCreate,restoreData.table[k]] 
                    }
                    Data.create(tempDataToCreate)
                    .then(result=>{
                        return res.status(200).json({message:`done start : ${start}, stop: ${stop}`})
                    })
                }

                else {
                    return res.status(400).json({message:`too much restore length : ${datalength}`})
                }

                /*
                //console.log('7')
                const loopitv=1000
                //console.log('7.2')
                const full = Math.floor(datalength/loopitv)
                //console.log(full)
                //console.log('7.5')
                const  remaining = datalength%loopitv
                //console.log(remaining)
                //console.log('8')
                let tempArray = []
                for (let i=0;i<full;i++){
                    const tempObj={start:loopitv*i, stop:loopitv*i+(loopitv-1)}
                    tempArray=[...tempArray,tempObj]
                }
                //console.log('9')
                if (remaining>0){
                    const tempObj={start:loopitv*full,stop:datalength-1}
                    tempArray=[...tempArray,tempObj]
                }
                console.log('tempArray')
                console.log(tempArray)

                tempArray.map(async(i,idx)=>{
                    let tempDataToCreate=[]
                    for(let k=i.start;k<=i.stop;k++){
                        tempDataToCreate=[...tempDataToCreate,restoreData.table[k]] 
                    }
                    console.log(idx)
                    await Data.create(tempDataToCreate)

                    if(idx==tempArray.length-1){
                        console.log('end .... restore')
                        return res.status(200).json({message:"restore succesfully"})
                    }
                })
                */

            }
            else {
                console.log('12')
                await Data.deleteMany({shopId:shopName})     
                console.log('13')
                await Data.create(restoreData.table)
                console.log('14')
                return res.status(200).json({message:"restore succesfully"})
            }

        }
        else {
            throw { message:"restoreData is not array" }
        } 
    }
    catch(error){
        return res.status(400).send({message:"restore fail"})
    }
}
//------------------------------------
//get=>localhost:3001/*/backup
//all backup to file
const backup=async(req,res,next)=>{
    const {shopName,password,filePath,confirm_password}=req.body
    try{
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

        const Data=require(req.modal);

        const result= await Data.find({shopId:shopName})
                      .select("-_id")
                      .select("-address._id")
                      .select("-routeAuth._id")
                      .select("-template._id")
                      .select("-transactionType._id")
                      .select("-detail._id")
                      .lean()
        if(!result){throw {message:`Invalid ${temp[1]}`}}

        const obj={table:result}
        const json = JSON.stringify(obj);
       
        //fs.writeFile(fullPath, json, function (err) {if (err) return console.log(err);console.log('Hello World > helloworld.txt');});
        
        fs.writeFile(fullPath, json, 'utf8', 
            (err)=>{ 
                if(err){
                   throw {message:`${temp[1]} backup fail`}
                }
                else {
                    return res.status(200).json({message:`${temp[1]} backup succesfully`}) 
                }
            }
        );
    }
    catch(error){
        return res.status(400).send(error);
    }
}
//================================
//================================
//================================

//post=>localhost:3001/*/getcustom
//for user,group,tabletemplate,basicdata
const getcustom=async(req,res,next)=>{
    //console.log('1')
    const Data=require(req.modal);
    //shopId from shopToken
    const shopId=req.shopId

    let {sort,...remaining}=req.body
    if(!sort){ sort={id:1} }
    
    let qryObject

    try{
        if(req.routeAddress=="/tabletemplate/getcustom"){
            //console.log("/tabletemplate/getcustom")
            //userId from userToken
            const userId=req.user.id
            console.log(`userId ${userId}`)
            qryObject={id:userId,...remaining,shopId}
            
            const count = await Data.find(qryObject).lean().countDocuments()
            console.log(`count ${count}`)
            //if(true){
            if(!count||count<1){
                //console.log('lllllll')
                //const tableTemplate=require('./data/initData/tableTemplate')
                const tableTemplate=req.initData

                const tempTable=createTableTemplate({tableTemplate,userId,shopId})

                //console.log('qqqqqqq')
                
                //console.log(tempTable)
                const result = await Data.create(tempTable)
                //console.log('11')
                //let newData=new Data ({...req.initData,shopId:req.shopId});
                //console.log('12')
                //const result=await newData.save()
        
                //return res.status(200).json('tableTemplate')
                temp={data:result,count:1,lastRecordId:userId}
                res.status(200).json(temp)
            }
            else{
                const lastRecord = Data.findOne({shopId}).sort({id:-1})
                const result= Data.find(qryObject).lean()
                                .select("-password")
                                .select("-code")
                                .select("-ownerPassword")
                                .select("-ownerCode")
                                .select("-shopId")
                                .sort(sort)
                let temp
                Promise.all([result,lastRecord])
                .then((results)=>{
                    //console.log(results)
                    temp={data:results[0],count,lastRecordId:results[1].id}
                    res.status(200).json(temp)
                });
            }
        }
        
        else{
            qryObject={...remaining,shopId}
            //console.time('getcustom')
            const count = Data.find(qryObject).lean().countDocuments()
            const lastRecord = Data.findOne({shopId}).sort({id:-1})
            const result= Data.find(qryObject).lean()
                            .select("-password")
                            .select("-code")
                            .select("-ownerPassword")
                            .select("-ownerCode")
                            .select("-shopId")
                            .sort(sort)
            let temp
            Promise.all([result, count,lastRecord]).then((results)=>{
                //console.log(results)
                temp={data:results[0],count:results[1],lastRecordId:results[2].id}
                res.status(200).json(temp)
            });
            
        }
    }
    catch(error){
        return res.status(400).send({message:"getcustom fail"})
    }
}
//=====================================

//post=>localhost:3001/*/getlimit
//for user,job,bill,transaction,transactionlog,product,customer,partner
const getlimit=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId
    
    let {pageNumber,sort,limitRow,...remaining}=req.body
    
    if(!limitRow){limitRow=10}
    if(limitRow<1){limitRow=1}
    //if(limitRow>50){limitRow=50}

    if(!pageNumber){ pageNumber=1 }
    else if(pageNumber<1){ pageNumber=1 }

    if(!sort){ sort={id:1} }

    try{
        //console.time('getlimit')
        const count = Data.find({...remaining,shopId}).lean().countDocuments()
        //count of renderBage

        const lastRecord = Data.findOne({shopId}).sort({id:-1})
        //for add form

        const result= Data.find({...remaining,shopId}).lean()
                        .skip((pageNumber-1)*limitRow).limit(limitRow)
                        .select("-password")
                        .select("-code")
                        .select("-ownerPassword")
                        .select("-ownerCode")
                        .select("-shopId")
                        .sort(sort)
        //console.timeEnd('getlimit')
        let temp
        Promise.all([result, count,lastRecord]).then((results)=>{
            //console.log(results)
            temp={data:results[0],count:results[1],lastRecordId:results[2].id}
            res.status(200).json(temp)
        });
    }
    catch (error){
        return res.status(400).send({message:"getlimit fail"})
    }
    
}
//==============================
//==============================

//post=>localhost:3001/*/deleteall
//for all in shopId
const deleteall=async(req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    //console.log(shopId)
    try{        
        const resDelete = await Data.deleteMany({shopId})
        //console.log(resDelete)
        return res.status(200).json({message:"delete all succesfully"})
    }
    catch(error){
        return res.status(404).send({message:"delete all fail"})
    }
    
}
//===========================
const deletemany=async(req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    //console.log(shopId)
    try{        
        const resDelete = await Data.deleteMany({...req.body,shopId})
        //console.log(resDelete)
        return res.status(200).json({message:"delete many succesfully"})
    }
    catch(error){
        return res.status(404).send({message:"delete many fail"})
    }
    
}
//---------------------------
//for all in shopId
//if delete user, tableTemplate get delete as well
const deletecustom=async(req,res,next)=>{
    
    const shopId=req.shopId
    const {id}=req.body

    try{
        if(req.routeAddress=="/user/deletecustom"){
            let Data    
            if(process.env.AUTH_CONNECTION=="true"){
                Data=require('../modals/Auth').User;
            }else{
                Data=require('../modals/User')
            }  
            
            await Data.deleteMany({id,shopId})
            const TableTemplate=require('../modals/TableTemplate'); 
            await TableTemplate.deleteMany({id,shopId})
            return res.status(200).json({message:"delete custom User succesfully"})
        }
        else {
            const Data=require(req.modal);

            await Data.deleteMany({id,shopId})
            return res.status(200).json({message:"delete custom succesfully"})
        }
    }
    catch (error){
        return res.status(400).send({message:"delete custom fail"})
    }
    
}
//--------------------------------
const deletegroup=async(req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId

    const {id,parentId,allDeleteId}=req.body

    try{
        await Data.deleteOne({id,shopId})

        if(parentId){
            if(parentId>=0){
                await  Data.updateOne(
                    {id:parentId,shopId},
                    {$pull:{"children":id}}   
                )
            }
        }

        if(allDeleteId){
            if(Array.isArray(allDeleteId)){
                if(allDeleteId.length>0){
                    await Data.deleteMany({id:{$in:allDeleteId}})
                }
            }
        }

        return res.status(200).json({message:"delete group succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"delete group fail"})
    }
}
//--------------------------------
const deletetransaction=async(req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    const {id,detail}=req.body

    try{

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(!resFindId) { throw ""}

        if(resFindId){
            const prevDetail=resFindId.detail
            const {effectOrder,effectStock,effectPlan}=resFindId
            const Product=require('../modals/Product'); 

            let orderChange=0
            let stockChange=0
            let planChange=0

            let orderFactor=0
            let stockFactor=0
            let planFactor=0

            if(effectOrder=="บวก"){orderFactor=1}
            if(effectOrder=="ลบ"){orderFactor=-1}
            if(effectStock=="บวก"){stockFactor=1}
            if(effectStock=="ลบ"){stockFactor=-1}
            if(effectPlan=="บวก"){planFactor=1}
            if(effectPlan=="ลบ"){planFactor=-1}

            for (let j=0;j<prevDetail.length;j++){
                orderChange=(0-prevDetail[j].quantity)*orderFactor
                stockChange=(0-prevDetail[j].quantity)*stockFactor
                planChange=(0-prevDetail[j].quantity)*planFactor

                const resUpdate= await Product.updateOne(
                    {id:prevDetail[j].id,shopId},
                    {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                )
            }
        }

        await Data.deleteOne({id,shopId})
        return res.status(200).json({message:"delete tabletemplate succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"delete fail"})
    }
    
}
//===============================
//===============================
//===============================
//==============
/* form-data
query[id] :5
query[groupName] : five
query[children] :
query[shopId] : 5f7e8e2ec016e550dbe3c6d2
query[parentId] : 0
*/
//==================
//check filed "photoUrl_"
//check if it is = [""]
//check if it is =["/upload/job/01_21_2021/bb.jpg",...]
//check if it is = ["/upload/job/bb_.jpg"] change to be"/upload/job/01_21_2021/bb.jpg"

const addDateFolderToUrl=(reqBody,reqFolder)=>{
    
    let tempPhotoObj={}
    //ต้องการตามหา key ที่ขึ้นต้นด้วย photoUrl
    const arrayOfKeyName=Object.keys(reqBody)
    
    for (j=0;j<arrayOfKeyName.length;j++){
        //i = field name such as 'id','photoUrl','tempPhotoUrl'
        const i = arrayOfKeyName[j]
        
        //to find photoUrl_ filed
        if(i.substring(0, 8)=="photoUrl"){
            //console.log('subString(0,8)')
            //============================
            //in case no photoUrl, just break out
            if(reqBody[i].length==1){
                if(reqBody[i][0]==""){
                    break;
                }
            }           
            
            //=============================
            let newUrlArray=[] 
            //req.body['photoUrl1'].length > 0
            if(reqBody[i].length>0){ 
                //at least should have photoUrl=[""]
                reqBody[i].map(j=>{
                    let temp=j.split("/")
                    //"https://picsum.photos/200"
                    // ไม่ต้องเปลี่ยนไร
                    if(temp[0]=="https"||temp[0]=="http"){
                        newUrlArray=[...newUrlArray,j]
                    }
                    //upload/job/01_21_2021/room-1.jpg
                    //temp=["","upload","job","01_21_2021","room-1.jpg"]
                    //ถ้า คือ 5 ไม่ต้องเปลี่ยนไร 
                    if(temp.length==5){
                        newUrlArray=[...newUrlArray,j]
                    }
                    if(temp.length==1){
                        //temp[0]=["room-1.jpg"] we just add a file on client
                        //we need to put "/upload/job/01_21_2021"
                        if(temp[0]!=""){
                            newUrlArray=[...newUrlArray,`/${reqFolder}/${j}`] 
                        }
                    }
                })
                //check
                //console.log('newUrlArray')
                //console.log(newUrlArray)
            }
            if(newUrlArray.length>0){   
                //tempPhotoObj={...tempPhotoObj,
                //    ['photoUrl1'],["/upload/customer/01_21_2021/lcd.jpg"]}
                tempPhotoObj={...tempPhotoObj,[i]:newUrlArray}
            }
            
        }    
    }
    return tempPhotoObj
    
}
//---------------------------
//get=>localhost:3001/*/addcustom
//all except user,shop,tableTemplate,transaction
const addcustom= async(req, res, next) => {
    const Data=require(req.modal); 
    const shopId=req.shopId
    const userId=req.user.id
    const {id}=req.body
    const {shopName,ownerName,username,password,ownerPassword,detail,
           ...remaining}=req.body

    try{
        //check id
        if(!id){ throw {message:'Id is invalid'} }
        if(id<1){ throw {message:'Id is invalid'} }
        if(!shopId){ throw {message:'shopId is invalid'}  }   

        //check user shop
        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password add allowed"}
        }
        
        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(resFindId){ throw {message:"ID already exists"} }
        
        let dataTosave={...remaining,shopId,userId}


        if(detail){
            let tempArray=[]
            detail.map(i=>{
                const {_id,...rm}=i
                tempArray=[...tempArray,{...rm}]
            })
            
            //console.log(tempArray)
            dataTosave={...dataTosave,detail:tempArray}
        }


        //add photo
        const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)
        
        if(Object.keys(tempPhotoObj).length>0){
            dataTosave={...dataTosave,...tempPhotoObj}
        }

        const newData=new Data (dataTosave);
        await newData.save();
        return res.status(200).send({message:"add custom successfully"})

    }
    catch (error){
        return res.status(400).send({message:"add custom fail"})
    }
}
//------------------------------
const addgroup= async(req, res, next) => {
    const Data=require(req.modal); 

    const shopId=req.shopId
    const userId=req.user.id
    const {id,parentId}=req.body
    const {children,...remaining}=req.body
    let dataTosave={...remaining,["children"]:[]}

    console.log('req.body')
    console.log(req.body)

    try{
        //check id
        if(!id){ throw {message:'Id is invalid'} }
        if(id<1){ throw {message:'Id is invalid'} }
        if(!shopId){ throw {message:'shopId is invalid'}  }   

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(resFindId){ throw {message:"ID already exists"} }
        
        dataTosave={...dataTosave,shopId,userId}
        

        //make sure we have children array
        /*
        if(!children){
            dataTosave={...dataTosave,["children"]:[]}
        }else{
            if(!Array.isArray(children)){
                dataTosave={...dataTosave,["children"]:[]}
            }
        }
        */

        //group
        if(parentId>=0){
            await  Data.updateOne(
                {id:parentId,shopId},
                {$push:{"children":id}}   
            )
        }

        const newData=new Data (dataTosave);
        
        const result=await newData.save();
        console.log('result')
        console.log(result)
        return res.status(200).send({message:"add group successfully"})

    }
    catch (error){
        return res.status(400).send({message:"add group fail"})
    }
}

//------------------------------
const addtransaction= async(req, res, next) => {
    
    const Data=require(req.modal); 

    const shopId=req.shopId
    const userId=req.user.id
    const {shopName,ownerName,username,password,ownerPassword,
           ...remaining}=req.body
    const {id,effectStock,effectOrder,effectPlan,detail,groupId}=req.body
    
    console.log('1 req.body')
    console.log(req.body)

    try {
        //check id
        if(!id){ throw {message:'Id is invalid'} }
        if(id<1){ throw {message:'Id is invalid'} }
        if(!shopId){ throw {message:'shopId is invalid'}  }   

        //check user shop
        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password add allowed"}
        }

        console.log('2')
        if(!effectPlan){throw {message:"no effectPlan"}}
        if(!effectStock){throw {message:"no effectStock"}}
        if(!effectOrder){throw {message:"no effectOrder"}}

        console.log('3')
        if(!detail){throw {message:"no detail"}}
        //if(!groupId){throw {message:"no groupId"}}

        const resFindId = await Data.findOne({ id,shopId }).lean()
        if(resFindId){ throw {message:"ID already exists"} }
        
        console.log('4')
        let dataTosave={...remaining,shopId,userId}    

         //add photo
        const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)
        
        console.log('5')
        if(Object.keys(tempPhotoObj).length>0){
            dataTosave={...dataTosave,...tempPhotoObj}
        }

        console.log('6')
        console.log(dataTosave)

        const newData=new Data(dataTosave) 
        const resSave = await newData.save() 

        //updat Product (stock,order,plan)
        const Product=require('../modals/Product'); 
        
        let orderChange=0
        let stockChange=0
        let planChange=0

        let orderFactor=0
        let stockFactor=0
        let planFactor=0

        if(effectStock=="บวก"){stockFactor=1}
        if(effectStock=="ลบ"){stockFactor=-1}
        if(effectOrder=="บวก"){orderFactor=1}
        if(effectOrder=="ลบ"){orderFactor=-1}
        if(effectPlan=="บวก"){planFactor=1}
        if(effectPlan=="ลบ"){planFactor=-1}

        for (let j=0;j<detail.length;j++){
            orderChange=parseFloat(detail[j].quantity)*orderFactor
            stockChange=parseFloat(detail[j].quantity)*stockFactor
            planChange=parseFloat(detail[j].quantity)*planFactor

            await Product.updateOne(
                {id:detail[j].id,shopId},
                {$inc:{"stock":stockChange,
                    "order":orderChange,
                    "plan":planChange}}
            )
        }

        return res.status(200).json({message:"add transaction succesfully"})
    }
    catch (error){
        return res.status(400).send(error)
    }
    
}

//===========================
//===========================

//all exclud shop,user,tabletemplate
const updatecustom=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id
    const {_id,id,newId,username,password,shopName,
              ownerName,ownerPassword,detail,
              ...remaining}=req.body

    const qryObject={id,shopId}
    try{
        //check user shop
        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password update allowed"}
        }

        let dataTosave
        if(newId>0){
            dataTosave={...remaining,shopId,userId,id:newId}
        }
        else {
            dataTosave={...remaining,shopId,userId}
        }

        
        if(detail){
            let tempArray=[]
            detail.map(i=>{
                const {_id,...rm}=i
                tempArray=[...tempArray,{...rm}]
            })
            console.log('tempArray.........')
            console.log(tempArray)
            dataTosave={...dataTosave,detail:tempArray}
        }

        const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)

        if(Object.keys(tempPhotoObj).length>0){
            dataTosave={...dataTosave,...tempPhotoObj}
        }


        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )
        return res.status(200).json({message:"update custom succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"update custom fail"})
    }
}
//----------------------------------------
const updategroup=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id
    
    /*
    const {id,newId,
           mainGroup,newMainGroup,
           allChildrenObject,allChildrenId,
           parentId,newParentId,
           ...remaining
          }=req.body
    */
    let {id,newId, parentId,newParentId,...remaining}=req.body
    newId=parseInt(newId)
    newParentId=parseInt(newParentId)
    //return res.status(200).json("updategroup")
    //type 
    //1:normal
    //2:id change
    //3:parent change 
    //4:id + parent change
    
    try{
        //1
        if( (id!=newId) && (newId>1) && (parentId!=newParentId) && (newParentId>0) ) {
            throw {message:"Do not update id and parentId at the same time"}
        } 
        //2
        else if ( (id!=newId) && (newId>1) ){

            await Data.deleteMany({id:{$in:req.body.deleteMany}})

            let tempCreate=[]
            req.body.create.map(i=>{
                tempCreate=[...tempCreate,{...i,shopId:req.shopId}]
            })
            await Data.create(tempCreate)
            return res.status(200).json("updategroup case 2")
        }
        //3
        else if( (parentId!=newParentId) && (newParentId>0) ){
            
            let {parentObject,allChildrenId,tempAllChilden,...newRemaining} = req.body
            
            let temp2=await Data.findOne({id:newParentId,shopId})
            const newParentObject={...temp2._doc}

            newRemaining={...newRemaining,
                           parentId:newParentId,
                           mainGroup:newParentObject.mainGroup,
                           parentGroup:[...newParentObject.parentGroup,newParentId],
                           shopId
                        }

            let newAllChildren = []
            
            tempAllChilden.map((i,idx)=>{
                if(idx>0){
                    let foundMatch = false

                    let temp=[]  //ไว้จัดเก็บ parentGroup ใหม่ ของลูกๆ 
                    
                    i.parentGroup.map(j=>{
                      if(j==id){
                        foundMatch=true
                      }
                      
                      if(foundMatch){
                        temp=[...temp,j]
                      }  
        
                    })

                    const newI={...i,
                        mainGroup:newParentObject.mainGroup,
                        parentGroup:[...newRemaining.parentGroup,...temp],
                        shopId
                    }
                    newAllChildren=[...newAllChildren,newI]
                }
            })
                       

            await  Data.updateOne(
                {id:parentId,shopId},
                {$pull:{"children":id}}   
            )
            //at new parent , add id into children
            await  Data.updateOne(
                {id:newParentId,shopId},
                {$push:{"children":id}}   
            )
            
            await Data.deleteMany({id:{$in:allChildrenId}})

            const tempCreate=[newRemaining,...newAllChildren]

            await Data.create(tempCreate)

            return res.status(200).json("updategroup case 3")
        }
        //4
        else {
            await Data.updateOne(
                {id,shopId},
                {$set:{...remaining}}
            )
            return res.status(200).json("updategroup case 4")
        }

    }
    catch (error){
        return res.status(400).send({message:"update group fail"})
    }
}
//----------------------------------------

const updatetabletemplate=async (req,res,next)=>{
    
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id

    const {tableName,template}=req.body
    const qryObject = {tableName,shopId,id:userId}

    try{    
        if(!tableName){ throw {message:"tableName do not exist"} }
        if(!template){ throw {message:"template do not exist"} }

        const dataTosave={template}
        
        await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )
        return res.status(200).json({message:"update tabletemplate succesfully"})
    }
    catch (error){
        //console.log(error)
        return res.status(400).send({message:"update tabletemplate fail"})
    }
    
}
//-------------------------------

const updatetransaction=async (req,res,next)=>{
    //console.log('updatetransaction')
    const Data=require(req.modal);
    const shopId=req.shopId
    const userId=req.user.id

    const {id,username,password,shopName,
             ownerName,ownerPassword,
             ...remaining}=req.body


    const {effectStock,effectOrder,effectPlan,detail,transactionType}=req.body
    //groupId
    
    try {
        console.log('1')
        if(!effectPlan){throw {message:"no effectPlan"}}
        if(!effectStock){throw {message:"no effectStock"}}
        if(!effectOrder){throw {message:"no effectOrder"}}

        if(!detail){throw {message:"no detail"}}
        if(!transactionType){throw {message:"no transactionType"}}
        //if(!groupId){throw {message:"no groupId"}}

        if(shopName||ownerName||username||password||ownerPassword){ 
            throw {message:"No username or password add allowed"}
        }
    //ถ้าเงื่อนไขต่างไปจากนี้ ควรใช้ bill แทน transaction
    //ถ้า groupId เหมือนเดิม
    //นำ detail อันใหม่ เทียบกับ detail อันเก่า
    //แก้ไข product (stock, order, plan) 
    //อาศัยค่า ของ effectStock,effectOrder,effectPlan
    //ถ้า groupId เปลี่ยน
    //แก้ไข product (stock, order, plan) 
    //บันทึก TransactionLog ด้วย 
    
    //Find transaction before update
        console.log('2')
        //check user shop
        const resFindId = await Data.findOne({ id,shopId }).lean()
        //ค้นหา ID  ที่ต้องการอัพเดท
        console.log('3')
        if(!resFindId){throw {message:"no transaction found"}}
        //console.log('1')
        //ถ้าเจอ
        if(resFindId){
                console.log('4')
                const Product=require('../modals/Product'); 
                //เตรียมทำการอัพเดต Product

                let orderChange=0
                let stockChange=0
                let planChange=0

                let orderFactor=0
                let stockFactor=0
                let planFactor=0 

                if(effectStock=="บวก"){stockFactor=1}
                if(effectStock=="ลบ"){stockFactor=-1}
                if(effectOrder=="บวก"){orderFactor=1}
                if(effectOrder=="ลบ"){orderFactor=-1}
                if(effectPlan=="บวก"){planFactor=1}
                if(effectPlan=="ลบ"){planFactor=-1}

                console.log('5')
                //อันนี้ถ้า groupId ไม่เปลี่ยน เอา detail อันเก่า เทียบกับอันใหม่
                if(resFindId.transactionType==transactionType){
                    //==============================
                    console.log('6')
                    //อันเก่า
                    const prevDetail=resFindId.detail
                    
                    let same_id=[]
                    
                    let tempDetail=[...detail] 

                    //compare detail with prevDetail
                    //if ID match update product
                    //find for same detail["id"] and put in same_id=[]
                    for (let j=0;j<prevDetail.length;j++){
                        
                        for (let k=0;k<tempDetail.length;k++){
                            
                            if(prevDetail[j].id==parseInt(tempDetail[k].id)){  

                                same_id=[...same_id,prevDetail[j].id]
                                    
                                //orderChange=orderChange*orderFactor
                                orderChange=( parseFloat(tempDetail[k].quantity)-prevDetail[j].quantity )*orderFactor
                                stockChange=( parseFloat(tempDetail[k].quantity)-prevDetail[j].quantity )*stockFactor
                                planChange= ( parseFloat(tempDetail[k].quantity)-prevDetail[j].quantity )*planFactor
                                
                                //console.log('3')
                                const resUpdate= await Product.updateOne(
                                    {id:tempDetail[k].id,shopId},
                                    {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                                )
                                //console.log('4')
                                //reduce tempDetail as soon as it is match
                                //break out of tempDetail loop 
                                tempDetail.splice(k,1)
                                break
                            }

                        }

                    }
                    console.log('7')
                    //console.log('same_id')
                    //console.log(same_id)
                    //compare prevDetail with same_id
                    //find detail["id"] which exist in prevDetail
                    //but not exist in same_id
                    //we call it exclude 
                    let temp_same_id=[...same_id]
                    let tempPrev=[]
                    prevDetail.map(prev=>{
                        
                        let isExclude=true 
                        for (let a=0;a<temp_same_id.length;a++){
                            if(parseInt(prev.id)==temp_same_id[a]){
                                isExclude=false
                                //if found match id
                                //reduce temp_same_id and exit loop
                                temp_same_id.splice(a,1)
                                break
                            }
                        }
                        if(isExclude){
                            tempPrev=[...tempPrev,prev]
                        }

                    })
                    console.log('8')
                    //console.log('tempPrev')
                    //console.log(tempPrev)
                    //หัก same id ออกจาก อันเก่า resFindId
                    //==========================
                    //find detail["id"] which exist in detail
                    //but net exist in same_id
                    //we also call isExclude
                    temp_same_id=[...same_id]
                    let tempCur=[]
                    detail.map(cur=>{
                        
                        let isExclude=true 
                        for (let a=0;a<temp_same_id.length;a++){
                            if(parseInt(cur.id)==temp_same_id[a]){
                                isExclude=false
                                //if found match id
                                //reduce temp_same_id and exit loop
                                temp_same_id.splice(a,1)
                                break
                            }
                        }
                        if(isExclude){
                            tempCur=[...tempCur,cur]
                        }

                    })
                    console.log('9')
                    //console.log('tempCur')
                    //console.log(tempCur)
                    //prevDetail have, Detail do not have
                    //หัก same id ออกจาก อันเก่า req.body
                    //================================
                    //ทำการ update Product จาก tempPrev
                    for (let l=0;l<tempPrev.length;l++){
                        
                        if(parseInt(tempPrev[l].id)){
                            orderChange=tempPrev[l].quantity*orderFactor*-1
                            stockChange=tempPrev[l].quantity*stockFactor*-1
                            planChange=tempPrev[l].quantity*planFactor*-1
                        }
                        if(parseInt(tempPrev[l].id)>0){
                            const resUpdate= await Product.updateOne(
                                {id:tempPrev[l].id,shopId},
                                {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                            )
                        }
                    }  
                    console.log('10')  
                    //=================================
                    //ทำการ update Product จาก tempCur
                    //prevDetail do not have, Detail have
                    for (let m=0;m<tempCur.length;m++){

                        if(parseFloat(tempCur[m].quantity)){
                            orderChange=parseFloat(tempCur[m].quantity)*orderFactor
                            stockChange=parseFloat(tempCur[m].quantity)*stockFactor
                            planChange=parseFloat(tempCur[m].quantity)*planFactor
                        }
                        if(parseInt(tempCur[m].id)>0){
                            const resUpdate= await Product.updateOne(
                                {id:tempCur[m].id,shopId},
                                {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                            )
                        }

                    }    
                    //===========================
                }
                //end of same document type (define by grouopID)  
                //ในกรณี ที่ประเภทของเอกสารเปลี่ยนไป เช่น จากใบสั่งซื้อ เป็น ใบรับของ
                //ในกรณีนี้ order จะลบ stock จะลบ order ของ product ด้วย
                //
                //different groupId such as from Quotation => Receipt 
                else{

                        for (let j=0;j<detail.length;j++){
                            orderChange=parseFloat(detail[j].quantity)*orderFactor
                            stockChange=parseFloat(detail[j].quantity)*stockFactor
                            planChange =parseFloat(detail[j].quantity)*planFactor

                            const resUpdate= await Product.updateOne(
                                {id:detail[j].id,shopId},
                                {$inc:{"stock":stockChange,"order":orderChange,"plan":planChange}}
                            )
                        }

                        //======================
                        //keep log of transaction before change groupId
                                    //to keep log of delete transaction
                            const TransactionLog=require('../modals/TransactionLog'); 
                            if(TransactionLog){
                                const {_id,__v,...remaining}=resFindId
                                //console.log('remaining')
                                //console.log(remaining)
                                const newData=new TransactionLog({...remaining,status:"close"}) 
                                await newData.save() 
                            }
                        //=======================

                }
            }//if(resFindId){
        
        console.log('11')

        //console.log('10')
        const qryObject={id,shopId}
        let dataTosave={...remaining,shopId,userId}
        
         //add photo
         const tempPhotoObj=addDateFolderToUrl(req.body,req.folder)
            
         if(Object.keys(tempPhotoObj).length>0){
             dataTosave={...dataTosave,...tempPhotoObj}
         }
         console.log('12')

        console.log('qryObject')
        console.log(qryObject)
         
        console.log('dataTosave')
        console.log(dataTosave)
        const resUpdate=await Data.updateOne(
            qryObject,
            {$set:{...dataTosave}}
        )

        return res.status(200).json({message:"update transaction succesfully"})
    }
    catch (error){
        return res.status(400).send({message:"update transaction fail"})
    }  
}
//======================
//======================

//===================
//post=>localhost:3001/*/pop
/*
const pop=async (req,res,next)=>{
    const Data=require(req.modal);
    const shopId=req.shopId

    const {items,template}=req.body;

    const eachLoop=10000;
    let start=0;
    let stop=0;
    //จำนวนเต็มรอบ
    let loopNumber=Math.floor(items/eachLoop)
    //เศษที่เหลือ เป็นรอบสุดท้าย
    const remainingNumber=items%eachLoop
    //=================
    
    //1) sample
    //2) sampleArray
    //3) createKey
    //4) createObject 
    //5) createArrayObject
    //6) loopPopDataPromiseAll // no use
    //7) saveToMonToMongoByEachLoop
        
    //=================
    //1) เลือกมาหนึ่งจาก array ที่ให้มา
    const sample=(array)=>{
        const tempIndex=Math.floor(Math.random() * array.length)
        return array[tempIndex]
    }
    //=================
    //2) สร้าง array ตามขนาดที่กำหนด โดยเลือกค่ามาจาก array ที่ให้มา 
    const sampleArray=(array,arraySize)=>{
        let tempArray=[]
        for(let i=1;i<=arraySize;i++){
            const tempIndex=Math.floor(Math.random() * array.length)
            tempArray=[...tempArray,array[tempIndex]]
        }
        return tempArray
    }
    //=================
    //3) createKey
    //template.i={key,type,array,arraySize,casual}
    //template.map(i=>{})
    const createKey=(newObj,i)=>{
        //สร้างเป็นตัวเลข ชื่อคือ key ด้วย 2 แบบ 
        //สุ่มค่าจาก array 
        //หรือใช้ casual ค่าระหว่าง 1-100
        if(i.type=="number"){
            if(i.array.length>0){
                newObj[i.key]=sample(i.array)  
                return newObj     
            }
            else{
                newObj[i.key]=casual.integer(0,i.casual)
                return newObj
            }
        }
        //สร้างเป็น boolean ค่าสุ่มระหว่าง true,false
        else if(i.type=="boolean"){
            newObj[i.key]=sample([true,false])
            return newObj
        }
        //สร้างเป็น date ค่าสุ่มจาก casual 
        else if(i.type=="date"){
            newObj[i.key]=new Date(casual.date('YYYY-MM-DD')).toISOString()
            return newObj
        }
        //สร้าง เป็น array ขนาด i.arraySize จากการสุ่มภายใน i.array 
        else if(i.type=="array"){
            if(i.array.length>0){
                newObj[i.key]=sampleArray(i.array,i.arraySize)       
                return newObj
            } 
        }     
        //สร้าง เป็น array ตัวเลข โดยกำหนด arraysize และ
        //จากการใช้ casual ระหว่าง 1-100
        else if(i.type=="arrayNumber"){
            newObj[i.key]=casual.array_of_integers(i.arraySize)
            return newObj 
        }
        //การสร้าง object ลูกขึ้นมา โดยมี subTemplate 
        //ไว้สร้าง ลูกอีกที โดยใช้คำสั่ง create Key ซ้ำ
        else if(i.type=="arrayObject"){
           newObj[i.key]={}
            i.subTemplate.map(k=>{
            newObj[i.key]={...newObj[i.key],...createKey(newObj[i.key],k) }
           })
           return newObj
           //console.log(newObj)
        }    
        //สร้าง key อื่นๆ จาก 1.ค่าใน array หรือ 2. จาก casual 
        else{
            if(i.array.length>0){
                newObj[i.key]=sample(i.array)       
                return newObj
            }
            else{
                newObj[i.key]=casual[i.casual]
                //console.log(casual[i.casual])
                return newObj
            }   
        }
    }
    //=================
    //4) createObject สร้าง 1 object จาก template 
    //โดยใช้ createKey สร้างแต่ละ ฟิลบ์ 
    //สามารถสร้าง subTemplate ได้ด้วย
    const createObject=(template)=>{
        let tempObj={}
        for(let j =0;j<template.length;j++){
            tempObj={...tempObj,...createKey(tempObj,template[j]) }
        }       
        //console.log(tempObj)
        return tempObj
    }
    //=================
    //5) createArrayObject
    //คำสั่งในการ สุ่ม สร้าง array ของ object โดยมี id เริ่มจาก start จนถึง stop 
    //ด้วยคำสั่ง createObj โดยมีลักษณะ ข้อมูลตาม template
    //เราใช้ noe Promise เพื่อให้เป็น Async เพื่อใช้ promise all 
    //หรือกลับมาเป็น sync ด้วย await 
    const createArrayObject=(start,stop)=>{
        return new Promise((resolve,reject)=>{
            //console.log(`start=${start},stop=${stop}`)
            let temp=[]
            
            for(let i=start;i<=stop;i++){
                temp=[...temp,{id:i,...createObject(template)}]
            }
 
            resolve(temp)
        })    
    }        
    //=================
    //=================
    //7 loopPopDataFor
    //for + await => จะดำเนินการแบบทีละ ลูป (แต่ละลูป แค่า 10,000 แรมจำกัด ) แล้วทำต่อไป
    //คำสั่ง ในการ เรียกใช้ popData แล้วบันทึก ใน mongo ในทีละรอบ
    const saveToMongoByEachLoop= async()=>{

        //เริ่มจับเวลา
        console.time('saveToMongoByEachLoop')
        
        try{        
            for (let i=0;i<loopNumber;i++){
                start=i*eachLoop+1
                stop =i*eachLoop+eachLoop
                
                const temp=await createArrayObject(start,stop)
                const result=await Data.create(temp)
                if(result)
                {
                  //console.log(`start:${start},stop:${stop},length:${result.length}`)
                }
            }

            if(remainingNumber>0){
                start=stop+1
                stop=stop+remainingNumber
                
                const temp=await createArrayObject(start,stop)
                const result=await Data.create(temp)
                if(result)
                {
                  //console.log(`start:${start},stop:${stop},length:${result.length}`)
                }
            }
            //สิ้นสุดเวลา
            console.timeEnd('saveToMongoByEachLoop')
            return true
        }
        catch (error){
            return false
        }
    }
    //==================
    //console.log(createObject(template))
    //if(true){
    if(saveToMongoByEachLoop()){
        return (
            res.status(200).json({message:"ok"})
        )
    }
    else {
        return(
            res.status(400).send({message:"fail"})
        )
    }
}
*/
//===================

const developer={
    mytest,
    init,restore,backup,
    getcustom,getlimit,
    deleteall,deletecustom,deletetransaction,deletegroup,deletemany,
    addcustom,addtransaction,addgroup,
    updatecustom,updatetabletemplate,updatetransaction,updategroup
}

module.exports = developer;