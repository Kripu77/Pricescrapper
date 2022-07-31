const unavailable = async (itemName, itemPrice) => {

    const selector =
      'new UiSelector().text("Currently unavailable").className("android.widget.EditText")';

    const unavailable = await $(`android=${selector}`);

    (await $(unavailable).isExisting())
      ? [itemName.push("Unavailable in App"), itemPrice.push("NA")]
      : console.log("scrapped");

    await browser.pause(1000);
  
};


module.exports ={
  unavailable
}