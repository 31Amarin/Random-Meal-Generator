const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".result");
const container = document.querySelector(".container");
let search = "";
const APP_ID = "a55f5467";
const APP_key = "3af1993b7b074ad32058869fe68bd33a";
// console.log(container)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  search = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const API_URL = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(API_URL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generated = "";
  results.map((result) => {
    generated +=   `<div class = 'item'>
    <img src = '${result.recipe.image}' alt = "">
    <div class="item-container">
        <h1 class = 'foodname'>${result.recipe.label}</h1>
        <a class = 'view' target = "_blank" href = "${result.recipe.url}">View Recipe</a>
    </div>
    <p class = 'foodInfo'> Calories per serving: ${result.recipe.calories.toFixed(2)}</p>
   </div> 
   `
;
  });
  searchResultDiv.innerHTML = generated;
}
