# beans by beans Coffee Shop

**Student:** Vince Raiezen M. Cruzada  
**Course activity:** 6WCSERVER - Basic Express Routing  
**Technologies:** Node.js, Express.js, HTML, CSS, client-side JavaScript, SVG images

A coffee shop website showcasing Express static file serving and GET routes. All content and images in `/public` are local files; no database or API keys are required. The Google Fonts import is optional, and fallback fonts are provided.

## How to run

1. Install [Node.js](https://nodejs.org/) (18 or newer).
2. Open this project folder in VS Code or a terminal.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000`.
6. Press **Ctrl+C** in the terminal to stop.

## Routes to try

| URL | Result |
| --- | --- |
| `/` | Home page |
| `/menu` | Dynamic menu page |
| `/about` | About page |
| `/contact` | Contact page |
| `/css/style.css` | Static CSS file |
| `/images/logo.svg` | Static image file |
| `/js/app.js` | Static client-side JavaScript file |
| `/api/drinks` | JSON list of all drinks |
| `/api/drinks?category=coffee` | Filter by query string |
| `/api/drinks?search=latte` | Search by query string |
| `/api/drinks/2` | One drink using `req.params.id` |
| `/api/drinks/999` | JSON 404 response |
| `/unknown-page` | Custom HTML 404 response |

## What to show during testing

- Use the site navigation; the terminal logs the page name and request URL.
- Browse the Menu page; its cards load from `/api/drinks` using `fetch()`.
- Try the Coffee and Non-Coffee filters, and type `latte` in the search box.
- Click **View details** to fetch `/api/drinks/:id`.
- Open DevTools → Network and refresh the page; check status **200** for HTML, CSS, image and JS requests.
- Open an invalid URL to confirm **404**.

## Project structure

```
server.js
package.json
package-lock.json (generated when installing dependencies)
.gitignore
README.md
public/
  index.html
  menu.html
  about.html
  contact.html
  404.html
  css/style.css
  js/app.js
  images/logo.svg
  images/coffee-art.svg
  images/beans.svg
```

**Note:** The Canvas recording could not be viewed outside authenticated Canvas access. This project's navigation is Home, Menu, About, Contact and should be checked against the instructor's exact recording before submission.
