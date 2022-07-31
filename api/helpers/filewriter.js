const fs = require("fs");
const path = require('path');
const folderPath = path.resolve(__dirname, "../../results")



//streams based file writer

let streamFileWriter = (timeStamp, searchDataX, source)=>{
  let writeStream = fs.createWriteStream(`${folderPath}/${searchDataX.storeName}_Product_Extract_${timeStamp}.csv`,
  { flags: "a", encoding: "latin1"});

source.map((value)=>{



//write the data with latin1 encoding
writeStream.write(`"${value.storeFullAddress}",${value.subUrb},${value.productName},${value.price},${value.CalorieInfo}\n`);



  
})

writeStream.on("finish", ()=>{
  console.log(`McDonald's ${searchDataX.storeName} has been scrapped and written in results directory. Check the file for full deatails`)
})

writeStream.end();
}


module.exports = {
  streamFileWriter
}