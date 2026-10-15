const drinkList = document.getElementById('drinkList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

async function loadDrinks() {
    const search = searchInput.value;
    const category = categoryFilter.value;

    const params = new URLSearchParams({
        search: search,
        category: category
    });

    try {
        const response = await fetch(`/api/drinks?${params}`);

        if (!response.ok) {
            throw new Error('Failed to load drinks');
        }

        const data = await response.json();

        drinkList.innerHTML = '';

        if (data.drinks.length === 0) {
            drinkList.textContent = 'No drinks found.';
            return;
        }

        data.drinks.forEach(drink => {
            const card = document.createElement('div');
            card.className = 'drink-card';

            const name = document.createElement('h3');
            name.textContent = drink.name;

            const description = document.createElement('p');
            description.textContent = drink.description;

            const price = document.createElement('span');
            price.className = 'price';
            price.textContent = `₱${drink.price}`;

            card.append(name, description, price);
            drinkList.appendChild(card);
        });

    } catch (error) {
        drinkList.textContent = 'Unable to load the menu.';
        console.error(error);
    }
}

searchInput.addEventListener('input', loadDrinks);
categoryFilter.addEventListener('change', loadDrinks);

loadDrinks();