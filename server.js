
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
    {
        id: 1,
        name: 'Signature Latte',
        category: 'coffee',
        price: 155,
        description: 'Espresso, silky steamed milk, and a little comfort.'
    },
    {
        id: 2,
        name: 'Iced Americano',
        category: 'coffee',
        price: 120,
        description: 'Bold espresso poured over cool water and ice.'
    },
    {
        id: 3,
        name: 'Caramel Cloud',
        category: 'coffee',
        price: 175,
        description: 'Sweet caramel and espresso with creamy foam.'
    },
    {
        id: 4,
        name: 'Matcha Bloom',
        category: 'non-coffee',
        price: 180,
        description: 'Earthy matcha with creamy milk.'
    },
    {
        id: 5,
        name: 'Chocolate Velvet',
        category: 'non-coffee',
        price: 165,
        description: 'Rich chocolate, milk, and a smooth finish.'
    },
    {
        id: 6,
        name: 'Cold Brew',
        category: 'coffee',
        price: 145,
        description: 'Slow-steeped coffee with a mellow taste.'
    }
];

// GET all drinks, search by name, or filter by category
// Examples:
// /api/drinks
// /api/drinks?category=coffee
// /api/drinks?search=latte

app.get('/api/drinks', (req, res) => {
    const category = String(req.query.category || 'all').toLowerCase();
    const search = String(req.query.search || '').trim().toLowerCase();

    const filtered = drinks.filter(drink => {
        const matchesCategory =
            category === 'all' || drink.category === category;

        const matchesSearch =
            !search || drink.name.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
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
