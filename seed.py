#!/usr/bin/env python3
"""
DROPZONE — Product Data Seed Script
====================================
This Python script generates fake product data and seeds the db.json file.
Run with: python3 seed.py

This demonstrates:
- Python file I/O
- JSON handling
- List comprehensions
- f-strings
- Random data generation
- Working with dictionaries
"""

import json
import random
import os
from datetime import datetime, timedelta

# ── PRODUCT DATA ──
PRODUCTS = [
    # TECH
    {"name": "AirPod Pro Max Clone", "category": "Tech", "price": 89, "emoji": "🎧", "badge": "new", "rating": "4.8★", "desc": "Premium wireless earbuds with active noise cancellation, 30hr battery life and crystal-clear audio."},
    {"name": "Mechanical Keyboard RGB", "category": "Tech", "price": 129, "emoji": "⌨️", "badge": None, "rating": "4.9★", "desc": "Tactile mechanical switches with full RGB backlight. Hot-swappable keys, aluminium frame, wireless + USB-C."},
    {"name": "4K Webcam Pro", "category": "Tech", "price": 79, "oldPrice": 110, "emoji": "📷", "badge": "sale", "rating": "4.7★", "desc": "Ultra-sharp 4K streaming webcam with AI background blur, ring light and noise-canceling mic."},
    {"name": "Portable SSD 2TB", "category": "Tech", "price": 149, "emoji": "💾", "badge": "new", "rating": "4.9★", "desc": "Blazing-fast 2TB portable SSD. 1050MB/s read speeds, USB 3.2 Gen 2, drop-proof aluminium shell."},
    {"name": "Smart Watch Ultra", "category": "Tech", "price": 199, "emoji": "⌚", "badge": None, "rating": "4.8★", "desc": "Advanced health tracking smartwatch with ECG, SpO2, GPS and 7-day battery."},
    {"name": "Wireless Charger Pad", "category": "Tech", "price": 39, "oldPrice": 55, "emoji": "🔋", "badge": "sale", "rating": "4.6★", "desc": "15W fast wireless charging pad compatible with all Qi devices."},

    # FASHION
    {"name": "Oversized Hoodie Drop", "category": "Fashion", "price": 75, "emoji": "👕", "badge": "new", "rating": "4.9★", "desc": "Heavy 400GSM cotton fleece oversized hoodie. Dropped shoulders, kangaroo pocket, embroidered logo."},
    {"name": "Cargo Pants Wide Leg", "category": "Fashion", "price": 95, "emoji": "👖", "badge": None, "rating": "4.7★", "desc": "Relaxed fit wide-leg cargo pants with 6 pockets. Ripstop fabric, drawstring waist."},
    {"name": "Puffer Jacket Y2K", "category": "Fashion", "price": 145, "emoji": "🧥", "badge": "new", "rating": "4.8★", "desc": "Y2K inspired puffer jacket with metallic finish. Water-resistant, insulated, zip-off sleeves."},
    {"name": "Graphic Tee Bundle", "category": "Fashion", "price": 55, "oldPrice": 80, "emoji": "👔", "badge": "sale", "rating": "4.6★", "desc": "Pack of 3 premium graphic tees. 100% cotton, screen-printed artwork, pre-shrunk."},

    # SNEAKERS
    {"name": "Foam Runner Slides", "category": "Sneakers", "price": 85, "emoji": "👟", "badge": "new", "rating": "4.9★", "desc": "Ultra-light EVA foam slides inspired by the iconic runner silhouette."},
    {"name": "High Top Retro 90s", "category": "Sneakers", "price": 120, "emoji": "👠", "badge": None, "rating": "4.8★", "desc": "Classic high-top silhouette with retro 90s detailing. Vulcanised rubber sole, suede/canvas upper."},
    {"name": "Chunky Dad Shoe", "category": "Sneakers", "price": 110, "oldPrice": 145, "emoji": "👞", "badge": "sale", "rating": "4.6★", "desc": "Maximalist chunky sneaker with triple-stack sole. Mesh and leather upper, premium comfort insole."},
    {"name": "Collab Limited Drop", "category": "Sneakers", "price": 250, "emoji": "✨", "badge": "new", "rating": "5.0★", "desc": "Exclusive limited collab sneaker drop. Numbered pairs, premium materials, includes collectible box."},

    # GAMING
    {"name": "Pro Gaming Mouse", "category": "Gaming", "price": 79, "emoji": "🖱️", "badge": "new", "rating": "4.9★", "desc": "25,600 DPI optical gaming mouse with 11 programmable buttons. 60hr battery, dual wireless."},
    {"name": "RGB Headset 7.1", "category": "Gaming", "price": 99, "emoji": "🎧", "badge": None, "rating": "4.8★", "desc": "Surround sound 7.1 gaming headset with RGB lighting. Noise-canceling flip mic, memory foam ear cups."},
    {"name": "Gaming Chair Racer", "category": "Gaming", "price": 299, "oldPrice": 399, "emoji": "🪑", "badge": "sale", "rating": "4.7★", "desc": "Ergonomic racing style gaming chair with lumbar and neck pillows. 4D armrests, reclining up to 180°."},
    {"name": "Controller Pro Pad", "category": "Gaming", "price": 69, "emoji": "🎮", "badge": None, "rating": "4.9★", "desc": "Premium wired/wireless gaming controller. Hall effect sticks, back paddles, trigger stops."},
]

def generate_products():
    """Add unique IDs and timestamps to all products"""
    products = []
    for i, product in enumerate(PRODUCTS):
        # Generate a random date in the past 6 months
        days_ago = random.randint(1, 180)
        created_at = (datetime.now() - timedelta(days=days_ago)).isoformat()

        products.append({
            "id": i + 1,
            **product,           # Unpack all product fields
            "createdAt": created_at
        })
    return products

def generate_users():
    """Generate some fake users"""
    users = [
        {
            "id": 1,
            "name": "David Admin",
            "email": "admin@dropzone.com",
            "password": "admin123",           # ⚠️ In production: hash passwords!
            "token": "admin-token-123",
            "createdAt": datetime.now().isoformat()
        },
        {
            "id": 2,
            "name": "Test User",
            "email": "test@dropzone.com",
            "password": "test123",
            "token": "test-token-456",
            "createdAt": datetime.now().isoformat()
        }
    ]
    return users

def seed_database():
    """Main function — builds and writes the database"""
    print("🌱 Seeding DROPZONE database...")

    products = generate_products()
    users = generate_users()

    # Build the full database object
    db = {
        "products": products,
        "users": users,
        "orders": []            # Empty orders to start
    }

    # Write to db.json
    db_path = os.path.join(os.path.dirname(__file__), 'db.json')
    with open(db_path, 'w') as f:
        json.dump(db, f, indent=2)

    # Print summary
    print(f"✅ Database seeded successfully!")
    print(f"📦 Products: {len(products)}")
    print(f"👥 Users: {len(users)}")
    print(f"📋 Orders: 0")
    print(f"📁 Saved to: {db_path}")
    print()

    # Print product breakdown by category
    categories = {}
    for p in products:
        cat = p['category']
        categories[cat] = categories.get(cat, 0) + 1  # Count by category

    print("📊 Products by category:")
    for cat, count in categories.items():
        print(f"   {cat}: {count} products")

    print()
    print("🔑 Test credentials:")
    print("   Admin: admin@dropzone.com / admin123")
    print("   User:  test@dropzone.com  / test123")

if __name__ == '__main__':
    seed_database()
