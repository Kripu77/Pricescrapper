
const fs = require('fs')
const csv = require('csvtojson')

const path = `C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\\Documents\\GitHub\\Pricescrapper\\sourceFiles\\searchProd.csv`;
const searchProducts= []
async function json (){
  const jsonArray = await csv().fromFile(path)
  // console.log( jsonArray);
searchProducts.push(...jsonArray)
}

json()




module.exports = {searchProducts}
