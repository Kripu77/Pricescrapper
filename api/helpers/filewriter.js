let writer = 

    
    it('should write the data', async()=>{
        compliedPrice.map((value)=>{
         fs.writeFile(`./results/${searchData[0].storeName}_Product_Extract.csv`, `${value.productName}, ${value.price}\n`, {flag:'a'}, (err, result)=>{
           if(err) throw err;
               })
           
             }) 
        }) 
  


module.exports={writer}