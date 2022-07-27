// // // // const XLSX = require('xlsx')
// // // // const fs = require("fs")
// // // // // const ExcelJS = require('exceljs/dist/es5');
// // // // let Headers = ['Products'];
// // // // // let Data = ['INC1234', 'Multiple Cert cleanup', '04/07/2022', 'Enhancement', 'IlevelSupport'];


// // // // const data = [ 'Shakes, Frappes & Smoothies',
// // // //    'Coffee Frappé',
// // // //    '$4.85  2440 kJ ',
// // // //   'Chocolate Frappé',
// // // //    '$4.85  2470 kJ ',
// // // //    'Salted Caramel Frappé',
// // // //    '$4.85  2250 kJ ',
// // // //    'RMHC $1 Donation',
// // // //   '$1.00 ',
// // // //    'RMHC $2 Donation',
// // // //   '$2.00 ',
// // // //   'RMHC $10 Donation',
// // // //    '$10.00 ',
// // // //   ]
// // // // str = '1,23,4,5'
// // // // const datan = data.join(" | ")
// // // // console.log(datan)
// // // // const nsew = str.replaceAll(',' , '')

// // // // console.log(nsew)
// // // // //   async function test(){
// // // // //     const workbook = new ExcelJS.Workbook();
// // // // //     const sheet = workbook.addWorksheet('Family Menu');
  
// // // // // //     worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
  
// // // // // //     await workbook.xlsx.writeFile("filename");
  
// // // // // //   }
// // // // // // test()
  
// // // // // //   const numColumns = Headers.length;

// // // // // // let file = `${Headers.join(",")}\n`;
// // // // // // for (let i = 0; i < data.length; i += numColumns) {
// // // // // //   file += `${data.slice(i, i + numColumns).join(",")}\n`;
// // // // // // }

// // // // // // fs.writeFileSync("filexx.csv", file);
// // // // // // function dynamicChecker(data){
// // // // // //     const newD = data.filter((value, i)=>{
 
  
// // // // // //         return data[i] != "Order" && data[i] != "Home" && data[i] != "Rewards & Deals" && data[i] != "Code" && data[i] != "Featured" && data[i] != "More" 
// // // // // //         }) 
// // // // // //         console.log(newD)
        
// // // // // // }



  

// // // // // // console.log( data.push( dynamicChecker(data)))

// // // // // // const ws = XLSX.utils.json_to_sheet(data)
// // // // // // const wb = XLSX.utils.book_new()
// // // // // // XLSX.utils.book_append_sheet(wb, ws, 'Responses')
// // // // // // XLSX.writeFile(wb, 'sampleData.export.xlsx')

// // // // const {reader} = require("./fileReader.js"); //contains JSON file for the store list
// // // // const {file} = require("./search.js"); //contains all the products to be searched. 

// // // // // // const storeName = reader();
// // // // // // const searchProd = searchData();

// // // // // console.log(file)
// // // // // to deal with promise getting resolved early as we are using async function to push the json data

// // // // const {searchData} = require('./search.js')
// // // // const {searchProducts} = require('./fileReader.js')
// // // // setTimeout(()=>{
// // // //     console.log(searchData)
// // // //   },1000)

// // // //   setTimeout(()=>{
// // // //     console.log(searchProducts)
// // // //   },1000)

// const products = ['water', 'milk', 'pinespplr', 'spple'];
// const price = [3,5,6,8];

// const prod = [];

// products.forEach((value, index)=>{
// prod.push({
//   productName:products[index], 
//   price : price[index]
// })


// })

// console.log(prod)

// async function test(){
//   prod.splice(1, prod.length)
// }
// test();

// console.log(prod)
// // const {backBtn} = require('./backBtnClicker');
// // console.log(backBtn)


// // describe('test', async()=>{
    
// // })

// const path = require('path');



// console.log(path.resolve(__dirname, './api/searchMCD.js'))



const itemPrice = [ '$7.10  2360 kJ',
   '$12.10  2360 kJ',
   '$11.30  2360 kJ',
   '$12.90  2360 kJ']

// itemPrice.map((data)=> itemPrice.push(data))

const filtereData = itemPrice.map((data)=>{
console.log(data.length>5)
    return data.length>6?data.split(" ")[2]:"Not Available"

})
// console.log(itemPrice)

console.log(filtereData)