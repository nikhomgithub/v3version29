const jwt = require('jsonwebtoken');

const checkShopToken = ()=>{

    return async (req,res,next)=>{
        try {

            let Shop    
            if(process.env.AUTH_CONNECTION=="true"){
                Shop=require('../modals/Auth').Shop;
            }else{
                Shop=require('../modals/Shop')
            }  

            //console.log(req.headers)
            if(!req.headers.shopauthorization){
                throw {message:`Unauthorized-shop1`}
            }
            const shopToken = req.headers.shopauthorization.split(" ")[1];

            if(!shopToken){
                throw {message:`Unauthorized-shop2`}
            }
            
            const shopDecoded = jwt.verify(shopToken, process.env.JWT_SECRET);

            const shopResult=await Shop.findOne({shopName:shopDecoded.id,code:shopDecoded.code}) 
            //authConnection.close()
            if(!shopResult){throw {message:`Unauthorized-shop3`}}
            if(!shopResult.active){throw {message:"Unauthorized-shop4"}} 
            //authConnection.close()
            //const {_id}=shopResults
            
            req.shopId=shopDecoded.id
            //console.log(req)
            //console.log(req.body)
            //console.log('end shopToken')
            return next()
        } catch (error) {
            console.log(`error : ${error}`)
            //authConnection.close()
            return res.status(400).send(error);
            //return res.json({ message:`Unauth`});
        }
               
    }
}

module.exports = checkShopToken