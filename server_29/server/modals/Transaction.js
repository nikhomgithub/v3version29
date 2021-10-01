const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    id:{type:Number,required:true}, // ไอดี
    date:{type:Date}, // วันที่
    //new Date().toISOString()
    //2020-12-30T12:40:20.964Z
    remindDate:{type:Date},
    branch:{type:String},

    transactionName:{type:String},
    transactionType:{type:String}, // ประเภทเอกสาร
    transactionCode:{type:String}, // ประเภทเอกสาร
    transactionGroupType:{type:String},
    transactionStatus:{type:String},
    reference:{type:String},

    active:{type:String},

    //status:{type:String},  // สถานะเอกสาร open,close,delete
    //transactionType:{type:String}, // ประเภทเอกสาร

    effectStock:{type:String}, // กระทบสต็อก
    effectOrder:{type:String}, // กระทบจอง
    effectPlan:{type:String}, // กระทบแผน

    photoUrl1:{type:[String]}, //

    partnerId:{type:Number}, // ไอดีคู่ค้า
    partnerType:{type:String}, //ประเภทคู่ค้า

    title:{type:String}, // คำนำหน้า
    name:{type:String}, // ชื่อ
    phone:{type:[String]}, // โทรศัพท์ 
   
    address:{
        type:{
            number:{type:String}, // เลขที่
            tambon:{type:String}, // ตำบล แขวง 
            district:{type:String}, // อำเภอ เขต 
            province:{type:String}, // จังหวัด
            postcode:{type:String}, // รหัสไปรษณีย์
        }
    },
   
    remark:{type:String}, // หมายเหตุ

    userId:{type:String},
    shopId:{type:String,required:true}, //
    timestamp:{type:Date},

    total:{type:Number}, // รวม
    reduction:{type:Number}, // ส่วนลด
    tax:{
        type:[{
            taxName:{type:String},
            taxActive:{type:Boolean},
            taxRate:{type:Number}
        }]
    },
    grandTotal:{type:Number}, // สุทธิ

    detail:{   // รายละเอียด
        type: [{
            id:{type:Number,default:0}, //1
            barcode:{type:String}, //2
            productName:{type:String}, //3
            
            groupId:{type:Number,default:0}, //4
            groupName:{type:String}, //5

            unit:{type:String}, //6
            price:{type:Number,default:0}, //7 
            priceLevel:{ //8
                type:[{
                    price:{type:Number},
                    remark:{type:String}
                }]
            },
            quantity:{type:Number,default:0}, //9 
            result:{type:Number},//10
            remark:{type:String}, //11
            isRawMat:{type:Boolean}, //12
            
            partnerId:{type:Number},//13
            name:{type:String},//14
            photoUrl1:{type:[String]}//15

        }],        
    }
});

TransactionSchema.index({id:1,groupName:1,name:1})

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema);