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

            //appending the containerMeal to allCategories container

            allCategories.append(containerMeal);

            let mealName = document.getElementById("mealName");
            mealName.innerHTML += `<li onclick=hidedata(),fetchMeal("${meal.strCategory.toLowerCase()}"),allmeals.innerHTML="" id="menu-name">${meal.strCategory}</li><hr>`
            
            //appending the mealName to menuBar container

            menuBar.appendChild(mealName);

        });

}

//function call 

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

//filtering the categories data to get description data

let allmeals = document.getElementById("allmeals");

const getdescription = async (Category) => {

    //fetching categories data from api

    let categoryData  = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let response = await categoryData.json();

    // displaying allCategories container as none

    let allCategories = document.getElementById("allCategories");
    allCategories.style.display = "none";

    // displaying mealRecipe container as none

    let mealRecipe = document.getElementById("mealRecipe");
    mealRecipe.style.display = "none";

    let description = document.createElement("div");
    description.classList.add("description");

    let title = document.createElement("div");
    title.classList.add("title");

    //getting description data using filter method to categories data

   const filteredCategory = response.categories.filter(meal => meal.strCategory.toLowerCase() === Category.toLowerCase());
   description.innerHTML = `
    <h3>${filteredCategory[0].strCategory}</h3>
    <p>${filteredCategory[0].strCategoryDescription}</p>
    `
    title.innerHTML = `<h1>MEALS</h1><hr>`

    //appending the description and title to allmeals container

    allmeals.appendChild(description);
    allmeals.appendChild(title);
}

//fetching all the meals data

let fetchMeal = async (Category) => {

    // displaying allmeals container as none

    let allmeals = document.getElementById("allmeals");
    allmeals.style.display="block";

    //function call

    getdescription(Category);

    //fetching  meals data from api

    let data  = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    let response = await data.json();

    let mealData = document.createElement("div");
    mealData.classList.add("mealData");

    //getting each meal data using filter method

    response.meals.filter(meal =>{
        let container = document.createElement("div");
        container.classList.add("meal");
        container.innerHTML=`<h1>MEALS</h1>`
        container.innerHTML = `
        <img id="meal-thumb" onclick=recipeDetails("${meal.idMeal}") src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p id="meal-name">${meal.strMeal}</p>
        `

        //appending the filtered container to allmeals container

        mealData.appendChild(container);
        allmeals.appendChild(mealData);

        });

}

//giving input in search bar to get the meals data

let btn = document.getElementById("searchIcon");
btn.addEventListener("click",()=>{
    let allmeals = document.getElementById("allmeals");
    allmeals.innerHTML="";
    let food = document.getElementById("searchInput").value.toLowerCase().trim();
    rendermeal(food);
    document.getElementById("searchInput").value ='';
});

//fetching the tags data of meal from meals data

const fetchTags = (meal) => {
    let tags = "";
    if(meal == null){
        meal = "null";
    }
    let tagsArray = meal.split(",");
    for(i=0;i<tagsArray.length;i++){
         tags += `<pre>${tagsArray[i]}</pre>`
    }
    return tags;
}

//fetching the Ingredients data of meal from meals data

const fetchIngredients = (meal) => {
    let ingredientlist = "";
    for (let i = 1; i <=20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            ingredientlist += `<pre><i id="number">${i}</i> ${ingredient}</pre>`;
        }
        else{
            break;
        }
    }
    return ingredientlist;
}

//fetching the measure data of meal from meals data

const fetchMeasure = (meal) => {
    let measurelist = "";
    for (let i = 1; i <=20; i++) {
        const measure = meal[`strMeasure${i}`];
        if(measure ==" " || measure == "null" || measure == "" || measure == null){
            break;
        }
        else{
            const ingredient = meal[`strIngredient${i}`];
            measurelist += `<p><i class="fa-solid fa-spoon" style="color: #fb7304;"></i>${measure} ${ingredient}</p>`;
        }
    }
    return measurelist;
}

//fetching the instructions data of meal from meals data

const fetchInstructions = (meal) => {
    let instructions = "";
    let instructionsArray = meal.split(".\r\n");
    for(i=0;i<instructionsArray.length;i++){
         instructions += `<p><i class="fa-regular fa-square-check" style="color: #fa7b05;"></i>${instructionsArray[i]}</p>`
    }
    return instructions;
}
