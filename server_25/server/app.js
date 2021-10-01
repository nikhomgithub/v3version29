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
app.use("/p25upload",express.static('p25upload'));

app.get("/p25test",(req,res)=>{
    return res.status(200).json({msg:"Pass :you access to p25 server"});
})

const shopRt = require('./routes/shopRt');
app.use("/p25shop",shopRt);

const userRt = require('./routes/userRt');
app.use("/p25user",userRt);

const basicDataRt = require('./routes/basicDataRt');
app.use("/p25basicdata",basicDataRt);

const jobRt = require('./routes/jobRt');
app.use("/p25job",jobRt);

const customerRt = require('./routes/customerRt');
app.use("/p25customer",customerRt);

const knowRt = require('./routes/knowRt');
app.use("/p25know",knowRt);

const stickerRt = require('./routes/stickerRt');
app.use("/p25sticker",stickerRt);

const tableTemplateRt = require('./routes/tableTemplateRt');
app.use("/p25tabletemplate",tableTemplateRt);

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