document.getElementById("recipe-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById("recipe-title").value;
    const ingredients = document.getElementById("recipe-ingredients").value;
    const instructions = document.getElementById("recipe-instructions").value;
    const imageFile = document.getElementById("recipe-image").files[0];

    // Create new recipe item
    const newRecipe = document.createElement("li");

    // If there's an image, create an <img> element
    let imgTag = "";
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgTag = `<img src="${e.target.result}" alt="${title}">`;
            // Update the newRecipe HTML once the image is loaded
            newRecipe.innerHTML = `
                ${imgTag}
                <h3>${title}</h3>
                <p><strong>Ingredients:</strong> ${ingredients}</p>
                <p class="instructions"><strong>Instructions:</strong> ${instructions}</p>
            `;
            document.getElementById("recipes-list").appendChild(newRecipe); // Append after image is loaded
        };
        reader.readAsDataURL(imageFile);
    } else {
        // If no image, just append the title, ingredients, and instructions
        newRecipe.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p class="instructions"><strong>Instructions:</strong> ${instructions}</p>
        `;
        document.getElementById("recipes-list").appendChild(newRecipe);
    }

    // Clear the form
    document.getElementById("recipe-form").reset();
});
