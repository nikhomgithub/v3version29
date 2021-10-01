const validationTemplate =require('../middleware/validation/validationTemplate')
const initData = require('../data/initData/initData')
//const restoreData = require('../data/restoreData/restoreData')

const backupFolder='./data/backupData/'

const shop={
    modal:'../modals/Auth',
    initData:initData.shopInit,
    //restoreData:restoreData.shopRestore,
    backupFolder:backupFolder,
    //addLimit:5,
    tokenName:"shopToken",
    routeName:"shop",
    folder:"p27upload/shop",
    valTemplate:validationTemplate.shop
}
const user={
    modal:'../modals/Auth',
    initData:initData.userInit,
    //restoreData:restoreData.userRestore,
    backupFolder:backupFolder,
    //addLimit:5,
    tokenName:"userToken",
    routeName:"user",
    folder:"p27upload/user",
    valTemplate:validationTemplate.user
}
const basicData={
    modal:'../modals/BasicData',
    initData:initData.basicDataInit,
    //restoreData:restoreData.basicDataRestore,
    backupFolder:backupFolder,
    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"basicdata",
    folder:"p27upload/basicdata",
    valTemplate:validationTemplate.basicData
}
const tableTemplate={
    modal:'../modals/TableTemplate',
    initData:initData.tableTemplate,
    //restoreData:restoreData.tableTemplateRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"tabletemplate",
    folder:"p27upload/tabletemplate",
    valTemplate:null
}
const product={
    modal:'../modals/Product',
    initData:initData.productInit,
    //restoreData:restoreData.productRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"product",
    folder:"p27upload/product",
    valTemplate:validationTemplate.product
}
const group={
    modal:'../modals/Group',
    initData:initData.groupInit,
    //restoreData:restoreData.groupRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"group",
    folder:"p27upload/group",
    valTemplate:validationTemplate.group
}
const partner={
    modal:'../modals/Partner',
    initData:initData.partnerInit,
    //restoreData:restoreData.partnerRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"partner",
    folder:"p27upload/partner",
    valTemplate:validationTemplate.partner
}

const transaction={
    modal:'../modals/Transaction',
    initData:initData.transactionInit,
    //restoreData:restoreData.transactionRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"transaction",
    folder:"p27upload/transaction",
    valTemplate:validationTemplate.transaction
}

const transactionLog={
    modal:'../modals/TransactionLog',
    initData:initData.transactionLogInit,
    //restoreData:restoreData.transactionLogRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"transactionlog",
    folder:"p27upload/transactionlog",
    valTemplate:null
}


const params={shop,user,basicData,tableTemplate,
             product,group,partner,
             transaction,transactionLog}

module.exports=params