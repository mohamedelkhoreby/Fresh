import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserContextProvider from './Component/Context/UserContext';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Component/Context/CartContext';
let queryClint = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
        <UserContextProvider>
            <QueryClientProvider client={queryClint}>
                <App />
            </QueryClientProvider>
        </UserContextProvider>
    </CartContextProvider>
);
