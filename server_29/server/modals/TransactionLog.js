const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionLogSchema = new Schema({
    
    id:{type:Number,required:true}, // ไอดี
    date:{type:Date}, // วันที่
    //new Date().toISOString()
    //2020-12-30T12:40:20.964Z
    remindDate:{type:Date},
    branch:{type:String},

    transactionType:{type:String}, // ประเภทเอกสาร
    transactionStatus:{type:String},
    active:{type:String},
    status:{type:String},/////////////

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
    tax1:{type:Number},
    tax2:{type:Number},
    grandTotal:{type:Number}, // สุทธิ

    detail:{   // รายละเอียด
        type: [{
            id:{type:Number,default:0}, // ไอดี
            barcode:{type:String}, // บาร์โค้ด
            productName:{type:String}, // ชื่อ
            
            groupId:{type:Number,default:0}, // ไอดีกลุ่ม
            groupName:{type:String}, // ชื่อกลุ่ม
            parentGroup:{type:[Number]}, //กลุ่มย่อย
            children:{type:[Number]}, //กลุ่มย่อย
            parentId:{type:Number}, //ไอดีกลุ่มแม่
            mainGroup:{type:Number},//กลุ่มหลัก

            unit:{type:String}, // หน่วย
            price:{type:Number,default:0}, // ราคา 
            quantity:{type:Number,default:0}, // จำนวน 
            result:{type:Number},
            remark:{type:String}, //หมายเหตุ
            isRawMat:{type:Boolean}, // เป็นวัตถุดิบ
            partnerId:{type:Number},
            name:{type:String}
        }],        
    },


});

TransactionLogSchema.index({id:1,groupName:1,name:1})

module.exports = TransactionLog = mongoose.model('TransactionLog', TransactionLogSchema);