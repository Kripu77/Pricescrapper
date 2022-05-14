const changeLocation_checker=  "id=com.mcdonalds.au.gma:id/location_or_address_text";
const mealButton_checker = 'new UiSelector().text("Make it a Meal").className("android.widget.TextView")'
const small_meal = 'new UiSelector().text("Small Meal").className("android.widget.TextView")';
const large_meal = 'new UiSelector().text("Large Meal").className("android.widget.TextView")' 
module.exports = {
    changeLocation_checker, mealButton_checker, small_meal, large_meal
}