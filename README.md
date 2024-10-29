# E-commerce Product Management Application

This is a simplified e-commerce product management application built with React 18. It incorporates various libraries for data management, animations, authentication, and user interactions to deliver a seamless, responsive, and engaging shopping experience. 

## Project Features and Requirements

- **Product Listing Page**: Displays products from a mock API in a grid layout with product image, name, price, and an "Add to Cart" button.
- **Product Filtering**: Filter products by categories (e.g., Electronics, Clothing, Home) using React Query for efficient data management.
- **Shopping Cart**: Displays products added to the cart, adjustable quantities, total price, and supports removing items.
- **Smooth Animations**: Add and remove items from the cart with animations powered by Framer Motion.
- **Data Fetching with Suspense**: Uses React 18's Suspense for handling loading states.
- **Responsive Design**: Optimized for mobile and desktop views, styled with Tailwind CSS.
- **Search Functionality**: Search bar filters products with lodash.debounce for optimized performance.
- **User Authentication**: Firebase authentication for basic login/logout and user session management.
- **Persistent Cart**: Stores cart data across sessions with Recoil Persist.
- **Notifications**: Provides feedback on user actions using react-toastify.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Axios
- **State Management**: Recoil
- **Animations**: Framer Motion
- **Data Management**: React Query, Recoil Persist
- **Authentication**: Firebase
- **Other Libraries**: Lodash, react-toastify, react-router-dom

## Project Setup and Commands

Ensure you have **Node.js** and **npm** installed.

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd ecommerce-assignment
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Firebase Configuration**:
   - Copy the `.env.example` file and rename it to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your Firebase configuration values in the `.env` file:
     ```plaintext
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the Development Server**:
    ```bash
    npm run dev
    ```
   Starts the Vite development server at `http://localhost:3000`.

5. **Build the Project**:
    ```bash
    npm run build
    ```
   Compiles TypeScript and builds the project for production.

6. **Preview the Production Build**:
    ```bash
    npm run preview
    ```
   Serves the production build for previewing locally.

7. **Lint the Code**:
    ```bash
    npm run lint
    ```
   Runs ESLint on the project to ensure code quality.

## Folder Structure
ecommerce-assignment/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Application pages (e.g., Product Listing, Cart)
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # Context API files
│   ├── recoil/             # Recoil state management files
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   └── index.tsx           # Entry point
└── README.md

## Dependencies Overview

- **axios**: For data fetching from APIs.
- **firebase**: For user authentication.
- **framer-motion**: For adding smooth animations.
- **lodash** and **lodash.debounce**: For utility functions and optimized search functionality.
- **react-toastify**: For showing notifications on user actions.
- **recoil**: For state management, particularly for handling cart state.
- **react-query**: For data fetching and caching.


## License

This project is for educational purposes only.

