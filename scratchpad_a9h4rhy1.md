# Testing Checklist

- [x] **Test 1: Homepage Nav (not logged in)**
  - [x] Navigate to http://localhost:3000
  - [x] Verify "Login" link is visible
  - [x] Verify "Admin" link is NOT visible
  - [x] Verify "Logout" link is NOT visible

- [x] **Test 2: Registration → Login redirect**
  - [x] Click "Login" link in nav
  - [x] Click "Register" tab
  - [x] Fill form: Test / test@test.com / testpass123 / testpass123
  - [x] Click "Create Account"
  - [x] Verify success message and "Sign In" button (not "Start Shopping")
  - [x] Click "Sign In" to switch to login tab

- [x] **Test 3: Login as regular user → check nav**
  - [x] Login with test@test.com / testpass123
  - [x] Click "Sign In"
  - [x] Click "Go to Store" to go back to index.html
  - [x] Verify "Logout" link is visible (not "Login")
  - [x] Verify "Admin" link is NOT visible
  - [x] Click "Logout"
  - [x] Verify "Login" link is visible (not "Logout")

- [x] **Test 4: Login as admin → check nav**
  - [x] Click "Login" in nav
  - [x] Login with admin@dropzone.com / admin123
  - [x] Click "Sign In"
  - [x] Click "Go to Store"
  - [x] Verify "Logout" link is visible
  - [x] Verify "Admin" link is visible

- [x] **Test 5: AI Feature**
  - [x] Scroll down to AI section
  - [x] Click "Gaming under $100" or type it
  - [x] Click "Ask AI"
  - [x] Verify product recommendations are shown (not error)
