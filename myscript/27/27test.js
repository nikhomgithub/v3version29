const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p27transaction/mytest`,{},myheader)
        console.log('p27transaction/mytest')
        console.log(result1.data)

        const result11= await axios.post(`http://${mainUrl}/p27transactionlog/mytest`,{},myheader)
        console.log('p27transactionlog/mytest')
        console.log(result11.data)

        const result12= await axios.post(`http://${mainUrl}/p27partner/mytest`,{},myheader)
        console.log('p27partner/mytest')
        console.log(result12.data)

        const result13= await axios.post(`http://${mainUrl}/p27product/mytest`,{},myheader)
        console.log('p27product/mytest')
        console.log(result13.data)

        const result15= await axios.post(`http://${mainUrl}/p27basicdata/mytest`,{},myheader)
        console.log('p27basicdata/mytest')
        console.log(result15.data)

        const result14= await axios.post(`http://${mainUrl}/p27group/mytest`,{},myheader)
        console.log('p27group/mytest')
        console.log(result14.data)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()