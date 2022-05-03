


const fs = require('fs')
const csv = require('csvtojson')

const URL_01 = `C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\\Documents\\GitHub\\Pricescrapper\\sourceFiles\\Store List.csv`;
const searchData = []
async function json (){
  const jsonArray = await csv().fromFile(URL_01)
  // console.log( jsonArray);
searchData.push(...jsonArray)
}

json()




  module.exports = {searchData}


