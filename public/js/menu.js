
const drinkList = document.getElementById('drinkList');
const categoryButtons = document.querySelectorAll('.category-btn');

async function loadDrinks(filter = 'all') {
    let url = '/api/drinks';

    if (filter === 'hot' || filter === 'iced') {
        url += `?temperature=${filter}`;
    } else if (filter !== 'all') {
        url += `?category=${filter}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Unable to retrieve menu items');
        }

        const data = await response.json();
        drinkList.innerHTML = '';

        if (data.drinks.length === 0) {
            drinkList.textContent = 'No products found.';
            return;
        }

        data.drinks.forEach(drink => {
            const card = document.createElement('article');
            card.className = 'drink-card';

            const image = document.createElement('img');
            image.src = drink.image;
            image.onerror = function () {
                this.onerror = null;
                this.src = '/images/coffee-art.svg';
            };
            image.alt = drink.name;
            image.className = 'drink-image';
            image.loading = 'lazy';

            const content = document.createElement('div');
            content.className = 'drink-content';

            const name = document.createElement('h3');
            name.textContent = drink.name;

            const description = document.createElement('p');
            description.textContent = drink.description;

            const price = document.createElement('span');
            price.className = 'price';
            price.textContent = `₱${drink.price}`;

            content.append(name, description, price);
            card.append(image, content);
            drinkList.appendChild(card);
        });

    } catch (error) {
        drinkList.textContent = 'Unable to load the menu.';
        console.error(error);
    }
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        loadDrinks(button.dataset.filter);
    });
});

loadDrinks();
