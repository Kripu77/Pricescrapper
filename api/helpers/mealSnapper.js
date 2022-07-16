
const mealSnapper = async ()=>{


const meal_size = await browser
.$$("id=com.mcdonalds.au.gma:id/product_name")
.map((el) => {
  return el.getText();
});

const meal_price = await browser
.$$("id=com.mcdonalds.au.gma:id/product_detailss")
.map((el) => {
  return el.getText();
});

itemName.push(...meal_size);
itemPrice.push(...meal_price);
}

module.exports = {mealSnapper}