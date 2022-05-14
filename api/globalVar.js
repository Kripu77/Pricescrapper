const changeLocation_checker=  "id=com.mcdonalds.au.gma:id/location_or_address_text";
const mealButton_checker = 'new UiSelector().text("Make it a Meal").className("android.widget.TextView")'
const small_meal = 'new UiSelector().text("Small Meal").className("android.widget.TextView")';
const large_meal = 'new UiSelector().text("Large Meal").className("android.widget.TextView")' 
const medium_drink = 'new UiSelector().text("M").className("android.widget.TextView")' 
const large_drink = 'new UiSelector().text("L").className("android.widget.TextView")' 
const small_cafe = 'new UiSelector().text("Small").className("android.widget.TextView")' 
const medium_cafe= 'new UiSelector().text("Medium").className("android.widget.TextView")' 
const large_cafe= 'new UiSelector().text("Large").className("android.widget.TextView")' 

module.exports = {
    changeLocation_checker, mealButton_checker, small_meal, large_meal, medium_drink, large_drink, small_cafe, medium_cafe, large_cafe
}