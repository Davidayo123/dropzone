# 🔥 DROPZONE — Drop. Shop. Repeat.

A full-stack e-commerce store featuring tech gadgets, streetwear, sneakers & gaming gear.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (ES6+) |
| Backend | Node.js + Express |
| Database | JSON file (db.json) |
| Types | TypeScript (types.ts) |
| Data Seeding | Python |
| Version Control | Git |

---

## 🚀 How to Run

### Frontend Only (no backend needed)
Just open `index.html` in your browser. Done!

### Full Stack (frontend + backend)

1. **Install dependencies**
```bash
npm install
```

2. **Seed the database**
```bash
python3 seed.py
```

3. **Start the server**
```bash
npm start
# or for auto-reload:
npm run dev
```

4. **Open the app**
Visit: http://localhost:3000

---

## 📁 Project Structure

```
dropzone/
├── index.html      ← Frontend (HTML + CSS + JS)
├── server.js       ← Backend API (Node.js + Express)
├── types.ts        ← TypeScript type definitions
├── seed.py         ← Python data seed script
├── package.json    ← Node.js config
├── db.json         ← JSON database (auto-generated)
└── README.md       ← This file
```

---

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products?category=Gaming | Filter by category |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (auth required) |
| PUT | /api/products/:id | Update product (auth required) |
| DELETE | /api/products/:id | Delete product (auth required) |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user (auth required) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/orders | Place order (auth required) |
| GET | /api/orders | Get order history (auth required) |

---

## 🔑 Test Credentials (after running seed.py)
- **Admin:** admin@dropzone.com / admin123
- **User:** test@dropzone.com / test123

---

## 💡 JavaScript Concepts Covered

- `async/await` and `fetch` API
- DOM manipulation
- Event listeners
- `localStorage` for cart persistence
- ES6 destructuring, template literals, spread operator
- Array methods (`.filter`, `.find`, `.map`, `.reduce`)
- Error handling with `try/catch`
- Module pattern

## 💡 Backend Concepts Covered

- REST API design
- Express routing and middleware
- CORS handling
- JSON file as database
- Authentication with tokens
- Request validation
- HTTP status codes

## 💡 TypeScript Concepts Covered

- Interfaces and types
- Union types
- Optional properties
- Generic types
- `Omit` utility type
- Type exports

## 💡 Python Concepts Covered

- File I/O with `json` module
- List comprehensions
- f-strings
- Dictionary unpacking with `**`
- Functions and modules
- `datetime` module

---

Built with ❤️ by David
