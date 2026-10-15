// Fetch menu data from our Express GET endpoint without refreshing the page.
const menuGrid = document.querySelector('#menu-grid');
if (menuGrid) {
  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  const searchBox = document.querySelector('#menu-search');
  const detailsPanel = document.querySelector('#drink-details');
  let currentCategory = 'all';

  async function loadDrinks() {
    const params = new URLSearchParams({ category: currentCategory, search: searchBox.value });
    menuGrid.textContent = 'Loading drinks...';
    detailsPanel.classList.add('hidden');
    try {
      const response = await fetch(`/api/drinks?${params}`);
      if (!response.ok) throw new Error('Unable to load drinks');
      const data = await response.json();
      menuGrid.replaceChildren();
      if (!data.drinks.length) { menuGrid.textContent = 'No drinks match your search.'; return; }
      for (const drink of data.drinks) {
        const card = document.createElement('article');
        card.className = 'menu-card';
        const category = document.createElement('span'); category.className = 'category'; category.textContent = drink.category;
        const heading = document.createElement('h3'); heading.textContent = drink.name;
        const description = document.createElement('p'); description.textContent = drink.description;
        const price = document.createElement('span'); price.className = 'price'; price.textContent = drink.price;
        const button = document.createElement('button'); button.className = 'btn btn-outline'; button.textContent = 'View details';
        button.addEventListener('click', () => loadDrinkDetails(drink.id));
        card.append(category, heading, description, price, button); menuGrid.append(card);
      }
    } catch (error) { menuGrid.textContent = 'Could not load menu. Please refresh the page.'; }
  }

  async function loadDrinkDetails(id) {
    try {
      const response = await fetch(`/api/drinks/${id}`);
      if (!response.ok) throw new Error('Drink not found');
      const drink = await response.json();
      detailsPanel.textContent = `${drink.name} | ₱${drink.price} | ${drink.description}`;
      detailsPanel.classList.remove('hidden');
      detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) { detailsPanel.textContent = 'Details unavailable'; detailsPanel.classList.remove('hidden'); }
  }

  categoryButtons.forEach(button => button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    categoryButtons.forEach(item => item.classList.toggle('active', item === button));
    loadDrinks();
  }));
  searchBox.addEventListener('input', loadDrinks);
  loadDrinks();
}
