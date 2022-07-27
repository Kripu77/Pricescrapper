const unavailable = () => {
  it("should check if the item is unavailable", async () => {
    const selector =
      'new UiSelector().text("Currently unavailable").className("android.widget.EditText")';

    const unavailable = await $(`android=${selector}`);
    
    await $(unavailable).isExisting()? "":"";

    await browser.pause(1000);
  });
};
