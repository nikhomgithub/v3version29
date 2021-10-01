const  axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
 mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}
const init = {shopName:"shopa",confirm_password:"server_29"}


const updateTemplate={
            tableName: 'productTableTemplate',
            template: [
                    {
                        _id: '60f7d935e106560013727c3f',
                        colName: 'selectedLine',
                        lb: '_',
                        type: 'radio',
                        width: '40',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c40',
                        colName: 'id',
                        lb: 'ID',
                        type: 'number',
                        width: '65',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c41',
                        colName: 'barcode',
                        lb: 'บาร์โคด',
                        type: 'string',
                        width: '400',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c42',
                        colName: 'name',
                        lb: 'ชื่อ',
                        type: 'string',
                        width: '312',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c43',
                        colName: 'groupId',
                        lb: 'ไอดีกลุ่ม',
                        type: 'number',
                        width: '40',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c44',
                        colName: 'groupName',
                        lb: 'ชื่อกลุ่ม',
                        type: 'string',
                        width: '60',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c45',
                        colName: 'unit',
                        lb: 'หน่วย',
                        type: 'string',
                        width: '40',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c46',
                        colName: 'price',
                        lb: 'ราคา',
                        type: 'number',
                        width: '60',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c47',
                        colName: 'isRawMat',
                        lb: 'เป็นวัตถุดิบ',
                        type: 'boolean',
                        width: '60',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c48',
                        colName: 'stock',
                        lb: 'ยอดสต็อค',
                        type: 'number',
                        width: '60',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c49',
                        colName: 'order',
                        lb: 'ยอดจอง',
                        type: 'number',
                        width: '60',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c4a',
                        colName: 'plan',
                        lb: 'ยอดแผน',
                        type: 'number',
                        width: '60',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c4b',
                        colName: 'remark',
                        lb: 'หมายเหตุ',
                        type: 'string',
                        width: '200',
                        showCol: true,
                        showColHead: true
                    },
                    {
                        _id: '60f7d935e106560013727c4c',
                        colName: 'photoUrl1',
                        lb: 'รูป',
                        type: 'arrayPhoto',
                        width: '200',
                        showCol: true,
                        showColHead: true
                    }
            ]
}


const tableName={"tableName":"productTableTemplate"}

 getStart=async()=>{

    try {
        let result1= await axios.post(`http://${mainUrl}/p29tabletemplate/init`,init,myheader)
        console.log('p29tabletemplate/init')
        console.log(result1.data)


        /*
        const result1= await axios.post(`http://${mainUrl}/p29shop/shoplogin`,shoplogin,myheader)
        console.log('p29shop/shoplogin')
        console.log(result1.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`http://${mainUrl}/p29user/login`,userlogin,myheader1)
        console.log('p29user/login')
        console.log(result2.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}}


        //const result3= await axios.post(`http://${mainUrl}/p29tabletemplate/updatetabletemplate`,
        //updateTemplate,myheader2)


        const result4= await axios.post(`http://${mainUrl}/p29tabletemplate/getcustom`,
                        {},myheader2)
        console.log('p29tabletemplate/getcustom')
        console.log('productTableTemplate')
        console.log(result4.data.data[0])

        console.log(result4.data.data[1])
        console.log(result4.data.data[2])
        console.log(result4.data.data[3])

        console.log(result4.data.data[4])
        console.log(result4.data.data[5])
        console.log(result4.data.data[6])

        console.log(result4.data.data[7])

        */
        //console.log('productDetailTableTemplate')
        
        
        //console.log(result4.data.data[2])
        //console.log(result4.data.data[1].template[2])
        //console.log(result4.data.data[0].template[2])

        //http://localhost/p29tabletemplate/getcustom
        //const result2= await axios.post(`http://${mainUrl}/p29use/login`,userlogin,myheader1)

    }
    catch (err){
        console.log(err)
    }
}

console.log('p29job')
getStart()