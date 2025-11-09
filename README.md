# 📦 Inventory Management System

![App Preview](https://imgix.cosmicjs.com/583876e0-bdae-11f0-aa2d-57621712db72-photo-1580480055273-228ff5388ef8-1762721676205.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive inventory management system built with Next.js 16 and Cosmic CMS. Track products, manage stock levels, organize by categories, and monitor multiple locations with a modern, responsive interface.

## ✨ Features

- **📊 Real-time Dashboard** - View inventory statistics, stock levels, and value at a glance
- **🔍 Product Search & Filter** - Find products by name, category, location, or status
- **📦 Product Management** - View detailed product information with images and specifications
- **🏢 Category Organization** - Organize inventory by customizable categories
- **📍 Multi-Location Tracking** - Monitor inventory across multiple warehouses and stores
- **⚠️ Low Stock Alerts** - Visual indicators for products below minimum stock levels
- **💰 Inventory Valuation** - Real-time calculation of total inventory value
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop devices

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6910fec1fb7423bbdde4f73a&clone_repository=691100bdfb7423bbdde4f761)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Cms type inventory management site for mobile and desktop"

### Code Generation Prompt

> Based on the content model I created for "Cms type inventory management site for mobile and desktop", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **imgix** - Image optimization and transformation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket (your existing bucket: finovate360-production)

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=finovate360-production
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Products
```typescript
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Products by Category
```typescript
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Fetching Low Stock Products
```typescript
const products = (await cosmic.objects
  .find({ type: 'products' })
  .depth(1)).objects

const lowStockProducts = products.filter(p => 
  p.metadata.quantity <= (p.metadata.low_stock_alert || 0)
)
```

## 🎨 Cosmic CMS Integration

This application uses your existing Cosmic content model:

- **Products** - Main inventory items with SKU, pricing, quantities, and images
- **Categories** - Product categories (Electronics, Office Supplies, Furniture)
- **Locations** - Storage locations (Warehouses, Stores, Distribution Centers)

The app automatically fetches and displays all your inventory data with real-time updates from Cosmic CMS.

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

## 📄 License

MIT License - feel free to use this project for your own inventory management needs.

<!-- README_END -->