const { loginJS } = require("./utils/login.js"); //refer to login.js module in this directory, it is used as module
const { searchProducts } = require("./sources/fileReader.js"); //contains JSON file for the products
const { searchData } = require("./sources/search.js"); //contains all the stores to be searched.
const { removeValues } = require("./utils/stringCleaner.js");
const { streamFileWriter } = require("../api/helpers/filewriter");
const {unavailable} = require("../api/utils/unavailable");

const timeStamp = new Date().toLocaleDateString().replaceAll("/", ""); //timestamp uID for stores

const { backBtn } = require("./utils/backBtnClicker"); //back button clicker module




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
    storeFullAddress: "Store Address",
    subUrb: "Suburb",
  },
];

const {
  changeLocation_checker,
  mealButton_checker,
  small_meal,
  large_meal,
  small_cafe,
  medium_cafe,
  large_cafe,
} = require("./utils/globalVar.js");



describe("This case ensures all the products from the searchProd CSV file are entered and record the items", async () => {
  it("should execute the login script", async () => {
    console.log("Logging the dummy user in");
    return loginJS();
  });

  it("should click on the order", async () => {
    console.log("Going to the ordering menu....");
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
      console.log(
        "Now, enter the desired store from the storeList csv file...."
      );
      searchData.forEach((searchDataX) => {
        describe("Statement to execure the store input in a loop", async () => {
          it("should check if the change location button exits", async () => {
            describe("clause", async () => {
              it("should check if the change location button exits", async () => {
                //execute only if the change location button exist on the view port
                if (await browser.$(changeLocation_checker).isDisplayed()) {
                  await browser.$(changeLocation_checker).click();
                }

                await browser.pause(3000);
              });

              it("should click on the search store btn", async () => {
                const searchBtn = "id=com.mcdonalds.au.gma:id/toolbar_search";
                await browser.$(searchBtn).click();

                await browser.pause(2000);
              });

              it("should enter the store name in the input field", async () => {
                console.log(
                  "Now, start searching store from the searchStore.csv file...."
                );
                const store_selector ='id=com.mcdonalds.au.gma:id/search_text';
                const store_name = await browser.$(store_selector);
                await store_name.setValue(`${searchDataX.storeName}`);

                await driver.pressKeyCode(66); //From android docs refer to keyEvent Constant Value: 66 (0x00000042)
                await browser.pause(6000);
              });

              it("should click on the order here button", async () => {
                console.log("Wait until the Order Here button is present....");
                const order_selector =
                  'id=com.mcdonalds.au.gma:id/store_order_here';
                const order_btn = await browser.$(order_selector);
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
                    const search_icon = "id=com.mcdonalds.au.gma:id/order_wall_header_search_icon";
                    await browser.$(search_icon).waitForDisplayed({ timeout: 30000 });

                    await $(search_icon).click();

                    //wait for 3s to see the result after click
                    await browser.pause(1000);
                  });

                  it("should enter the product ", async () => {
                    await browser.pause(1000);
                    //this will select our input form email
                    const selector =
                      'id=com.mcdonalds.au.gma:id/store_info_search_text';
                    const input = await browser.$(selector);
                    await input.setValue(`${searchProduct.searchProd}`);
                    await driver.pressKeyCode(66);

                    await browser.pause(2000); //alter this as per your local connection speed.
                  });

                 

                  it("should get the product name and price in to the array", async () => {
                    await browser.pause(4000);
                  
                    const menu_listing = await browser
                      .$("id=com.mcdonalds.au.gma:id/product_title")
                      .getText();
                    const price_listing = await browser
                      .$("id=com.mcdonalds.au.gma:id/calorie_price_info")
                      .getText();

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

                      itemName.push(...meal_size);
                      itemPrice.push(...meal_price);

                      //click on small menu button
                      await browser.pause(2000);
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
                      await browser.pause(2000);
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
                      await browser.pause(2000);

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
                      await browser.pause(2000);

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

                  //  itemPrice.map((data)=> itemPrice.push(data))

                  itemName = removeValues(itemName); //removes unnecessary string characters

                  itemName.forEach((value, index) => {
                    compliedPrice.push({
                      productName: itemName[index],
                      price: itemPrice[index].split(" ")[0],
                      CalorieInfo: `${
                        itemPrice.length > 6
                          ? itemPrice[index].split(" ")[2] + "kJ"
                          : "Not Available in App"
                      } `,
                      storeFullAddress: `${storeAddress[0]}`,
                      subUrb: suburb[0],
                    });
                  });
                  console.log(compliedPrice);
                });

                it("should write the data", async () => {
                  // used sync file writer over async to fix up the mix up while writing proccess, use async is any concurrent task.

                  streamFileWriter(timeStamp, searchDataX, compliedPrice);

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
