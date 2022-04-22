const loginJS = async()=>{






  //login test case
 
    await browser.pause(3000);
    const LOGIN_BUTTON = "~Log in";

    await $(LOGIN_BUTTON).click();

    //wait for 3s to see the result after click
    await browser.pause(1000);
 


    await browser.pause(1000);
    //this will select our input form email
    const selector =
      'new UiSelector().text("Email").className("android.widget.EditText")';
    const input = await $(`android=${selector}`);
    await input.setValue("JohnathonCarter88@cfal.com.au");

    await browser.pause(1000);

  //enters the dummy user

    const selector_two =
      'new UiSelector().text("Password").className("android.widget.EditText")';
    const password = await $(`android=${selector_two}`);
    await password.setValue("Tomato43");

    await browser.pause(1000);

  //click on the sigin in button once its enabled

    const sign_in = "~Sign In Button";
    await $(sign_in).click();

    await browser.pause(3000);


}

module.exports = {loginJS}
