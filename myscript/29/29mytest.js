const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p29transaction/mytest`,{},myheader)
        console.log('p29transaction/mytest')
        console.log(result1.data)

        const result11= await axios.post(`http://${mainUrl}/p29transactionlog/mytest`,{},myheader)
        console.log('p29transactionlog/mytest')
        console.log(result11.data)

        const result12= await axios.post(`http://${mainUrl}/p29partner/mytest`,{},myheader)
        console.log('p29partner/mytest')
        console.log(result12.data)

        const result13= await axios.post(`http://${mainUrl}/p29product/mytest`,{},myheader)
        console.log('p29product/mytest')
        console.log(result13.data)

        const result15= await axios.post(`http://${mainUrl}/p29basicdata/mytest`,{},myheader)
        console.log('p29basicdata/mytest')
        console.log(result15.data)

        const result14= await axios.post(`http://${mainUrl}/p29group/mytest`,{},myheader)
        console.log('p29group/mytest')
        console.log(result14.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p29job')
getStart()