exports.config = {
  runner: "local",
  host: "localhost",
  path: "/wd/hub",
  port: 4723,
  logLevel: "info",
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    require: ["@babel/register"],
    timeout: 600000,
  },
  maxInstances: 1,
  sync: true,

  //include what file you would like to reference here while running the js test file
  specs: [
      'C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\\Documents\\GitHub\\Pricescrapper\\PlayWithMocha.js'
  ], 

  //array required for wdio which will connect to the appium server and start the app on emulator.
  capabilities:[{
    "deviceName": "Android Emulator",
    "platformName": "Android",
    "appPackage": "com.mcdonalds.au.gma",
    "appActivity": "com.mcdonalds.mcdcoreapp.common.activity.SplashActivity"
  }]
};
