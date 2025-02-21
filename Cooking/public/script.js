//(index.html)
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#cuisines')) {
        const cuisinesContainer = document.getElementById('cuisines');
        
        cuisines.forEach(cuisine => {
            const card = document.createElement('a');
            card.className = 'cuisine-card';
            card.href = `moin.html?cuisineId=${cuisine.id}`;
            
            card.innerHTML = `
                <img src="${cuisine.image}" alt="${cuisine.name}" class="cuisine-image">
                <div class="cuisine-title">${cuisine.name}</div>
            `;
            
            cuisinesContainer.appendChild(card);
        });
    }

    //(recipes.html)
    if (document.querySelector('#cuisineFilter')) {
        const filters = {
            cuisine: document.getElementById('cuisineFilter'),
            time: document.getElementById('timeFilter'),
            difficulty: document.getElementById('difficultyFilter')
        };
        const recipesContainer = document.getElementById('recipes');
        const resetBtn = document.querySelector('.reset-filters');
        
        const urlParams = new URLSearchParams(window.location.search);
        const initialCuisineId = urlParams.get('cuisineId');

        if (initialCuisineId) {
            filters.cuisine.value = initialCuisineId;
        }
        //filters
        const applyFilters = () => {
            const cuisineId = Number(filters.cuisine.value);
            const maxTime = Number(filters.time.value);
            const difficulty = Number(filters.difficulty.value);

            const filtered = recipes.filter(recipe => {
                return (filters.cuisine.value === 'all' || recipe.cuisineId === cuisineId) &&
                       (filters.time.value === 'all' || recipe.time <= maxTime) &&
                       (filters.difficulty.value === 'all' || recipe.difficulty === difficulty);
            });

            renderRecipes(filtered);
        };

        const renderRecipes = (recipesArray) => {
            recipesContainer.innerHTML = '';
            
            if (recipesArray.length === 0) {
                recipesContainer.innerHTML = `
                    <div class="no-results">
                        <h3>Рецептов не найдено 😞</h3>
                        <p>Попробуйте изменить параметры фильтров</p>
                    </div>
                `;
                return;
            }

            recipesArray.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>🕒 ${recipe.time} мин</span>
                        <span>⚡ ${'★'.repeat(recipe.difficulty)}</span>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    window.location.href = `recipe.html?id=${recipe.id}`;
                });
                
                recipesContainer.appendChild(card);
            });
        };

        filters.cuisine.addEventListener('change', applyFilters);
        filters.time.addEventListener('change', applyFilters);
        filters.difficulty.addEventListener('change', applyFilters);
        resetBtn.addEventListener('click', () => {
            filters.cuisine.value = 'all';
            filters.time.value = 'all';
            filters.difficulty.value = 'all';
            applyFilters();
        });

        applyFilters();
    }

    //(recipe.html)
    if (document.querySelector('.recipe-detail')) {
        const params = new URLSearchParams(window.location.search);
        const recipeId = params.get('id');
        const recipe = recipes.find(r => r.id == recipeId);

        if (!recipe) {
            document.body.innerHTML = `
                <div class="error">
                    <h2>Рецепт не найден!</h2>
                    <a href="recipes.html">Вернуться к рецептам</a>
                </div>
            `;
            return;
        }
        // db get
        document.getElementById('recipe-title').textContent = recipe.title;
        document.getElementById('recipe-image').src = recipe.image;
        document.getElementById('recipe-time').textContent = recipe.time;
        document.getElementById('recipe-difficulty').textContent = '★'.repeat(recipe.difficulty);
        document.getElementById('recipe-type').textContent = recipe.type;

        const ingredientsList = document.getElementById('recipe-ingredients');
        ingredientsList.innerHTML = recipe.ingredients
            .split(', ')
            .map(ing => `<li>${ing}</li>`)
            .join('');

        const stepsList = document.getElementById('recipe-steps');
        stepsList.innerHTML = recipe.steps
            .map((step, index) => `
                <li>
                    <span class="step-number">Шаг ${index + 1}:</span>
                    ${step}
                </li>
            `)
            .join('');
    }
});