const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KnowSchema = new Schema({
    id:{type:Number,required:true},
    dateIn:{type:Date},
    photoUrl1:{type:[String]},

    knowType:{type:String},
    active:{type:String},

    subject:{type:String},

    remark:{type:String},
    shopId:{type:String,required:true},
});

KnowSchema.index({id:1,subject:1})

module.exports = Know = mongoose.model('Know', KnowSchema);