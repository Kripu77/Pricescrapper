const { loginJS } = require("./utils/login.js"); //refer to login.js module in this directory, it is used as module
const { searchProducts } = require("./sources/fileReader.js"); //contains JSON file for the products
const { searchData } = require("./sources/search.js"); //contains all the stores to be searched.
const { removeValues } = require("./utils/stringCleaner.js");
let itemName = []; //initial state to store searched products name
let itemPrice = []; //initial state to store the item price
let storeAddress = [];
let suburb = [];

//initial state of the array of objects which is used as a reference to write down the csv file
const compliedPrice = [
  {
    productName: "Products",
    price: "Price",
    CalorieInfo: "Caloire Info",
    storeFullAddress: "Full Address",
    subUrb: "Suburb",
  },
];

const timeStamp = new Date().toLocaleDateString().replaceAll("/", ""); //timestamp uID for stores

const fs = require("fs");
const { backBtn } = require("./utils/backBtnClicker"); //back button clicker module
const {
  changeLocation_checker,
  mealButton_checker,
  small_meal,
  large_meal,
  small_cafe,
  medium_cafe,
  large_cafe,
} = require("./utils/globalVar.js");

const unavailable = async (itemName, itemPrice) => {
  it("should check if the item is unavailable", async () => {
    const selector =
      'new UiSelector().text("Currently unavailable").className("android.widget.EditText")';

    const unavailable = await $(`android=${selector}`);

    (await $(unavailable).isExisting())
      ? [itemName.push("Unavailable in App"), itemPrice.push("NA")]
      : console.log("scrapped");

    await browser.pause(1000);
  });
};

describe("This case ensures all the products from the searchProd CSV file are entered and record the items", async () => {
  it("should execute the login script", async () => {
    return loginJS();
  });

  it("should click on the order", async () => {
    await browser.pause(5000);
    const order_icon = "~Order tab 2 of 5";
    await $(order_icon).click();

    await browser.pause(1000);
  });

  it("should click on cross button", async () => {
    const cancelBtn = "~Close";
    await $(cancelBtn).click();

    await browser.pause(3000);
  });

  describe("Netsted statement for looping over", async () => {
    it("should loop over the stores available", async () => {
      searchData.forEach((searchDataX) => {
        describe("Statement to execure the store input in a loop", async () => {
          it("should check if the change location button exits", async () => {
            describe("clause", async () => {
              it("should check if the change location button exits", async () => {
                // const changeLocation_checker = await browser.$(
                //   "id=com.mcdonalds.au.gma:id/location_or_address_text"
                // );
                //execute only if the change location button exist on the view port
                if (await browser.$(changeLocation_checker).isDisplayed()) {
                  await browser.$(changeLocation_checker).click();
                }

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
                await store_name.setValue(`${searchDataX.storeName}`);

                await driver.pressKeyCode(66); //From android docs refer to keyEvent Constant Value: 66 (0x00000042)
                await browser.pause(6000);
              });

              it("should click on the order here button", async () => {
                const order_selector =
                  'new UiSelector().text("Order Here").className("android.widget.TextView")';
                const order_btn = await $(`android=${order_selector}`);
                await order_btn.waitForDisplayed({ timeout: 30000 });
                const store_address = await browser
                  .$("id=com.mcdonalds.au.gma:id/store_address")
                  .getText();
                const store_city = await browser
                  .$("id=com.mcdonalds.au.gma:id/store_city")
                  .getText();
                storeAddress.push(`${store_address}`);
                suburb.push(`${store_city}`);

                await order_btn.click();
                //
                await browser.pause(6000);
              });
            });
          });

          describe('nested statements to run "it" cases loop for search products as the default behaviour of mocha is to ignore the async it callbacks in a loop', async () => {
            it("should search products in a loop// describe needs a it statement to execute//it case for forEach prod", async () => {
              searchProducts.forEach((searchProduct) => {
                describe("should click and supply the prods to the input field in a loop", async () => {
                  it("should click on the search icon", async () => {
                    await browser.pause(1000);
                    const search_icon = "~Search";
                    await $(search_icon).waitForDisplayed({ timeout: 30000 });

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

                    await browser.pause(2000); //alter this as per your local connection speed.
                  });

                  it("should get the product name and price in to the array", async () => {
                    await browser.pause(4000);
                    await unavailable(itemName, itemPrice);
                    const menu_listing = await browser
                      .$("id=com.mcdonalds.au.gma:id/product_title")
                      .getText();
                    const price_listing = await browser
                      .$("id=com.mcdonalds.au.gma:id/calorie_price_info")
                      .getText();
                    console.log(menu_listing);
                    console.log(price_listing);

                    itemName.push(menu_listing);
                    itemPrice.push(price_listing);
                  });

                  it("should click on the item searched", async () => {
                    const menu_clicker = await browser
                      .$$("id=com.mcdonalds.au.gma:id/product_title")[0]
                      .click(); //to ensure it clicks on the 1st menu item
                  });

                  it("should excute this if the make it a meal button exist and collect info of all the meal sizes example: S, R, L", async () => {
                    if (
                      await browser
                        .$(`android=${mealButton_checker}`)
                        .isExisting()
                    ) {
                      await browser.$(`android=${mealButton_checker}`).click();
                      await browser.pause(2000);

                      const meal_size = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_name")
                        .map((el) => {
                          return el.getText();
                        });

                      const meal_price = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_detailss")
                        .map((el) => {
                          return el.getText();
                        });

                      console.log(meal_size);
                      console.log(meal_price);

                      itemName.push(...meal_size);
                      itemPrice.push(...meal_price);

                      //click on small menu button
                      await browser.pause(1000);
                      await browser.$(`android=${small_meal}`).click();
                      const small_size = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_name")
                        .map((el) => {
                          return el.getText();
                        });

                      const small_price = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_detailss")
                        .map((el) => {
                          return el.getText();
                        });

                      itemName.push(...small_size);
                      itemPrice.push(...small_price);

                      //click on large meal
                      await browser.pause(1000);
                      await browser.$(`android=${large_meal}`).click();
                      const large_size = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_name")
                        .map((el) => {
                          return el.getText();
                        });

                      const large_price = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_detailss")
                        .map((el) => {
                          return el.getText();
                        });

                      itemName.push(...large_size);
                      itemPrice.push(...large_price);
                    }
                  });

                  it("should extract the title and price for mcCafe items", async () => {
                    if (
                      await browser.$(`android=${medium_cafe}`).isDisplayed()
                    ) {
                      //click on medium button
                        await browser.$(`android=${medium_cafe}`).click();
                      await browser.pause(1000);

                      const medium_cafe_drink = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_name")
                        .map((el) => {
                          return el.getText();
                        });

                      const medium_cafe_price = (await browser
                        .$("id=com.mcdonalds.au.gma:id/product_detailss")
                        .isExisting())
                        ? await browser
                            .$$("id=com.mcdonalds.au.gma:id/product_detailss")
                            .map((el) => {
                              return el.getText();
                            })
                        : await browser
                            .$$("id=com.mcdonalds.au.gma:id/product_details")
                            .map((el) => {
                              return el.getText();
                            });

                      itemName.push(...medium_cafe_drink);
                      itemPrice.push(...medium_cafe_price);

                      await browser.$(`android=${large_cafe}`).click();
                      await browser.pause(1000);

                      const large_cafe_drink = await browser
                        .$$("id=com.mcdonalds.au.gma:id/product_name")
                        .map((el) => {
                          return el.getText();
                        });

                      const large_cafe_price = (await browser
                        .$("id=com.mcdonalds.au.gma:id/product_detailss")
                        .isExisting())
                        ? await browser
                            .$$("id=com.mcdonalds.au.gma:id/product_detailss")
                            .map((el) => {
                              return el.getText();
                            })
                        : await browser
                            .$$("id=com.mcdonalds.au.gma:id/product_details")
                            .map((el) => {
                              return el.getText();
                            });

                      itemName.push(...large_cafe_drink);
                      itemPrice.push(...large_cafe_price);
                    }
                  });

                  it("should click on the cross icon", async () => {
                    await browser
                      .$("id=com.mcdonalds.au.gma:id/slide_back")
                      .click();
                  });

                  //click on the cross button

                  backBtn();
                });
              });

              describe("this test block contains the file writer", async () => {
                it("should complie the prod name and data into the array of objects and before its written down in the csv file", async () => {
                  await browser.pause(6000);

                  console.log(itemPrice);
                  //  itemPrice.map((data)=> itemPrice.push(data))

                  itemName = removeValues(itemName); //removes unnecessary string characters
                  console.log(itemName);
                  itemName.forEach((value, index) => {
                    console.log(itemPrice)
                    compliedPrice.push({
                      productName: itemName[index],
                      price: itemPrice[index].split(" ")[0],
                      CalorieInfo: `${  itemPrice.length > 6
                          ? itemPrice[index].split(" ")[2] + "kJ"
                          : "Not Available in App"
                      } `,
                      storeFullAddress:`${storeAddress[0]}` ,
                      subUrb: suburb[0],
                    });
                  });
                  console.log(compliedPrice);
                });

                it("should write the data", async () => {
                  // used sync file writer over async to fix up the mix up while writing proccess, use async is any concurrent task.
                  compliedPrice.map((value) => {
                    console.log(value.storeFullAddress)
                    fs.writeFileSync(
                      `./results/${searchDataX.storeName}_Product_Extract_${timeStamp}.csv`,
                      `"${value.storeFullAddress}", ${value.subUrb}, ${value.productName}, ${value.price}, ${value.CalorieInfo} \n`,
                      { flag: "a", encoding: "latin1" }
                    );
                  });

                  //to clean up the array as the state is storing older values, observered this implication while looping over
                  itemName = [];
                  itemPrice = [];
                  storeAddress = [];
                  suburb = [];

                  compliedPrice.splice(1, compliedPrice.length);
                });
              });
            });
          });
        });
      });
    });
  });
});
