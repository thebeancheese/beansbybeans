// Vince Raiezen M. Cruzada
// 6WCSERVER - Basic Express Routing Laboratory

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

// Log each page request to the terminal.
function showPage(pageName) {
  return (req, res) => {
    console.log(`Visited ${pageName} page: ${req.method} ${req.originalUrl}`);
    res.sendFile(path.join(publicFolder, `${pageName.toLowerCase()}.html`));
  };
}

// Serve CSS, client-side JavaScript and images from /public.
app.use(express.static(publicFolder));

// Specific routes for each HTML page.
app.get('/', (req, res) => {
  console.log(`Visited Home page: ${req.method} ${req.originalUrl}`);
  res.sendFile(path.join(publicFolder, 'index.html'));
});
app.get('/menu', showPage('Menu'));
app.get('/about', showPage('About'));
app.get('/contact', showPage('Contact'));

const drinks = [
  { id: 1, name: 'Signature Latte', category: 'coffee', price: 155, description: 'Espresso, silky steamed milk, and a little comfort.' },
  { id: 2, name: 'Iced Americano', category: 'coffee', price: 120, description: 'Bold espresso poured over cool water and ice.' },
  { id: 3, name: 'Caramel Cloud', category: 'coffee', price: 175, description: 'Sweet caramel and espresso with creamy foam.' },
  { id: 4, name: 'Matcha Bloom', category: 'non-coffee', price: 180, description: 'Earthy matcha with creamy milk.' },
  { id: 5, name: 'Chocolate Velvet', category: 'non-coffee', price: 165, description: 'Rich chocolate, milk, and a smooth finish.' },
  { id: 6, name: 'Cold Brew', category: 'coffee', price: 145, description: 'Slow-steeped coffee with a mellow taste.' }
];

// GET /api/drinks or /api/drinks?category=coffee or /api/drinks?search=latte
app.get('/api/drinks', (req, res) => {
  const category = String(req.query.category || 'all').toLowerCase();
  const search = String(req.query.search || '').trim().toLowerCase();
  const filtered = drinks.filter(drink =>
    (category === 'all' || drink.category === category) &&
    (!search || drink.name.toLowerCase().includes(search))
  );
  res.json({ total: filtered.length, drinks: filtered });
});

// GET /api/drinks/1 (route parameter)
app.get('/api/drinks/:id', (req, res) => {
  const drink = drinks.find(item => item.id === Number(req.params.id));
  if (!drink) return res.status(404).json({ error: 'Drink not found' });
  res.json(drink);
});

// Example 404 response for unknown API endpoints.
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));

// Catch unknown pages.
app.use((req, res) => {
  console.log(`Page not found: ${req.method} ${req.originalUrl}`);
  res.status(404).sendFile(path.join(publicFolder, '404.html'));
});

app.listen(PORT, () => {
  console.log(`beans by beans running at http://localhost:${PORT}`);
});
