const { default: $$ } = require("webdriverio/build/commands/browser/$$");
const familyMenu = [];
const chickenMenu = [];
const happyMeal = [];
const mcNuggets = [];
const beef = [];
const wraps = [];
const eBreakfast = [];
const hotDrinks = [];
const desserts = [];
const snacks = [];
const softDrinks = [];
const shakes = [];
const juice = [];
const sauce = [];

const store = require("./fileReader.js"); //contains JSON file for the store list

describe("Click on the Log In Button", async () => {
  //login test case
  it("Should click on the login button", async () => {
    await browser.pause(3000);
    const LOGIN_BUTTON = "~Log in";

    await $(LOGIN_BUTTON).click();

    //wait for 3s to see the result after click
    await browser.pause(1000);
  });

  it("should enter the email address ", async () => {
    await browser.pause(1000);
    //this will select our input form email
    const selector =
      'new UiSelector().text("Email").className("android.widget.EditText")';
    const input = await $(`android=${selector}`);
    await input.setValue("JohnathonCarter88@cfal.com.au");

    await browser.pause(1000);
  });
  //enters the dummy user
  it("should enter the password", async () => {
    const selector_two =
      'new UiSelector().text("Password").className("android.widget.EditText")';
    const password = await $(`android=${selector_two}`);
    await password.setValue("Tomato43");

    await browser.pause(1000);
  });
  //click on the sigin in button once its enabled
  it("should click on the sign in button", async () => {
    const sign_in = "~Sign In Button";
    await $(sign_in).click();

    await browser.pause(3000);
  });

  it("should click on the order", async () => {
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
    await store_name.setValue("Kings Cross");
    
    await driver.pressKeyCode(66); //From android docs refer to keyEvent Constant Value: 66 (0x00000042)
  });

  it("should click on the order here button", async () => {
     await browser.pause(6000);
    const order_selector =
      'new UiSelector().text("Order Here").className("android.widget.TextView")';
    const order_btn = await $(`android=${order_selector}`);
    await order_btn.click();
    await browser.pause(6000);
  });

  it("should click on Family or Sharing Menu", async () => {
    const fam_selector =
      'new UiSelector().text("Family & Sharing").className("android.widget.TextView")';
    const fammenu_btn = await $(`android=${fam_selector}`);
    await fammenu_btn.click();
    await browser.pause(3000);
  });

  it("should return all the menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const menu_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    familyMenu.push(menu_listing);
    console.log(familyMenu);
    await browser.pause(6000);
  });

  const backBtn = () => {
    it("should click on back button", async () => {
      const backBtn = "~Back";
      await $(backBtn).click();

      await browser.pause(13000);
    });
  };
  backBtn();

  it("should scroll on to the Chicken and Fish Meal menu", async () => {
    const chickenmenu_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Chicken & Fish"))`;
    const chickenmenu_btn = await $(`android=${chickenmenu_selector}`);
    await chickenmenu_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on chicken and fish Menu", async () => {
    const chickenmenu_selector =
      'new UiSelector().text("Chicken & Fish").className("android.widget.TextView")';
    const chickenmenu_btn = await $(`android=${chickenmenu_selector}`);
    await chickenmenu_btn.click();
    await browser.pause(3000);
  });

  it("should return all the chicken menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const chickenmenu_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText() ;
      });
    chickenMenu.push({...chickenmenu_listing});
    console.log(chickenMenu);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the Happy Meal menu", async () => {
    const happyMeal_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Happy Meals"))`;
    const happymenu_btn = await $(`android=${happyMeal_selector}`);
    await happymenu_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on Happy Meal Menu", async () => {
    const happyMeal_selector =
      'new UiSelector().text("Happy Meals").className("android.widget.TextView")';
    const happymenu_btn = await $(`android=${happyMeal_selector}`);
    await happymenu_btn.click();
    await browser.pause(3000);
  });

  it("should return all the happy meal menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const happymenu_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    happyMeal.push(...happymenu_listing);
    console.log(happyMeal);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the chicken mcnuggets menu", async () => {
    const nuggets_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Chicken McNuggets"))`;
    const nuggets_btn = await $(`android=${nuggets_selector}`);
    await nuggets_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on mcnuggtes Menu", async () => {
    const nuggets_selector =
      'new UiSelector().text("Chicken McNuggets").className("android.widget.TextView")';
    const nuggets_btn = await $(`android=${nuggets_selector}`);
    await nuggets_btn.click();
    await browser.pause(3000);
  });

  it("should return all the chicken nuggets menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const nuggets_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    mcNuggets.push(...nuggets_listing);
    console.log(mcNuggets);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the beef menu", async () => {
    const beef_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Beef"))`;
    const beef_btn = await $(`android=${beef_selector}`);
    await beef_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on the beef Menu", async () => {
    const beef_selector =
      'new UiSelector().text("Beef").className("android.widget.TextView")';
    const beef_btn = await $(`android=${beef_selector}`);
    await beef_btn.click();
    await browser.pause(3000);
  });

  it("should return all the beefmeal menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const beef_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    beef.push(...beef_listing);
    console.log(beef);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the Wraps and Salads menu", async () => {
    const wraps_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Wraps & Salads"))`;
    const w_btn = await $(`android=${wraps_selector}`);
    await w_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on Wraps Menu", async () => {
    const wraps_selector =
      'new UiSelector().text("Wraps & Salads").className("android.widget.TextView")';
    const wraps_btn = await $(`android=${wraps_selector}`);
    await wraps_btn.click();
    await browser.pause(3000);
  });

  it("should return all the wraps and salads meal menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const wraps_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    wraps.push(...wraps_listing);
    console.log(wraps);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the Breakfast menu", async () => {
    const brekky_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Extended Breakfast"))`;
    const brekky_btn = await $(`android=${brekky_selector}`);
    await brekky_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on the extended breakfast Menu", async () => {
    const brekky_selector =
      'new UiSelector().text("Extended Breakfast").className("android.widget.TextView")';
    const brekky_btn = await $(`android=${brekky_selector}`);
    await brekky_btn.click();
    await browser.pause(3000);
  });

  it("should return all the breakfast meal menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const brekky_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    eBreakfast.push(...brekky_listing);
    console.log(eBreakfast);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the mcCafe Drinks menu", async () => {
    const drinks_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("McCafe Drinks"))`;
    const drinks_btn = await $(`android=${drinks_selector}`);
    await drinks_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on mccfae drinks Menu", async () => {
    const drinks_selector =
      'new UiSelector().text("McCafe Drinks").className("android.widget.TextView")';
    const drinks_btn = await $(`android=${drinks_selector}`);
    await drinks_btn.click();
    await browser.pause(3000);
  });

  it("should return all the mcCafe drink menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const mcCafe_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    hotDrinks.push(...mcCafe_listing);
    console.log(hotDrinks);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the desserts menu", async () => {
    const dessert_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Desserts"))`;
    const dessert_btn = await $(`android=${dessert_selector}`);
    await dessert_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on Dessert Menu", async () => {
    const dessert_selector =
      'new UiSelector().text("Desserts").className("android.widget.TextView")';
    const dessert_btn = await $(`android=${dessert_selector}`);
    await dessert_btn.click();
    await browser.pause(3000);
  });

  it("should return all the Dessert menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const dessert_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    desserts.push(...dessert_listing);
    console.log(desserts);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the snack and fries menu", async () => {
    const snacks_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Snacks & Fries"))`;
    const snacks_btn = await $(`android=${snacks_selector}`);
    await snacks_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on snacks Menu", async () => {
    const snacks_selector =
      'new UiSelector().text("Snacks & Fries").className("android.widget.TextView")';
    const snacks_btn = await $(`android=${snacks_selector}`);
    await snacks_btn.click();
    await browser.pause(3000);
  });

  it("should return all the snacks menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const snacks_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    snacks.push(...snacks_listing);
    console.log(snacks);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the soft drinks menu", async () => {
    const softDrinks_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Soft Drinks"))`;
    const softDrinks_btn = await $(`android=${softDrinks_selector}`);
    await softDrinks_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on softDrinks Menu", async () => {
    const softDrinks_selector =
      'new UiSelector().text("Soft Drinks").className("android.widget.TextView")';
    const softDrinks_btn = await $(`android=${softDrinks_selector}`);
    await softDrinks_btn.click();
    await browser.pause(3000);
  });

  it("should return all the soft drinks menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const softDrinks_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    softDrinks.push(...softDrinks_listing);
    console.log(softDrinks);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the Shakes, Frappes and Smoothies menu", async () => {
    const shake_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Shakes, Frappes & Smoothies"))`;
    const shake_btn = await $(`android=${shake_selector}`);
    await shake_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on shakes Menu", async () => {
    const shakes_selector =
      'new UiSelector().text("Shakes, Frappes & Smoothies").className("android.widget.TextView")';
    const shakes_btn = await $(`android=${shakes_selector}`);
    await shakes_btn.click();
    await browser.pause(3000);
  });

  it("should return all the shakes menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const shakes_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    shakes.push(...shakes_listing);
    console.log(shakes);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the juice bottled drinks menu", async () => {
    const bottled_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Juice & Bottled Drinks"))`;
    const bottled_btn = await $(`android=${bottled_selector}`);
    await bottled_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on juice bottled Menu", async () => {
    const bottled_selector =
      'new UiSelector().text("Juice & Bottled Drinks").className("android.widget.TextView")';
    const bottled_btn = await $(`android=${bottled_selector}`);
    await bottled_btn.click();
    await browser.pause(3000);
  });

  it("should return all the bottled menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const bottled_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    juice.push(...bottled_listing);
    console.log(juice);
    await browser.pause(6000);
  });

  backBtn();

  it("should scroll on to the sauce menu", async () => {
    const sauce_selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Extra Sauces"))`;
    const sauce_btn = await $(`android=${sauce_selector}`);
    await sauce_btn.scrollIntoView();
    await browser.pause(3000);
  });

  it("should click on sauce Menu", async () => {
    const sauce_selector =
      'new UiSelector().text("Extra Sauces").className("android.widget.TextView")';
    const sauce_btn = await $(`android=${sauce_selector}`);
    await sauce_btn.click();
    await browser.pause(3000);
  });

  it("should return all the sauce menu items and its price for the selected store", async () => {
    // const menu_items = 'new UiSelector().className("android.widget.TextView")';
    const sauce_listing = await browser
      .$$("android.widget.TextView")
      .map((el) => {
        return el.getText();
      });
    sauce.push(...sauce_listing);
    console.log(sauce);
    await browser.pause(6000);
  });

  backBtn();

  async function dynamicChecker(data) {
    it("should filter the unwanted data", async () => {
      const newD = data.filter((value, i) => {
        return (
          data[i] != "Order" &&
          data[i] != "Home" &&
          data[i] != "Rewards & Deals" &&
          data[i] != "Code" &&
          data[i] != "Featured" &&
          data[i] != "More"
        );
      });
      console.log(newD);
    });
  }

  dynamicChecker(familyMenu);
  dynamicChecker(chickenMenu);
  dynamicChecker(happyMeal);
  dynamicChecker(mcNuggets);
  dynamicChecker(beef);
  dynamicChecker(wraps);
  dynamicChecker(eBreakfast);
  dynamicChecker(hotDrinks);
  dynamicChecker(desserts);
  dynamicChecker(snacks);
  dynamicChecker(softDrinks);
  dynamicChecker(shakes);
  dynamicChecker(sauce);
});
