
// Vince Raiezen M. Cruzada
// 6WCSERVER - Basic Express Routing Laboratory
// beans by beans - Coffee Shop Website

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

// Routes for HTML pages
function showPage(pageName) {
    return (req, res) => {
        console.log(`Rendering ${pageName}.html`);
        res.sendFile(path.join(publicFolder, `${pageName}.html`));
    };
}

// Home
app.get('/', (req, res) => {
    console.log('Rendering index.html');
    res.sendFile(path.join(publicFolder, 'index.html'));
});

// Menu
app.get('/menu', showPage('menu'));

// About
app.get('/about', showPage('about'));

// Contact
app.get('/contact', showPage('contact'));

// Serve static HTML, CSS, JavaScript, and images
app.use(express.static(publicFolder));

// Coffee shop menu data

const drinks = [
    // Coffee
    {
        id: 1,
        name: 'Signature Latte',
        category: 'coffee',
        temperature: ['hot', 'iced'],
        price: 155,
        image: '/images/products/signature-latte.jpg',
        description: 'Espresso with smooth, creamy milk.'
    },
    {
        id: 2,
        name: 'Iced Americano',
        category: 'coffee',
        temperature: ['iced'],
        price: 120,
        image: '/images/products/iced-americano.jpg',
        description: 'Bold espresso served over ice.'
    },
    {
        id: 3,
        name: 'Caramel Macchiato',
        category: 'coffee',
        temperature: ['hot', 'iced'],
        price: 175,
        image: '/images/products/caramel-macchiato.jpg',
        description: 'Espresso, milk, and sweet caramel.'
    },
    {
        id: 4,
        name: 'Vanilla Latte',
        category: 'coffee',
        temperature: ['hot', 'iced'],
        price: 165,
        image: '/images/products/vanilla-latte.jpg',
        description: 'Smooth espresso with a touch of vanilla.'
    },
    {
        id: 5,
        name: 'Cold Brew',
        category: 'coffee',
        temperature: ['iced'],
        price: 145,
        image: '/images/products/cold-brew.jpg',
        description: 'Slow-steeped coffee with a mellow taste.'
    },
    {
        id: 6,
        name: 'Cafe Mocha',
        category: 'coffee',
        temperature: ['hot', 'iced'],
        price: 170,
        image: '/images/products/cafe-mocha.jpg',
        description: 'Espresso blended with chocolate and milk.'
    },

    // Non-Coffee
    {
        id: 7,
        name: 'Matcha Latte',
        category: 'non-coffee',
        temperature: ['hot', 'iced'],
        price: 180,
        image: '/images/products/matcha-latte.jpg',
        description: 'Earthy matcha blended with creamy milk.'
    },
    {
        id: 8,
        name: 'Strawberry Matcha',
        category: 'non-coffee',
        temperature: ['iced'],
        price: 185,
        image: '/images/products/strawberry-matcha.jpg',
        description: 'Matcha, milk, and sweet strawberry.'
    },
    {
        id: 9,
        name: 'Chocolate Velvet',
        category: 'non-coffee',
        temperature: ['hot', 'iced'],
        price: 165,
        image: '/images/products/chocolate-velvet.jpg',
        description: 'Rich and creamy chocolate goodness.'
    },
    {
        id: 10,
        name: 'Hojicha Latte',
        category: 'non-coffee',
        temperature: ['hot', 'iced'],
        price: 180,
        image: '/images/products/hojicha-latte.jpg',
        description: 'Roasted Japanese green tea with milk.'
    },
    {
        id: 11,
        name: 'Strawberry Milk',
        category: 'non-coffee',
        temperature: ['iced'],
        price: 150,
        image: '/images/products/strawberry-milk.jpg',
        description: 'Fresh strawberry flavor with creamy milk.'
    },
    {
        id: 12,
        name: 'Chai Latte',
        category: 'non-coffee',
        temperature: ['hot', 'iced'],
        price: 160,
        image: '/images/products/chai-latte.jpg',
        description: 'Warm spices blended with smooth milk.'
    },

    // Pastries
    {
        id: 13,
        name: 'Butter Croissant',
        category: 'pastry',
        temperature: [],
        price: 95,
        image: '/images/products/butter-croissant.jpg',
        description: 'Flaky, buttery, and freshly baked.'
    },
    {
        id: 14,
        name: 'Chocolate Croissant',
        category: 'pastry',
        temperature: [],
        price: 115,
        image: '/images/products/chocolate-croissant.jpg',
        description: 'Golden pastry filled with chocolate.'
    },
    {
        id: 15,
        name: 'Chocolate Chip Cookie',
        category: 'pastry',
        temperature: [],
        price: 85,
        image: '/images/products/chocolate-cookie.jpg',
        description: 'Soft cookie loaded with chocolate chips.'
    },
    {
        id: 16,
        name: 'Blueberry Cheesecake',
        category: 'pastry',
        temperature: [],
        price: 155,
        image: '/images/products/blueberry-cheesecake.jpg',
        description: 'Creamy cheesecake topped with blueberries.'
    },
    {
        id: 17,
        name: 'Cinnamon Roll',
        category: 'pastry',
        temperature: [],
        price: 125,
        image: '/images/products/cinnamon-roll.jpg',
        description: 'Soft pastry with cinnamon and sweet glaze.'
    },
    {
        id: 18,
        name: 'Banana Bread',
        category: 'pastry',
        temperature: [],
        price: 105,
        image: '/images/products/banana-bread.jpg',
        description: 'Moist banana bread with a homemade taste.'
    }
];

// Get menu items using category, temperature, or search
app.get('/api/drinks', (req, res) => {
    const category = String(req.query.category || 'all').toLowerCase();
    const temperature = String(req.query.temperature || 'all').toLowerCase();
    const search = String(req.query.search || '').trim().toLowerCase();

    const filtered = drinks.filter(drink => {
        const matchesCategory =
            category === 'all' || drink.category === category;

        const matchesTemperature =
            temperature === 'all' || drink.temperature.includes(temperature);

        const matchesSearch =
            !search || drink.name.toLowerCase().includes(search);

        return matchesCategory && matchesTemperature && matchesSearch;
    });

    res.json({
        total: filtered.length,
        drinks: filtered
    });
});

// GET a specific drink using its ID
// Example: /api/drinks/1

app.get('/api/drinks/:id', (req, res) => {
    const id = Number(req.params.id);
    const drink = drinks.find(item => item.id === id);

    if (!drink) {
        return res.status(404).json({
            error: 'Drink not found'
        });
    }

    res.json(drink);
});

// Handle unknown API routes
app.use('/api', (req, res) => {
    res.status(404).json({
        error: 'API route not found'
    });
});

// Handle unknown pages
app.use((req, res) => {
    console.log(`Page not found: ${req.method} ${req.originalUrl}`);

    res.status(404).sendFile(
        path.join(publicFolder, '404.html')
    );
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`beans by beans: http://localhost:${PORT}`);
});
