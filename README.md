# Paradise Nursery 🌿 — Houseplant Shopping Application

Paradise Nursery is an elegant, responsive React e-commerce single-page application crafted for plant lovers. It offers an intuitive online shopping experience where users can discover diverse houseplant collections, filter by botanical categories, manage a dynamic shopping cart powered by Redux Toolkit, and proceed to checkout.

---

## 🌟 Key Features

- **Botanical Landing Page (`App.jsx`, `App.css`)**:
  - Immersive full-screen background photo styling with readability overlays.
  - Distinct company branding and tagline: *"Where Greenery Meets Serenity"*.
  - Prominent "Get Started" call-to-action button seamlessly routing users to the plant catalog.
  
- **Rich About Us Section (`AboutUs.jsx`)**:
  - Detailed background story showcasing Paradise Nursery's passion for indoor air quality and horticulture.
  - Highlights core values: Hand-nurtured plants, 100% quality guarantee, botanical care support, and eco-packaging.

- **Dynamic Plant Catalog (`ProductList.jsx`)**:
  - **3 Botanical Categories**: *Air Purifying Plants*, *Aromatic & Herbal Plants*, and *Low Maintenance & Succulents*.
  - **18 Unique Products** (6 distinct plants in each category) with custom IDs, names, Indian Rupee (`₹`) pricing, descriptions, and high-resolution thumbnails.
  - Category filter pills for rapid browsing.
  - "Add to Cart" functionality integrated with Redux state.
  - Automatic button state tracking: buttons dynamically update to **"Added to Cart"** and become disabled once a plant is in the cart.
  - Responsive navbar with instant cart badge count updates.

- **Interactive Shopping Cart (`CartItem.jsx`)**:
  - Itemized cart table showing plant thumbnails, titles, categories, and unit prices.
  - Dynamic per-item subtotal calculation (`unit price × quantity`).
  - Grand total price and total plant count updated in real time.
  - Quantity controls (`+` and `-`) with automatic threshold handling (prevents negative values; decrements to zero safely remove the item).
  - Individual item removal and one-click "Clear All" cart actions.
  - "Continue Shopping" button navigating smoothly back to `/plants`.
  - "Proceed to Checkout" modal displaying an order summary and *"Checkout Coming Soon!"* message.
  - Friendly empty-cart state guiding users back to the store.

- **Centralized Redux State Management (`redux/CartSlice.jsx`)**:
  - Built with `@reduxjs/toolkit` and `react-redux`.
  - Immutable actions: `addItem`, `increaseQuantity`, `decreaseQuantity`, `removeItem`, `clearCart`.
  - Robust selectors for item queries, total item count, and aggregate monetary total.

---

## 🛠️ Technologies Used

- **React 19**
- **Vite** (Next Generation Frontend Tooling)
- **Redux Toolkit (`@reduxjs/toolkit`)** & **React-Redux**
- **React Router DOM v7** (Declarative client-side routing)
- **Lucide React** (Clean, modern iconography)
- **Vanilla CSS3** (Custom responsive design with CSS variables, Flexbox, and Grid)

---

## 🚀 Setup & Installation Instructions

Follow these steps to run Paradise Nursery locally on your machine:

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### 2. Clone the Repository
```bash
git clone https://github.com/HarshitJain26-2/paradise-nursery.git
cd paradise-nursery
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to the local address displayed in the terminal (typically `http://localhost:5173`).

### 5. Build for Production
To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🧭 Application Routing

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | **Landing Page** | Welcome hero, branding, About Us section, and "Get Started" CTA |
| `/plants` | **Product Catalog** | Filterable catalog of 18+ plants with Add-to-Cart controls |
| `/cart` | **Shopping Cart** | Full cart management, quantity toggles, subtotals, and checkout |

---

## 📁 Repository Structure

```
paradise-nursery/
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── AboutUs.jsx
│   ├── Navbar.jsx
│   ├── ProductList.jsx
│   ├── CartItem.jsx
│   ├── data/
│   │   └── plants.js
│   ├── redux/
│   │   └── CartSlice.jsx
│   └── store/
│       └── store.js
```

---

## 🌿 Cultivated with Passion
Crafted for the Coursera / edX React Frontend Development Program.
