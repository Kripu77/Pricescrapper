// this file is the master CSV reader file, alter the store names in csv file as you require. 
let reader = async ()=>{

//ensure that file path is changed as your setup in your local machine
const csvFilePath='C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\\Documents\\GitHub\\Pricescrapper\\sourceFiles\\Store List.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
   
})
 

}

module.exports = {reader}
