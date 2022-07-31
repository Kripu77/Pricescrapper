const path = require('path')

exports.config = {
  runner: "local",
  host: "localhost",
  path: "/wd/hub",
  port: 4723,
  logLevel: "silent",
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    require: ["@babel/register"],
    timeout: 600000,
  },
  maxInstances: 100,
  sync: true,

  //include what file you would like to reference here while running the js test file
  specs: [
  
  
   ` ${path.resolve(__dirname, './api/scrapBySearch.js')}`
     
     
  ], 

  //array required for wdio which will connect to the appium server and start the app on emulator.
  capabilities:[{
    "deviceName": "Android Emulator",
    "automationName": "appium",
    "platformName": "Android",
    "appPackage": "com.mcdonalds.au.gma",
    "appActivity": "com.mcdonalds.mcdcoreapp.common.activity.SplashActivity", 
    // "disableAndroidWatchers": true, 
    // "isHeadless": true
  }]
};


console.log("Hello, Welcome the scrapping process has started. Please wait as we progress....w")