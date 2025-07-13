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

    meals.forEach((element) => {
        const div =document.createElement("div");
        div.classList.add("card");

        div.innerHTML=`
        <img src="${element.strMealThumb}">
        <h5>${element.strMeal}</h5>
        `
        container.appendChild(div);
            console.log(element)
    });
}

button.addEventListener("click", handle_searched_txt);