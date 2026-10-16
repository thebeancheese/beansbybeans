# beans by beans ☕

**A Coffee Shop Web Application Using Express.js**

**Author:** Vince Raiezen M. Cruzada  
**Course Code:** 6WCSERVER  
**Activity:** Basic Express Routing Laboratory  
**GitHub Repository:** https://github.com/thebeancheese/beansbybeans

## Project Description

**beans by beans** is a coffee shop website developed using Node.js and Express.js. This laboratory project demonstrates HTTP GET routing, static asset delivery, route and query parameters, and frontend integration with a JSON API.

The website has Home, Menu, About, and Contact pages. Its dynamic menu displays coffee, non-coffee drinks, and pastries and can be filtered by category or serving temperature without reloading the page.

## Technologies Used

- **Node.js:** Runs the web server.
- **Express.js:** Handles routes, API responses, and static file serving.
- **HTML5:** Structures the pages.
- **CSS3:** Styles the website and responsive layouts.
- **JavaScript:** Fetches menu data and provides browser-side interactions.

## Features

- Four pages: Home, Menu, About, and Contact
- Custom **beans by beans** branding and color palette
- Console logging when HTML pages are requested
- 18 menu products with prices, descriptions, and image paths
- Category buttons for Coffee, Non-Coffee, Pastries, Hot Drinks, and Iced Drinks
- Dynamic menu loading using `fetch()` and JSON responses
- Fallback illustration for missing product images
- Demo contact form with client-side validation (messages are **not** sent or stored)
- Custom 404 page and JSON API error responses

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thebeancheese/beansbybeans.git
   ```

2. Open the project folder:

   ```bash
   cd beansbybeans
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Visit **http://localhost:3000**.

## GET Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/menu` | Menu page |
| `/about` | About page |
| `/contact` | Contact page |
| `/api/drinks` | All menu products, with optional filters |
| `/api/drinks/:id` | One product selected by ID |

### API Examples

```text
/api/drinks?category=coffee
/api/drinks?category=non-coffee
/api/drinks?category=pastry
/api/drinks?temperature=hot
/api/drinks?temperature=iced
/api/drinks?search=latte
/api/drinks/1
```

The `category`, `temperature`, and `search` parameters are read with `req.query`. Individual drink IDs are read with `req.params`.

## Project Structure

```text

beansbybeans/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── beans-logo.png
│   │   ├── coffee-art.svg
│   │   └── products/
│   │       ├── signature-latte.jpg
│   │       ├── iced-americano.jpg
│   │       ├── caramel-macchiato.jpg
│   │       ├── vanilla-latte.jpg
│   │       ├── cold-brew.jpg
│   │       ├── cafe-mocha.jpg
│   │       ├── matcha-latte.jpg
│   │       ├── strawberry-matcha.jpg
│   │       ├── chocolate-velvet.jpg
│   │       ├── hojicha-latte.jpg
│   │       ├── strawberry-milk.jpg
│   │       ├── chai-latte.jpg
│   │       ├── butter-croissant.jpg
│   │       ├── chocolate-croissant.jpg
│   │       ├── chocolate-cookie.jpg
│   │       ├── blueberry-cheesecake.jpg
│   │       ├── cinnamon-roll.jpg
│   │       └── banana-bread.jpg
│   ├── js/
│   │   ├── app.js
│   │   ├── menu.js
│   │   └── contact.js
│   ├── index.html
│   ├── menu.html
│   ├── about.html
│   ├── contact.html
│   └── 404.html
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

```

The `node_modules` directory is excluded from version control.

## Testing

- Visit `/`, `/menu`, `/about`, and `/contact` and confirm the server prints `Rendering index.html`, `Rendering menu.html`, and so on.
- Inspect the browser **Network** tab to confirm CSS, JavaScript, and image resources return **200 OK** when available.
- Switch menu categories to confirm the frontend fetches filtered API results without refreshing.
- Visit `/api/drinks/999` to check a **404** JSON response.
- Visit an unknown page such as `/randompage` to check the custom **404** page.

## Scope

This is a laboratory demonstration, not a live ordering system. Menu products are stored in a JavaScript array rather than a database. The project does not include login, purchases, payments, or persistent contact submissions.

## Conclusion

**beans by beans** demonstrates how Express.js can connect page routing, static HTML/CSS/JavaScript/images, and backend JSON endpoints to build a functional coffee shop web application.

---

**Developed by Vince Raiezen M. Cruzada**  
**6WCSERVER | Basic Express Routing Laboratory**
