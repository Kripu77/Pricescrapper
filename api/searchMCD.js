const {...loginJS} = require("./login.js"); 
console.log(loginJS)

describe("This case ensures all the products from the searchProd CSV file are entered and record the items", async()=>{

    // it("should execute the login script", async()=>{
    // return loginJS.loginJS();

    // })

it("should click on the search icon", async()=>{
    await browser.pause(3000);
    const search_icon = "~Search";

    await $(search_icon).click();

    //wait for 3s to see the result after click
    await browser.pause(1000);
})

it("should enter the product ", async () => {
    await browser.pause(1000);
    //this will select our input form email
    const selector =
      'new UiSelector().text("Search").className("android.widget.EditText")';
    const input = await $(`android=${selector}`);
    await input.setValue("bottled water");
    await driver.pressKeyCode(66);

    await browser.pause(1000);
  });

})