const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const bodyParser = require('body-parser');

const app = express();

//allow cross origin
app.use(cors());
//body parser for json data
app.use(express.json());

//body parser for form data
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"));

//=====================
app.use("/p29upload",express.static('p29upload'));

app.get("/p29test",(req,res)=>{
    return res.status(200).json({msg:"Pass :you access to p29 server"});
})

const shopRt = require('./routes/shopRt');
app.use("/p29shop",shopRt);

const userRt = require('./routes/userRt');
app.use("/p29user",userRt);

const basicDataRt = require('./routes/basicDataRt');
app.use("/p29basicdata",basicDataRt);

const tableTemplateRt = require('./routes/tableTemplateRt');
app.use("/p29tabletemplate",tableTemplateRt);

const productRt = require('./routes/productRt');
app.use("/p29product",productRt);

const groupRt = require('./routes/groupRt');
app.use("/p29group",groupRt);

const partnerRt = require('./routes/partnerRt');
app.use("/p29partner",partnerRt);

const transactionRt = require('./routes/transactionRt');
app.use("/p29transaction",transactionRt);

const transactionLogRt = require('./routes/transactionLogRt');
app.use("/p29transactionlog",transactionLogRt);

const stickerRt = require('./routes/stickerRt');
app.use("/p29sticker",stickerRt);

//-----------------------------------------
//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static('../client/build'));
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'/../client','build','index.html'));
    })
  }

//never reach this line under development
app.use((req,res,next)=>{
    const error=new Error();
    error.status=404;
    error.message="Not Found";
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;

/*
http://localhost:3000/upload/ab80a5f4-dbc0-4f69-9b77-67089b253ae1-p01.jpeg
*/