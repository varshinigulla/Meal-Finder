let menuBar = document.getElementById("menuBar");
let allCategories = document.getElementById("allCategories");
let rendercategory = async () => {
    let mealData  = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let {categories} = await mealData.json();
    
    categories.map( meal =>{
        let containerMeal = document.createElement("div");
        containerMeal.classList.add("meals");
        containerMeal.innerHTML += `
        <img id="category-thumb" onclick=rendermeal(${meal.strCategory.toLowerCase()}) src="${meal.strCategoryThumb}" alt="${meal.strCategory}">
        <button id="category-name">${meal.strCategory}</button>
        `
        allCategories.append(containerMeal);


        let mealName = document.getElementById("mealName");
        mealName.innerHTML += `<li onclick=hidedata(),rendermeal(${meal.strCategory.toLowerCase()}) id="menu-name">${meal.strCategory}</li><hr>`
        menuBar.appendChild(mealName);
        });
}

rendercategory();

function menudata(){
    let mealName = document.getElementById("mealName");
    mealName.style.display = "block";
}
function hidedata(){
    let ul = document.getElementById("mealName");
    mealName.style.display = "none";
}