import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { SellerDashboard } from "./components/seller/SellerDashboard";
import { SellerProducts } from "./components/seller/SellerProducts";
import { AddProduct } from "./components/seller/AddProduct";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminProducts } from "./components/admin/AdminProducts";
import { Orders } from "./components/Orders";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "orders", Component: Orders },
      { path: "login", Component: Login },

      // Seller routes
      { path: "seller", Component: SellerDashboard },
      { path: "seller/products", Component: SellerProducts },
      { path: "seller/add-product", Component: AddProduct },

      // Admin routes
      { path: "admin", Component: AdminDashboard },
      { path: "admin/users", Component: AdminUsers },
      { path: "admin/products", Component: AdminProducts },

      { path: "*", Component: NotFound },
    ],
  },
]);
