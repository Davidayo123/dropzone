# Dropzone — Walkthrough

## Changes Made

### 1. Registration → Login Redirect
After registering, users now see **"Please sign in to continue"** with a **"Sign In →"** button that switches to the login tab — instead of auto-logging in and going to the store.

### 2. Login / Logout Toggle
The nav dynamically shows:
- **Not logged in** → shows "Login" link  
- **Logged in** → shows "Logout" link (clears session and reloads)

### 3. Admin-Only Visibility
- The **Admin** link in the nav is hidden by default
- It only appears when the logged-in user has `role: "admin"`
- [admin.html](file:///c:/Users/HP/Documents/dropzone/admin.html) has an auth guard — non-admins are redirected to [index.html](file:///c:/Users/HP/Documents/dropzone/index.html)

### 4. Role System & Admin Promotion
- Users get `role: "user"` on registration
- A **default admin** is seeded on server startup: `admin@dropzone.com` / `admin123`
- To promote a user to admin, call:
```
POST /api/admin/promote
Headers: Authorization: Bearer <admin_token>
Body: { "email": "user@example.com" }
```

### 5. AI Feature Fixed
The AI was calling `api.anthropic.com` directly from the browser (CORS blocked, no API key). Now it calls `POST /api/ai/recommend` on our server, which does **local keyword-based matching** against the product catalog.

### 6. Vibecoded Cleanup
- Removed ASCII art banner from server startup
- Removed "No cap." slang from hero subtitle
- Cleaned up emoji-heavy code comments

---

## Backend Flow Explained

### Registration Flow
```
Browser (auth.html)                    Server (server.js)
       |                                     |
       |  POST /api/auth/register            |
       |  { name, email, password }          |
       | ----------------------------------> |
       |                                     | 1. Read db.json
       |                                     | 2. Check if email exists
       |                                     | 3. Create user object:
       |                                     |    { id, name, email,
       |                                     |      password, role:"user",
       |                                     |      token, createdAt }
       |                                     | 4. Save to db.json
       |  { message, user (no password) }    |
       | <---------------------------------- |
       |                                     |
       | Show "Account Created" message      |
       | Switch to login tab                 |
```

### Login Flow
```
Browser (auth.html)                    Server (server.js)
       |                                     |
       |  POST /api/auth/login               |
       |  { email, password }                |
       | ----------------------------------> |
       |                                     | 1. Read db.json
       |                                     | 2. Find user by email+password
       |                                     | 3. Return user data + token
       |  { user, token }                    |
       | <---------------------------------- |
       |                                     |
       | Save to localStorage:              |
       |   dropzone_current_user → user obj  |
       |   dropzone_token → token string     |
       | Redirect to index.html              |
```

### Nav State (index.html loads)
```
1. Read localStorage → dropzone_current_user
2. If user exists:
   - Show "Logout" (not "Login")
   - If user.role === "admin" → show "Admin" link
   - Else → hide "Admin" link
3. If no user:
   - Show "Login"
   - Hide "Admin"
```

### Protected Routes (e.g. placing orders)
```
Browser                                Server
       |                                     |
       |  POST /api/orders                   |
       |  Headers: Authorization: Bearer TOKEN|
       | ----------------------------------> |
       |                              authMiddleware:
       |                              1. Extract token from header
       |                              2. Find user in db.json by token
       |                              3. If found → attach to req.user
       |                              4. If not → 401 Unauthorized
       |                                     |
       |  Response                           |
       | <---------------------------------- |
```

### Admin Routes (e.g. creating products)
```
Browser                                Server
       |                                     |
       |  POST /api/products                 |
       |  Headers: Authorization: Bearer TOKEN|
       | ----------------------------------> |
       |                              authMiddleware → checks token
       |                              adminMiddleware → checks role==="admin"
       |                              If both pass → create product
       |                                     |
       |  Response                           |
       | <---------------------------------- |
```

---

## Test Results — All Passed

| Test | Result |
|------|--------|
| Login visible, Admin hidden (not logged in) | ✅ |
| Registration redirects to login tab | ✅ |
| Regular user: Logout visible, Admin hidden | ✅ |
| Admin user: Admin + Logout both visible | ✅ |
| AI returns product recommendations | ✅ |

### Recording

![Full test flow recording](C:/Users/HP/.gemini/antigravity/brain/754e390d-df7c-482b-8a46-661eec759dc8/full_flow_recording.webp)
