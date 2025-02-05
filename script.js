let nav = document.getElementById("nav");
let cont = document.getElementById("cont");
let rendermeal = async () => {
    let data  = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let response = await data.json();

    response.categories.forEach( meal =>{
        let container = document.createElement("div");
        container.classList.add("allmeals");
        container.innerHTML = `
        <img id="meal-thumb" src="${meal.strCategoryThumb}" alt="${meal.strCategory}">
        <button id="meal-name">${meal.strCategory}</button>
        `
        cont.appendChild(container);
        let ul = document.getElementById("ul");
        ul.innerHTML += `<li onclick=hidedata() id="menu-name">${meal.strCategory}</li><hr>`
        nav.appendChild(ul);
        });
}

rendermeal();

function menudata(){
    let ul = document.getElementById("ul");
    ul.style.display = "block";
}
function hidedata(){
    let ul = document.getElementById("ul");
    ul.style.display = "none";
}