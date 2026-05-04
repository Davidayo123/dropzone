// DROPZONE BACKEND
// Node.js + Express REST API
// Run with: node server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ── DATABASE (JSON file) ──
const IS_VERCEL = !!process.env.VERCEL;
const BUNDLED_DB_FILE = path.join(__dirname, 'db.json');
const DB_FILE = IS_VERCEL ? path.join('/tmp', 'db.json') : BUNDLED_DB_FILE;

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    if (IS_VERCEL && fs.existsSync(BUNDLED_DB_FILE)) {
      fs.copyFileSync(BUNDLED_DB_FILE, DB_FILE);
    } else {
      const defaultDB = { products: [], users: [], orders: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2));
    }
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write to DB:', err);
  }
}

// ── AUTH MIDDLEWARE ──
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token. Please login.' });

  const db = readDB();
  const user = db.users.find(u => u.token === token);
  if (!user) return res.status(401).json({ error: 'Invalid token. Please login again.' });

  req.user = user;
  next();
}

// ── ADMIN MIDDLEWARE ──
function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
}

// ── SEED DEFAULT ADMIN ──
function seedAdmin() {
  const db = readDB();
  const adminExists = db.users.some(u => u.role === 'admin');
  if (!adminExists) {
    const admin = {
      id: 1,
      name: 'Admin',
      email: 'admin@dropzone.com',
      password: 'admin123',
      role: 'admin',
      token: 'admin_' + Math.random().toString(36).substring(2) + Date.now(),
      createdAt: new Date().toISOString()
    };
    db.users.push(admin);
    writeDB(db);
    console.log('Default admin seeded: admin@dropzone.com / admin123');
  }
}

// ── PRODUCT ROUTES ──

// GET all products (with optional filter)
app.get('/api/products', (req, res) => {
  const db = readDB();
  const { category, badge, search } = req.query;
  let products = db.products;

  if (category) {
    products = products.filter(p => p.category === category);
  }
  if (badge) {
    products = products.filter(p => p.badge === badge);
  }
  if (search) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({ count: products.length, products });
});

// GET a single product by ID
app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json(product);
});

// POST create a new product (admin only)
app.post('/api/products', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const { name, category, price, icon: reqIcon, badge, desc } = req.body;
  const icon = reqIcon;

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, category and price are required.' });
  }

  const newProduct = {
    id: Date.now(),
    name,
    category,
    price: parseFloat(price),
    icon: req.body.icon || 'ph-package',
    badge: badge || null,
    desc: desc || '',
    rating: '5.0',
    createdAt: new Date().toISOString()
  };

  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json({ message: 'Product created.', product: newProduct });
});

// PUT update a product (admin only)
app.put('/api/products/:id', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found.' });

  db.products[index] = { ...db.products[index], ...req.body };
  writeDB(db);
  res.json({ message: 'Product updated.', product: db.products[index] });
});

// DELETE a product (admin only)
app.delete('/api/products/:id', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found.' });

  db.products.splice(index, 1);
  writeDB(db);
  res.json({ message: 'Product deleted.' });
});

// ── AUTH ROUTES ──

// POST register a new user
app.post('/api/auth/register', (req, res) => {
  const db = readDB();
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required.' });
  }

  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) return res.status(409).json({ error: 'Email already registered.' });

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: 'user',
    token: Math.random().toString(36).substring(2) + Date.now(),
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  // Return user data without password
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ message: 'Account created. Please log in.', user: userWithoutPassword });
});

// POST login
app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login successful.',
    user: userWithoutPassword,
    token: user.token
  });
});

// GET current user profile (protected)
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const { password: _, ...userWithoutPassword } = req.user;
  res.json(userWithoutPassword);
});

// ── ADMIN ROUTES ──

// POST promote a user to admin (admin only)
app.post('/api/admin/promote', authMiddleware, adminMiddleware, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.email === email);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found.' });

  if (db.users[userIndex].role === 'admin') {
    return res.status(400).json({ error: 'User is already an admin.' });
  }

  db.users[userIndex].role = 'admin';
  writeDB(db);

  res.json({ message: `${email} is now an admin.` });
});

// ── ORDER ROUTES ──

// POST full checkout with payment (simulated)
app.post('/api/orders/checkout', authMiddleware, (req, res) => {
  const db = readDB();
  const { items, shipping, payment } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order must have at least one item.' });
  }

  if (!shipping || !shipping.firstName || !shipping.address || !shipping.city) {
    return res.status(400).json({ error: 'Shipping information is required.' });
  }

  if (!payment || !payment.cardLast4) {
    return res.status(400).json({ error: 'Payment information is required.' });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Generate simulated payment reference
  const paymentId = 'pay_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();

  const newOrder = {
    id: orderId,
    userId: req.user.id,
    items,
    subtotal: total,
    shipping: 0,
    tax: 0,
    total,
    shippingAddress: {
      name: `${shipping.firstName} ${shipping.lastName}`,
      email: shipping.email,
      phone: shipping.phone || '',
      address: shipping.address,
      city: shipping.city,
      state: shipping.state,
      zip: shipping.zip,
      country: shipping.country
    },
    paymentId,
    paymentMethod: `${payment.cardBrand} ****${payment.cardLast4}`,
    cardholderName: payment.cardholderName,
    status: 'paid',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  db.orders.push(newOrder);
  writeDB(db);

  console.log(`Order ${orderId} placed by ${req.user.email} — $${total} via ${payment.cardBrand} ****${payment.cardLast4}`);

  res.status(201).json({ message: 'Order placed successfully.', order: newOrder });
});

// POST place an order - legacy simple route (protected)
app.post('/api/orders', authMiddleware, (req, res) => {
  const db = readDB();
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order must have at least one item.' });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const newOrder = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    userId: req.user.id,
    items,
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  db.orders.push(newOrder);
  writeDB(db);
  res.status(201).json({ message: 'Order placed.', order: newOrder });
});

// GET order history for logged-in user (protected)
app.get('/api/orders', authMiddleware, (req, res) => {
  const db = readDB();
  const userOrders = db.orders.filter(o => o.userId === req.user.id);
  res.json({ count: userOrders.length, orders: userOrders });
});

// GET specific order by ID (protected)
app.get('/api/orders/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied.' });
  }
  res.json(order);
});

// ── AI RECOMMENDATION ENDPOINT ──

app.post('/api/ai/recommend', (req, res) => {
  const { prompt, products } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  // Local keyword-based recommendation (no external API needed)
  const keywords = prompt.toLowerCase().split(/\s+/);
  const scored = products.map(p => {
    let score = 0;
    const text = `${p.name} ${p.category} ${p.desc || ''}`.toLowerCase();

    for (const kw of keywords) {
      if (kw.length < 3) continue;
      if (text.includes(kw)) score += 2;
    }

    // Budget matching
    const budgetMatch = prompt.match(/\$?(\d+)/);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1]);
      if (p.price <= budget) score += 3;
      if (p.price <= budget * 0.8) score += 1;
    }

    // Category matching
    const categories = ['tech', 'gaming', 'fashion', 'sneakers'];
    for (const cat of categories) {
      if (prompt.toLowerCase().includes(cat) && p.category.toLowerCase() === cat) {
        score += 5;
      }
    }

    // Boost new/sale items
    if (p.badge === 'new') score += 1;
    if (p.badge === 'sale' && prompt.toLowerCase().includes('deal')) score += 2;
    if (p.badge === 'sale' && prompt.toLowerCase().includes('budget')) score += 2;

    return { ...p, score };
  });

  // Sort by score, take top 3
  const topPicks = scored
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (topPicks.length === 0) {
    // Fallback: return 3 random products
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    topPicks.push(...shuffled.slice(0, 3));
  }

  const responseText = topPicks.map((p, i) => {
    const badge = p.badge ? ` [${p.badge.toUpperCase()}]` : '';
    return `${i + 1}. ${p.name} — $${p.price}${badge}\n${p.desc || p.category + ' product that matches what you\'re looking for.'}`;
  }).join('\n\n');

  res.json({
    recommendation: `Based on what you're looking for, here are my top picks:\n\n${responseText}`
  });
});

// ── START SERVER ──
seedAdmin();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API ready at http://localhost:${PORT}/api`);
  });
}

module.exports = app;
