const{ loginJS }= require("./login.js"); //refer to login.js file in this directory, it is used as module 
const {searchProducts} = require("./fileReader.js"); //contains JSON file for the products
const {searchData} = require("./search.js"); //contains all the stores to be searched. 
const itemName = []; //initial state to store searched products name
const itemPrice =[]; //initial state to store the item price
const compliedPrice = [{
  productName: "Products", 
  price: "Price"
}]; //initial state of the array of objects which is used as a reference to write down the csv file

const timeStamp = new Date().toLocaleDateString().replaceAll("/", ""); //timestamp uID for stores

const fs = require('fs');
const {backBtn} = require('./backBtnClicker'); //back button clicker module



describe("This case ensures all the products from the searchProd CSV file are entered and record the items", async () => {



  it("should execute the login script", async () => {
   return loginJS();
  });

  it("should click on the order", async () => {

    await browser.pause(5000)
    const order_icon = "~Order tab 2 of 5";
    await $(order_icon).click();

    await browser.pause(1000);
  });

  it("should click on cross button", async () => {
    const cancelBtn = "~Close";
    await $(cancelBtn).click();

    await browser.pause(3000);
  });
  it("should check if the change location button exits", async()=>{
    const changeLocation  =
      'new UiSelector().text("Change Location").className("android.widget.TextView")';
    const changeLocation_checker = await $$(`android=${changeLocation}`);
    if(changeLocation_checker.length>0){
      await changeLocation_checker.click();
    }
    
    await browser.pause(3000);
  })

  it("should click on the search store btn", async () => {
    const searchBtn = "~Search icon";
    await $(searchBtn).click();

    await browser.pause(2000);
  });

  it("should enter the store name in the input field", async () => {
    const store_selector =
      'new UiSelector().text("Enter Suburb or Postcode").className("android.widget.EditText")';
    const store_name = await $(`android=${store_selector}`);
    await store_name.setValue(`${searchData[0].storeName}`);
   
    await driver.pressKeyCode(66); //From android docs refer to keyEvent Constant Value: 66 (0x00000042)
    await browser.pause(6000);
  });

  it("should click on the order here button", async () => {
    const order_selector =
      'new UiSelector().text("Order Here").className("android.widget.TextView")';
    const order_btn = await $(`android=${order_selector}`);
await order_btn.waitForDisplayed({timeout:30000});
  await order_btn.click();
    // 
    await browser.pause(6000);
  });
  describe('nested statement to "it" cases loop for search products', async()=>{

  

  it('should search products in a loop', async ()=>{



searchProducts.forEach((searchProduct)=>{



describe('should click supply the prods in a loop', async()=>{




  it("should click on the search icon", async () => {
    await browser.pause(3000);
    const search_icon = "~Search";
    await $(search_icon).waitForDisplayed({timeout:30000})

    await $(search_icon).click();

    //wait for 3s to see the result after click
    await browser.pause(1000);
  });

  it("should enter the product ", async () => {
    await browser.pause(1000);
    //this will select our input form email
    const selector =
      'new UiSelector().text("Search").className("android.widget.EditText")';
    const input = await $(`android=${selector}`);
    await input.setValue(`${searchProduct.searchProd}`);
    await driver.pressKeyCode(66);

    await browser.pause(1000);
  });

  it("should get the title and price of the item searched", async()=>{

 
      const menu_listing = await browser.$$('id=com.mcdonalds.au.gma:id/product_title').map((el)=>{
return el.getText()
      })
      const price_listing = await browser.$$('id=com.mcdonalds.au.gma:id/calorie_price_info').map((el)=>{
        return el.getText();
      })
   
    console.log(menu_listing)
    console.log(price_listing)

    itemName.push(...menu_listing)
    itemPrice.push(...price_listing)
    await browser.pause(6000);
  })


  

   backBtn();
  })
})
describe("this test block contains the file writer", async ()=>{
  it('should complie the prod name and data into the array of objects and before its written down in the csv file', async()=>{
  

    itemName.forEach((value, index)=>{
      compliedPrice.push({
        productName:itemName[index], 
        price : itemPrice[index]
      })
    })
  console.log(compliedPrice)
  })
  
  it('should write the data', async()=>{
    // used sync file writer over async to fix up the mix up while writing proccess
    compliedPrice.map((value)=>{
     fs.writeFileSync(`./results/${searchData[0].storeName}_${timeStamp}_Product_Extract.csv`, `${value.productName}, ${value.price}\n`, {flag:'a'})
       
         }) 
    }) 

})
})

})

});


