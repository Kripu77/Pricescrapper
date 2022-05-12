


const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const filePath = `${path.resolve(__dirname, '../sourceFiles/StoreList.csv')}`;
const searchData = []
async function json (){
  const jsonArray = await csv().fromFile(filePath)
  // console.log( jsonArray);
searchData.push(...jsonArray)
}

json()

  





  module.exports = {searchData}


