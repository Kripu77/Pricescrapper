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
  it("should enter the password", async()=>{
    const selector_two = 'new UiSelector().text("Password").className("android.widget.EditText")';
    const password = await $(`android=${selector_two}`);
    await password.setValue("Tomato43");

    await browser.pause(1000);

  })
//click on the sigin in button once its enabled
  it("should click on the sign in button", async()=>{
    const sign_in = "~Sign In Button"
    await $(sign_in).click();

    await browser.pause(3000)
})

it("should click on the order", async()=>{
    
    const order_icon = "~Order tab 2 of 5"
    await $(order_icon).click();

    await browser.pause(1000);

  })



  it("should click on cross button", async()=>{
    const cancelBtn = "~Close"
    await $(cancelBtn).click();

    await browser.pause(3000)
})


it("should click on the search store btn", async()=>{
    const searchBtn = "~Search icon"
    await $(searchBtn).click();

    await browser.pause(2000)
})




it("should enter the store name in the input field", async()=>{

    const store_selector =
    'new UiSelector().text("Enter Suburb or Postcode").className("android.widget.EditText")';
  const store_name = await $(`android=${store_selector}`);
  await store_name.setValue("Kings Cross");
  // await browser.pause(12000);
  await driver.pressKeyCode(66); //From android docs refer to keyEvent Constant Value: 66 (0x00000042)


  })

  it("should click on the order here button", async()=>{

    const order_selector = 'new UiSelector().text("Order Here").className("android.widget.TextView")';
    const order_btn = await $(`android=${order_selector}`);
    await order_btn.click();
    await browser.pause(3000)

  })

 

  it("should click on Family or Sharing Menu", async()=>{

    const fam_selector = 'new UiSelector().text("Family & Sharing").className("android.widget.TextView")';
    const fammenu_btn = await $(`android=${fam_selector}`);
    await fammenu_btn.click();
    await browser.pause(3000)
  })



  
});
