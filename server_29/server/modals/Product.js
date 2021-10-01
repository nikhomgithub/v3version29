const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id:{type:Number,required:true}, // ไอดี
    barcode:{type:String}, // บาร์โค้ด
    productName:{type:String}, // ชื่อ

    groupId: {type: Number}, // ไอดีกลุ่ม
    groupName: {type:String}, // ชื่อกลุ่ม
   
    photoUrl1:{type:[String]}, // 
    unit:{type:String},  // หน่วย
    price:{ type:Number}, // ราคา
   
    priceLevel:{ // รายละเอียด
        type:[{
            price:{type:Number},
            remark:{type:String}
        }]
    },

    remark:{type:String}, // หมายเหตุ

    timestamp:{type:Date},
    userId:{type:String},
    shopId:{type:String,required:true}, //
    
    isRawMat:{type:Boolean}, //เป็นวัตถุดิบ
    detail:{ // รายละเอียด
        type:[{
            id:{type:Number,default:0}, //1
            barcode:{type:String}, //2
            productName:{type:String}, //3
            
            groupId:{type:Number,default:0}, //4
            groupName:{type:String}, //5
       
            unit:{type:String}, //6
            price:{type:Number,default:0}, //7 
            priceLevel:{//8
                type:[{
                    price:{type:Number},
                    remark:{type:String}
                }]
            },
            quantity:{type:Number,default:0}, //7 
            result:{type:Number},//10
            remark:{type:String}, //11
            isRawMat:{type:Boolean}, //12 
            photoUrl1:{type:[String]}//13
        }]
    },
    stock:{type:Number,default:0}, // ยอดสต็อค
    order:{type:Number,default:0}, // ยอดจอง
    plan:{type:Number,default:0} //ยอดแผน

});

ProductSchema.index({id:1,name:1})

module.exports = Product = mongoose.model('Product', ProductSchema);