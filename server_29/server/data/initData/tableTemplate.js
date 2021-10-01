
const commonProduct={
  selectedLine           :
  { lb:'_',     type:"radio",
    width:40,   showCol:true,  showColHead:true,    
  },
  id            :
    { lb:'ID',     type:"number",
      width:65,   showCol:true,  showColHead:true,    
    },
  barcode           :
    { lb:'บาร์โคด',type:"string",
      width:65,   showCol:true,  showColHead:true,    
    },
  productName      :
    { lb:'ชื่อ',type:"string",
      width:100,   showCol:true,  showColHead:true,      
    },
  groupId      :
    { lb:'ไอดีกลุ่ม',type:"number",
      width:70,   showCol:true,  showColHead:true,      
    },  
  groupName      :
    { lb:'ชื่อกลุ่ม',type:"string",
      width:60,   showCol:true,  showColHead:true,      
    }, 
  unit      :
    { lb:'หน่วย',type:"string",
      width:40,   showCol:true,  showColHead:true,      
    },
  price     :
    { lb:'ราคา',     type:"number",
      width:60,   showCol:true,  showColHead:true,    
    },
}

const productTableTemplate={
...commonProduct,
isRawMat      :
  { lb:'เป็นวัตถุดิบ',type:"boolean",
    width:100,   showCol:true,  showColHead:true,      
  },   
stock      :
  { lb:'ยอดสต็อค',type:"number",
    width:60,   showCol:true,  showColHead:true,      
  },   
order      :
  { lb:'ยอดจอง',type:"number",
    width:60,   showCol:true,  showColHead:true,      
  },   
plan      :
  { lb:'ยอดแผน',type:"number",
    width:60,   showCol:true,  showColHead:true,      
  },
remark      :
  { lb:'หมายเหตุ',type:"string",
    width:200,   showCol:true,  showColHead:true,      
  },  
photoUrl1      :
  { lb:'รูป',type:"arrayPhoto",
    width:200,   showCol:true,  showColHead:true,
  },
}


const partnerTableTemplate={
selectedLine           :
{ lb:'_',     type:"radio",
  width:40,   showCol:true,  showColHead:true,    
},
id            :
{ lb:'ID',     type:"number",
  width:40,   showCol:true,  showColHead:true,    
},
title           :
{ lb:'คำนำหน้า',type:"string",
  width:60,   showCol:true,  showColHead:true,    
},
name      :
{ lb:'ชื่อ',type:"string",
  width:100,   showCol:true,  showColHead:true,      
},
phone         :
{ lb:'โทรศัพท์', type:"array",
  width:120,   showCol:true,  showColHead:true,      
},
partnerType      :
{ lb:'ประเภทคู่ค้า',type:"string",
  width:70,   showCol:true,  showColHead:true,      
},    
address       :
{ lb:'ที่อยู่',type:"arrayObject",
  width:200,   showCol:true,  showColHead:true,
  children:{
      number:{lb:"เลขที่"},
      tambon:{lb:"ตำบล"},
      district:{lb:"อำเภอ"},
      province:{lb:"จังหวัด"},
      postcode:{lb:"รหัสไปรษณีย์"}
  }
},
remark      :
{ lb:'หมายเหตุ',type:"string",
  width:200,   showCol:true,  showColHead:true,      
},  
photoUrl1      :
{ lb:'รูป',type:"arrayPhoto",
  width:200,   showCol:true,  showColHead:true,
},

}
//============================
//============================
const commonTransaction={
selectedLine           :
  { lb:'_',     type:"radio",
    width:40,   showCol:true,  showColHead:true,    
  }, 
id            :
  { lb:'ID',     type:"number",
    width:40,   showCol:true,  showColHead:true,    
  },
date           :
  { lb:'วันที่',type:"date",
  width: 90,   showCol:true,  showColHead:true,    
  }, 
remindDate           :
  { lb:'วันที่เตือน',type:"date",
  width: 90,   showCol:true,  showColHead:true,    
  }, 
branch          :
  { lb:'สาขา',type:"string",
    width:60,   showCol:true,  showColHead:true,    
  },


transactionName      :
  { lb:'ชื่อเอกสาร',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },
transactionType      :
  { lb:'ประเภทเอกสาร',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },
transactionStatus      :
  { lb:'สถานะเอกสาร',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },
active      :
  { lb:'แอคทีฟ',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },

/////////////////////////////////////////////
effectStock      :
  { lb:'กระทบสต็อก',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },
effectOrder      :
  { lb:'กระทบจอง',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },
effectPlan      :
  { lb:'กระทบแผน',type:"string",
    width:80,   showCol:true,  showColHead:true,      
  },


partnerId      :
  { lb:'ไอดีคู่ค้า',type:"number",
    width:60,   showCol:true,  showColHead:true,      
  },  
partnerType      :
  { lb:'ประเภทคู่ค้า',type:"number",
    width:60,   showCol:true,  showColHead:true,      
  },  


title          :
  { lb:'คำนำหน้า',type:"string",
    width:60,   showCol:true,  showColHead:true,    
  },
name      :
  { lb:'ชื่อ',type:"string",
    width:100,   showCol:true,  showColHead:true,      
  },


}
//============================
//============================
const transactionTableTemplate={
...commonTransaction,

total            :
{ lb:'รวม',     type:"number",
  width:70,   showCol:true,  showColHead:true,showSum:true     
},
reduction           :
{ lb:'ส่วนลด',     type:"number",
  width:70,   showCol:true,  showColHead:true, showSum:true   
},
grandTotal            :
{ lb:'สุทธิ',     type:"number",
  width:80,   showCol:true,  showColHead:true, showSum:true    
},


phone         :
{ lb:'โทรศัพท์', type:"array",
  width:110,   showCol:true,  showColHead:true,      
}, 
address       :
{ lb:'ที่อยู่',type:"object",
  width:200,   showCol:true,  showColHead:true,
  children:{
      number:{lb:"เลขที่"},
      tambon:{lb:"ตำบล"},
      district:{lb:"อำเภอ"},
      province:{lb:"จังหวัด"},
      postcode:{lb:"รหัสไปรษณีย์"}
  }
},
remark      :
{ lb:'หมายเหตุ',type:"string",
  width:200,   showCol:true,  showColHead:true,      
},  
photoUrl1      :
{ lb:'รูป',type:"arrayPhoto",
  width:200,   showCol:true,  showColHead:true,
},
}

const transactionLogTableTemplate={
status          :
{ lb:'สถานะ',type:"string",
  width:60,   showCol:true,  showColHead:true,    
},
...transactionTableTemplate
}

const transactionLogWithDetailTemplate={
...transactionLogTableTemplate,
}

//======================
const transactionGraphTableTemplate={
status          :
{ lb:'สถานะ',type:"string",
width:60,   showCol:true,  showColHead:true,    
},
...commonTransaction,
total            :
{ lb:'รวม',     type:"number",
width:70,   showCol:true,  showColHead:true,showSum:true     
},
reduction           :
{ lb:'ส่วนลด',     type:"number",
  width:70,   showCol:true,  showColHead:true, showSum:true   
},
grandTotal            :
{ lb:'สุทธิ',     type:"number",
  width:80,   showCol:true,  showColHead:true, showSum:true    
},

}

const transactionWiDetailGraphTableTemplate={
detail_id:commonProduct.id,
detail_barcode:commonProduct.barcode,
detail_name:commonProduct.name,
detail_groupId:commonProduct.groupId,
detail_groupName:commonProduct.groupName,
detail_unit:commonProduct.unit,
detail_price:commonProduct.price,
detail_quantity:
{ lb:'จำนวน',type:"number",
  width:60,   showCol:true,  showColHead:true, showSum:true     
},
detail_result:  
{ lb:'รวม',type:"number",
  width:90,   showCol:true,  showColHead:true, showSum:true     
},
...commonTransaction
}
//======================
const productDetailTableTemplate={
selectedLine :{ lb:'_',     type:"radio",width:40,   showCol:true,  showColHead:true},  
//icon: {lb: "",type: "icon", width: 60, showCol: true, showColHead: true},
id: {lb: "ไอดี",type: "number", width: 60, showCol: true, showColHead: true},
barcode: { lb: "บาร์โค้ด",type: "string", width: 100, showCol: true, showColHead: true},
productName: {lb: "ชื่อ",type: "string", width: 240, showCol: true, showColHead: true},

groupId: {lb: "ไอดีกลุ่ม",type: "number", width: 60, showCol: true, showColHead: true },
groupName: {lb: "ชื่อกลุ่ม",type: "string", width: 90, showCol: true, showColHead: true},

quantity: {lb: "จำนวน",type: "number", width: 60, showCol: true, showColHead: true,showSum:true},
unit: {lb: "หน่วย",type: "string", width: 80, showCol: true, showColHead: true},
price: {lb: "ราคา",type: "number", width: 100, showCol: true, showColHead: true},
result: {lb: "รวม",type: "number", width: 100, showCol: true, showColHead: true,showSum:true},
isRawMat: { lb: "เป็นวัตถุดิบ",type: "boolean", width: 40, showCol: true, showColHead: true},
remark: {lb: "หมายเหตุ",type: "string", width: 200, showCol: true, showColHead: true},

photoUrl1      :
  { lb:'รูป',type:"arrayPhoto",
    width:200,   showCol:true,  showColHead:true,
  },
}

const productDetailTableTemplateForForm={
  selectedLine :{ lb:'_',     type:"radio",width:40,   showCol:true,  showColHead:true},  
  //icon: {lb: "",type: "icon", width: 60, showCol: true, showColHead: true},
  id: {lb: "ไอดี",type: "number", width: 60, showCol: true, showColHead: true},
  barcode: { lb: "บาร์โค้ด",type: "string", width: 100, showCol: true, showColHead: true},
  productName: {lb: "ชื่อ",type: "string", width: 240, showCol: true, showColHead: true},

  groupId: {lb: "ไอดีกลุ่ม",type: "number", width: 60, showCol: true, showColHead: true },
  groupName: {lb: "ชื่อกลุ่ม",type: "string", width: 90, showCol: true, showColHead: true},

  quantity: {lb: "จำนวน",type: "number", width: 60, showCol: true, showColHead: true},
  unit: {lb: "หน่วย",type: "string", width: 80, showCol: true, showColHead: true},
  price: {lb: "ราคา",type: "price", width: 100, showCol: true, showColHead: true},
  result: {lb: "รวม",type: "number", width: 100, showCol: true, showColHead: true},
  isRawMat: { lb: "เป็นวัตถุดิบ",type: "boolean", width: 40, showCol: true, showColHead: true},
  remark: {lb: "หมายเหตุ",type: "string", width: 200, showCol: true, showColHead: true},

  partnerId:{ lb:'ไอดีคู่ค้า',type:"number",width:60,   showCol:true,  showColHead:true},  
  name:{ lb:'ชื่อ',type:"string",width:100,   showCol:true,  showColHead:true},

  photoUrl1      :
  { lb:'รูป',type:"arrayPhoto",
    width:200,   showCol:true,  showColHead:true,
  },
}

const basicDataTableTemplate={
id            :
{ lb:'ไอดี',     type:"number",
  width:50,   showCol:true,  showColHead:true,    
},
routeAddress            :
{ lb:'url',     type:"string",
  width:200,   showCol:true,  showColHead:true,    
},
routeName           :
{ lb:'ชื่อสิทธิ์',type:"string",
  width:100,   showCol:true,  showColHead:true,    
},
userLevel           :
{ lb:'กลุ่มผู้มีสิทธิ์',type:"array",
  width:350,   showCol:true,  showColHead:true,    
},

}

const tableTemplate = {
basicDataTableTemplate,
productTableTemplate,
productDetailTableTemplate,
productDetailTableTemplateForForm,
partnerTableTemplate,

transactionTableTemplate,
transactionLogTableTemplate,
//transactionGraphTableTemplate,
//transactionWiDetailGraphTableTemplate
}

module.exports = tableTemplate
