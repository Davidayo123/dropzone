// ── DROPZONE TYPESCRIPT TYPES ──
// This file defines all the data shapes (types/interfaces) used in the app
// TypeScript helps catch bugs before they happen by enforcing structure

// ─────────────────────────────────────
// ── PRODUCT TYPES ──
// ─────────────────────────────────────

// The possible categories a product can belong to
type ProductCategory = 'Tech' | 'Fashion' | 'Sneakers' | 'Gaming';

// The possible badge types (or null if no badge)
type ProductBadge = 'new' | 'sale' | null;

// What a single product looks like
interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;          // Optional — only on sale items
  emoji: string;
  badge: ProductBadge;
  rating: string;
  desc: string;
  createdAt?: string;         // Optional — set by backend
}

// What a product looks like inside the cart
interface CartItem extends Product {
  qty: number;                // Extends Product and adds qty
}

// ─────────────────────────────────────
// ── USER TYPES ──
// ─────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
  createdAt: string;
}

// What we send when registering
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// What we send when logging in
interface LoginPayload {
  email: string;
  password: string;
}

// What the server sends back after login
interface AuthResponse {
  message: string;
  user: Omit<User, 'password'>;  // Omit removes 'password' from the type
  token: string;
}

// ─────────────────────────────────────
// ── ORDER TYPES ──
// ─────────────────────────────────────

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// ─────────────────────────────────────
// ── API RESPONSE TYPES ──
// ─────────────────────────────────────

// Generic API response wrapper
interface ApiResponse<T> {
  message: string;
  data: T;
}

// Product list response
interface ProductListResponse {
  count: number;
  products: Product[];
}

// Order list response
interface OrderListResponse {
  count: number;
  orders: Order[];
}

// ─────────────────────────────────────
// ── EXAMPLE USAGE ──
// ─────────────────────────────────────

// TypeScript will catch this error at compile time:
// const badProduct: Product = {
//   id: 1,
//   name: "Test",
//   category: "Books",   // ❌ Error! "Books" is not a valid ProductCategory
//   price: "100",        // ❌ Error! price must be a number
// };

// TypeScript will allow this:
const exampleProduct: Product = {
  id: 1,
  name: "Gaming Mouse Pro",
  category: "Gaming",    // ✅ Valid category
  price: 79,             // ✅ Number
  emoji: "🖱️",
  badge: "new",
  rating: "4.9★",
  desc: "High-performance gaming mouse"
};

// TypeScript function example — types enforce correct usage
function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total: number, item: CartItem) => {
    return total + (item.price * item.qty);
  }, 0);
}

// TypeScript will catch this at compile time:
// calculateCartTotal("not an array");  // ❌ Error!
// calculateCartTotal([exampleProduct]);  // ❌ Error! CartItem needs qty

const exampleCartItem: CartItem = {
  ...exampleProduct,
  qty: 2
};

console.log(calculateCartTotal([exampleCartItem])); // ✅ Output: 158

// Export types for use across the project
export type {
  Product,
  CartItem,
  User,
  Order,
  OrderStatus,
  ProductCategory,
  ProductBadge,
  RegisterPayload,
  LoginPayload,
  AuthResponse,
  ApiResponse,
  ProductListResponse,
  OrderListResponse
};
