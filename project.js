const button = document.querySelector(".button");

let handle_searched_txt = () =>{
    const searched_txt = document.getElementById("searchtxt").value
    allmeal(searched_txt)
}

let allmeal = (txt) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${txt}`)
    .then((res)=>res.json())
    .then((data)=>{
        displaymeal(data.meals);
    });
};

let displaymeal = (meals) =>{
    const container = document.getElementById("search-result")
    container.innerHTML = "";

    if (!meals) {
        container.innerHTML = `<p class="notfound">No results found.</p>`;
        return;
    }

    meals.forEach((element) => {
        const div =document.createElement("div");
        div.classList.add("card");

        div.innerHTML=`
        <img src="${element.strMealThumb}">
        <h5>${element.strMeal}</h5>
        `;

        div.addEventListener("click", ()=>{
            DetailCard (element);
        })
        container.appendChild(div);
    });
}

let DetailCard = (meal) => {
    const detailCard = document.getElementById("details-card");

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients += `<li>${ingredient} - ${measure}</li>`;
        }
    }

    detailCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="info">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>${ingredients}</ul>
            <p><strong>Instructions:</strong></p>
            <p>${meal.strInstructions}</p>
        </div>
    `;
};



button.addEventListener("click", handle_searched_txt);