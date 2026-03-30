# User Web - E-commerce Platform

A modern, full-stack e-commerce web application built with Next.js 16, featuring both customer-facing and admin interfaces for product management, inventory tracking, and order processing.

## 🛍️ Features

### Customer Interface
- **Home Page** with promotional banners and product recommendations
- **Product Catalog** with filtering and search capabilities
- **Shopping Cart** and checkout system
- **User Profile** management
- **Responsive Design** optimized for mobile and desktop

### Admin Dashboard
- **Product Management** - Create, update, and manage products with variants
- **Inventory Control** - Track receipts, batches, and serial numbers
- **Category Management** - Organize product catalog
- **User Management** - Customer administration
- **Invoice Processing** - Order management and tracking
- **Notifications** - System alerts and updates

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **TipTap** - Rich text editor

### State Management
- **Zustand** - Lightweight state management
- **React DnD** - Drag and drop functionality

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/              # Customer-facing routes
│   │   ├── carts/          # Shopping cart
│   │   ├── checkout/       # Checkout process
│   │   ├── products/       # Product pages
│   │   └── profile/        # User profile
│   ├── admin/              # Admin dashboard
│   │   ├── categories/     # Category management
│   │   ├── inventories/    # Inventory & receipts
│   │   ├── products/       # Product management
│   │   ├── users/          # User administration
│   │   └── invoices/       # Order management
│   └── auth/               # Authentication
├── components/
│   ├── layout/             # Layout components
│   ├── product/            # Product components
│   ├── ui/                 # Reusable UI components
│   └── user/               # User-related components
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand stores
├── lib/                    # Utility libraries
└── utils/                  # Helper functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Package manager (npm, yarn, pnpm, or bun)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-web
```

2. Install dependencies:
```bash
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
bun dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint issues
- `bun format` - Format code with Prettier
- `bun format:check` - Check code formatting

## 🎯 Key Features

### Product Management
- **Product Variants** - Support for size, color, and other variations
- **Image Management** - Sortable product images
- **Category Organization** - Hierarchical category structure
- **Inventory Tracking** - Batch and serial number management

### Admin Interface
- **Dashboard Layout** - Clean, responsive admin sidebar
- **Data Tables** - Sortable, filterable data displays
- **Forms** - Optimized product and category creation forms
- **Notifications** - Real-time admin notifications

### User Experience
- **Vietnamese Language Support** - Localized content and UI
- **Responsive Design** - Mobile-first approach
- **Performance** - Optimized with Next.js features
- **Accessibility** - Built with Radix UI components

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory for environment-specific configuration.

### Tailwind CSS
The project uses Tailwind CSS 4 with custom configuration in `tailwind.config.ts`.

### TypeScript
Strict TypeScript configuration with comprehensive type definitions in the `types/` directory.

## 📦 Dependencies

### Key Libraries
- `@radix-ui/*` - UI component primitives
- `framer-motion` - Animations
- `zustand` - State management
- `@tiptap/*` - Rich text editing
- `cmdk` - Command palette functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team.
