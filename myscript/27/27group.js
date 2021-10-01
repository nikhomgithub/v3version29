const axios = require('axios')
let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shoplogin = {shopName:"shopa",password:"shopa"}
const userlogin = {username:"usera",password:"usera"}

const init = {shopName:"shopa",confirm_password:"server_27"}


const group2 = { "id": 2, "mainGroup": 2, "groupName": "two", "parentId": 1, "children": [], "parentGroup": [1] ,"shopId":"shopa"}
const group3 = { "id": 3, "mainGroup": 3, "groupName": "three", "parentId": 1, "children": [], "parentGroup": [1] ,"shopId":"shopa"}
const group4 = { "id": 4, "mainGroup": 4, "groupName": "four", "parentId": 1, "children": [], "parentGroup": [1] ,"shopId":"shopa"}


const group5 = { "id": 5, "mainGroup": 2, "groupName": "five", "parentId": 2, "children": [], "parentGroup": [1,2] ,"shopId":"shopa"}
const group6 = { "id": 6, "mainGroup": 2, "groupName": "six", "parentId": 5, "children": [], "parentGroup": [1,2,5] ,"shopId":"shopa"}
const group7 = { "id": 7, "mainGroup": 3, "groupName": "seven", "parentId": 3, "children": [], "parentGroup": [1,3] ,"shopId":"shopa"}
const group8 = { "id": 8, "mainGroup": 3, "groupName": "eight", "parentId": 7, "children": [], "parentGroup": [1,3,7] ,"shopId":"shopa"}
const group9 = { "id": 9, "mainGroup": 3, "groupName": "nine", "parentId": 3, "children": [], "parentGroup": [1,3] ,"shopId":"shopa"}

const group10 = { "id": 10, "mainGroup": 2, "groupName": "ten", "parentId": 2, "children": [], "parentGroup": [1,2] ,"shopId":"shopa"}
const group11 = { "id": 11, "mainGroup": 4, "groupName": "eleven", "parentId": 4, "children": [], "parentGroup": [1,4] ,"shopId":"shopa"}

const group12 = { "id": 12, "mainGroup": 2, "groupName": "twelve", "parentId": 5, "children": [], "parentGroup": [1,2,5] ,"shopId":"shopa"}
const group13 = { "id": 13, "mainGroup": 13, "groupName": "thirteen", "parentId": 1, "children": [], "parentGroup": [1] }



const getStart=async()=>{

    try {
        const result1= await axios.post(`http://${mainUrl}/p27shop/shoplogin`,shoplogin,myheader)
        console.log('p27shop/shoplogin')
        console.log(result1.data)

        const myheader1={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`}}
    
        const result2= await axios.post(`http://${mainUrl}/p27user/login`,userlogin,myheader1)
        console.log('p27user/login')
        console.log(result2.data)

        const myheader2={ headers: {'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}}


        let result= await axios.post(`http://${mainUrl}/p27group/init`,init,myheader)
        console.log('p27group/init')
        console.log(result.data)


        await axios.post(`http://${mainUrl}/p27group/addgroup`,group2,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group3,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group4,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group13,myheader2)   

        await axios.post(`http://${mainUrl}/p27group/addgroup`,group5,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group10,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group7,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group9,myheader2)


        await axios.post(`http://${mainUrl}/p27group/addgroup`,group11,myheader2)


        await axios.post(`http://${mainUrl}/p27group/addgroup`,group6,myheader2)
        await axios.post(`http://${mainUrl}/p27group/addgroup`,group12,myheader2)   

        await axios.post(`http://${mainUrl}/p27group/addgroup`,group8,myheader2)



        result= await axios.post(`http://${mainUrl}/p27group/getcustom`,{},myheader2)
        console.log('p27group/getcustom')
        console.log(result.data)

      
    }
    catch (err){
        console.log(err)
    }
}

console.log('p27job')
getStart()