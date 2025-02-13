//fetching all the categories data

let menuBar = document.getElementById("menuBar");
let allCategories = document.getElementById("allCategories");

const fetchCategory = async () => {

    //fetching categories data from api

    let mealData  = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let {categories} = await mealData.json();

    // displaying mealRecipe container as none

    let mealRecipe = document.getElementById("mealRecipe");
    mealRecipe.style.display = "none";

    let allmeals = document.getElementById("allmeals");

    //getting all the catagories data using map method

        categories.map(meal =>{
            let containerMeal = document.createElement("div");
            containerMeal.classList.add("meals");
            containerMeal.innerHTML += `
            <img id="category-thumb" onclick=fetchMeal("${meal.strCategory.toLowerCase()}"),allmeals.innerHTML="" src="${meal.strCategoryThumb}" alt="${meal.strCategory}">
            <button id="category-name">${meal.strCategory}</button>
            `
            allCategories.append(containerMeal);

            let mealName = document.getElementById("mealName");
            mealName.innerHTML += `<li onclick=hidedata(),fetchMeal("${meal.strCategory.toLowerCase()}"),allmeals.innerHTML="" id="menu-name">${meal.strCategory}</li><hr>`
            menuBar.appendChild(mealName);
        });

}

fetchCategory();

//function to display the data in menuBar

function menudata(){
    let mealName = document.getElementById("mealName");
    mealName.style.display = "block";
}

//function to hide the data in menuBar

function hidedata(){
    let  mealName = document.getElementById("mealName");
    mealName.style.display = "none";
}