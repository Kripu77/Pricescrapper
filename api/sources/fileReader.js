//products in CSV JSON converter file

const fs = require('fs')
const csv = require('csvtojson')
const path = require('path')

const file = `${path.resolve(__dirname, '../../sourceFiles/searchProd.csv')}`;
const searchProducts= []
async function json (){
  const jsonArray = await csv().fromFile(file)
  // console.log( jsonArray);
searchProducts.push(...jsonArray)
}

json()






module.exports = {searchProducts}
