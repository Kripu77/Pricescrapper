const value = [
     'OREO® McFlurry',
     'McCafé - Latte',
     'Medium Latté McCafe',
     'Large Latté McCafe',
     'McCafé - Mocha',
     'Medium Mocha McCafe',
     'Large Mocha McCafe',
     'McCafé - Iced Latte',
     'Medium Iced Latté McCafé',
     'Large Iced Latté McCafé',
   'McCafé - Iced Mocha',
     'Medium Iced Mocha McCafé',
     'Large Iced Mocha McCafé',
     'Bacon & Egg McMuffin',
     'Bacon & Egg McMuffin Meal',
     'Sausage & Egg McMuffin',
     'Sausage & Egg McMuffin Meal'
   ]

  


function removeValues(prods){

  let data = prods.map((prod)=>{

    if(prod.includes("McCafÃ© -")){
        return  prod.replace("McCafÃ© -", "")
      }
     
        if(prod.includes("McCafÃ©")){
          return  prod.replace("McCafÃ©", "")
        }
        if(prod.includes("McCafe")){
            return prod.replace("McCafe", "")
        }
        if(prod.includes("McCafé -")){
          return prod.replace("McCafé -", "")
        }
        if(prod.includes("McCafé")){
          return prod.replace("McCafé", "")
        }
        else{
            return prod
        }

        
    })
    return data;
    
}




module.exports={
    removeValues
}