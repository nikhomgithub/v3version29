const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StickerSchema = new Schema({
    id:{type:Number,required:true}, //ไอดี
    recordName:{type:String},
    date:{type:Date}, 
    recordBy:{type:String},

    xPerLine:{type:Number},
    heightP:{type:Number},
    widthP:{type:Number},

    gridColumnGap:{type:Number},
    gridRowGap:{type:Number},
    showBorder:{type:Number},

    paddingTopP:{type:Number},
    paddingBottomP:{type:Number},
    paddingLeftP:{type:Number},
    paddingRightP:{type:Number},

    showCode:{type:Boolean},
    showBarCode:{type:Boolean},

    heightB:{type:Number},
    widthB:{type:Number},
    fontSizeCode:{type:Number},

    showName:{type:Boolean},
    fontSizeName:{type:Number},

    showPrice:{type:Boolean},
    fontSizePrice:{type:Number},
    
    showUnit:{type:Boolean},
    fontSizeUnit:{type:Number},

    productData:{  //
        type: [{
            code:{type:String}, // 
            name:{type:String}, //
            price:{type:Number},
            unit:{type:String}, 
            qty:{type:Number}
        }],        
    },
   
    userId:{type:String},
    shopId:{type:String,required:true},
    timestamp:{type:Date},

});

StickerSchema.index({id:1})

module.exports = Sticker = mongoose.model('Sticker', StickerSchema);