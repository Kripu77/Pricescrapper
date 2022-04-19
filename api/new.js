const XLSX = require('xlsx')
const fs = require("fs")
let Headers = ['Products'];
// let Data = ['INC1234', 'Multiple Cert cleanup', '04/07/2022', 'Enhancement', 'IlevelSupport'];


const data = [ 'Shakes, Frappes & Smoothies',
   'Coffee Frappé',
   '$4.85  2440 kJ ',
  'Chocolate Frappé',
   '$4.85  2470 kJ ',
   'Salted Caramel Frappé',
   '$4.85  2250 kJ ',
   'RMHC $1 Donation',
  '$1.00 ',
   'RMHC $2 Donation',
  '$2.00 ',
  'RMHC $10 Donation',
   '$10.00 ',
  ]



  const numColumns = Headers.length;

let file = `${Headers.join(",")}\n`;
for (let i = 0; i < data.length; i += numColumns) {
  file += `${data.slice(i, i + numColumns).join(",")}\n`;
}

fs.writeFileSync("filexx.csv", file);
// function dynamicChecker(data){
//     const newD = data.filter((value, i)=>{
 
  
//         return data[i] != "Order" && data[i] != "Home" && data[i] != "Rewards & Deals" && data[i] != "Code" && data[i] != "Featured" && data[i] != "More" 
//         }) 
//         console.log(newD)
        
// }



  

// console.log( data.push( dynamicChecker(data)))

const ws = XLSX.utils.json_to_sheet(data)
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, 'Responses')
XLSX.writeFile(wb, 'sampleData.export.xlsx')