const backBtn = () => {
    it("should click on back button", async () => {
      const backBtn = "~Back";
      await $(backBtn).click();

      await browser.pause(1000);
    });
  };

  module.exports={backBtn}