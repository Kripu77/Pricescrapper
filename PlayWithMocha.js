//specify what the test is going to do

describe('MCD PRICE SCRAPPER', function (){
    //before can be substitued with beforeEach hook which will run on every store scrapping
before(()=>{
    console.log("Before the MCD app starts")
})    

    //test case only
it('should click on the login button', function(){
console.log("I am ready")
})

//after hook can be replaced with afterEach hook
after(()=>{
    console.log("Please check the excel file generated")
})

})