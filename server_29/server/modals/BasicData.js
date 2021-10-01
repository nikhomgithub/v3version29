const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasicDataSchema = new Schema({
    id:{type: Number,required:true}, // ไอดี
    title:{type:[String]}, // คำนำหน้า
    unit:{type:[String]}, // หน่วย
    userLevel:{type:[String]}, // ระดับผู้ใช้

    branch:{type:[String]},//สาขา

    transactionType:{type:[{
        groupId:{type:String},
        groupName:{type:String},
        transactionGroupType:{type:String},
        transactionCode:{type:String},
        effectOrder:{type:String},
        effectPlan:{type:String},
        effectStock:{type:String},
    }]
    }, // ประเภทเอกสาร
    
    transactionGroupType:{type:[String]},

    transactionStatus:{type:[String]},//สถานะเอกสาร,
    active:{type:[String]},

    partnerType:{type:[String]}, // สถานะเอกสาร

    tax:{type:[{
        taxName:{type:String},
        taxActive:{type:Boolean},
        taxRate:{type:Number},
    }]},
    
    effectStock:{type:[String]},// กระทบสต็อก
    effectOrder:{type:[String]},// กระทบจอง
    effectPlan:{type:[String]},//  กระทบแผน

    userId:{type:String},
    shopId:{type:String,required:true}, //
    timestamp:{type:Date},

    //partnerType:{type:[String]}, // ประเภทคู่ค้า
    routeAuth:{type:[{
        id:{type:Number}, //ไอดี
        routeAddress:{type:String}, // เราท์แอดเดรส
        routeName:{type:String}, // เราท์เนม
        userLevel:{type:[String]} // ระดับผู้ใช้
    }],default:[]}
});

BasicDataSchema.index({id:1})

module.exports = BasicData = mongoose.model('BasicData', BasicDataSchema);


/*

    transactionType:{type:[{
        groupId:{type:String},
        groupName:{type:String},
        effectOrder:{type:String},
        effectPlan:{type:String},
        effectStock:{type:String},
    }]
    }, // ประเภทเอกสาร
    




*/