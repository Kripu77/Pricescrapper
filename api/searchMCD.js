const{ loginJS }= require("./login.js"); //refer to login.js file in this directory, it is used as module 
const {searchProducts} = require("./fileReader.js"); //contains JSON file for the store list
const {searchData} = require("./search.js"); //contains all the products to be searched. 
const itemName = [];
const itemPrice =[];

const fs = require('fs');


describe("This case ensures all the products from the searchProd CSV file are entered and record the items", async () => {



  it("should execute the login script", async () => {
   return loginJS();
  });

  it("should click on the order", async () => {

    browser.pause(5000)
    const order_icon = "~Order tab 2 of 5";
    await $(order_icon).click();

    await browser.pause(1000);
  });

  it("should click on cross button", async () => {
    const cancelBtn = "~Close";
    await $(cancelBtn).click();

    await browser.pause(3000);
  });

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
    await order_btn.click();
    await browser.pause(6000);
  });




  it("should click on the search icon", async () => {
    await browser.pause(3000);
    const search_icon = "~Search";

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
    await input.setValue(`${searchProducts[0].searchProd}`);
    await driver.pressKeyCode(66);

    await browser.pause(1000);
  });

  it("should get the title and price of the item searched", async()=>{

  //  const menu_listing = await browser
  //     .$("id:product_title;").click();
      //   return el.getText();
      // });
      const menu_listing = await browser.$('id=com.mcdonalds.au.gma:id/product_title');
    // familyMenu.push(menu_listing);
    // console.log(menu_listing);
    console.log(menu_listing.getText())

    itemName.push(menu_listing.getText())
    await browser.pause(6000);
  })
});


fs.writeFile('./results/test.csv', itemName, (err, res)=>{
if(err){
  console.log(err)
}
})