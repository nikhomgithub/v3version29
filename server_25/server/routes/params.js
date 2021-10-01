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
    folder:"p25upload/shop",
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
    folder:"p25upload/user",
    valTemplate:validationTemplate.user
}

const basicData={
    modal:'../modals/BasicData',
    initData:initData.basicDataInit,
    //restoreData:restoreData.basicDataRestore,
    backupFolder:backupFolder,
    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"basicdata",
    folder:"p25upload/basicdata",
    valTemplate:validationTemplate.basicData
}

const job={
    modal:'../modals/Job',
    initData:initData.jobInit,
    //restoreData:restoreData.productRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"job",
    folder:"p25upload/job",
    valTemplate:validationTemplate.job
}

const know={
    modal:'../modals/Know',
    initData:initData.knowInit,
    //restoreData:restoreData.productRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"know",
    folder:"p25upload/know",
    valTemplate:validationTemplate.know
}

const tableTemplate={
    modal:'../modals/TableTemplate',
    initData:initData.tableTemplate,
    //restoreData:restoreData.tableTemplateRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"tabletemplate",
    folder:"p25upload/tabletemplate",
    valTemplate:null
}


const customer={
    modal:'../modals/Customer',
    initData:initData.customerInit,
    //restoreData:restoreData.partnerRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"customer",
    folder:"p25upload/customer",
    valTemplate:validationTemplate.customer
}

const sticker={
    modal:'../modals/Sticker',
    initData:initData.stickerInit,
    //restoreData:restoreData.partnerRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    addLimit:5,
    tokenName:"",
    routeName:"sticker",
    folder:"p25upload/sticker",
    valTemplate:validationTemplate.customer
}

const params={shop,user,basicData,job,tableTemplate,customer,know,sticker}

module.exports=params