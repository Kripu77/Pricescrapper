function removeValues(prods){

  return  data = prods.map((prod)=>{

    if(prod.includes("McCafÃ© -")){
        return  prod.replace("McCafÃ© -", "")
      }
     
        if(prod.includes("McCafÃ©")){
          return  prod.replace("McCafÃ©", "")
        }
        if(prod.includes("McCafe")){
            return prod.replace("McCafe", "")
        }
       
        else{
            return prod
        }
    })
    
}


module.exports={
    removeValues
}