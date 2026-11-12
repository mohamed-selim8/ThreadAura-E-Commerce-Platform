import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Searchbar from "./components/Search";
import { useLocation } from "react-router-dom";

// toasqtify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin";
import Adding from "./components/Users";
import ProdAdmin from "./components/ProdAdmin";
import CheckOut from "./components/CheckOut";

import TraceOrders from "./components/TraceOrders";
import Profile from "./pages/Profile";
function App() {
  let { pathname } = useLocation();
  let paths = ["/", "/collection"];

  return (
    <div>
      {/* navbar to apply in all route */}

      {pathname === "/admin" ||
      pathname === "/admin/add" ||
      pathname === "/admin/products" ||
      pathname === "/login" ||
      pathname === "/admin/orders" ? null : (
        <Navbar />
      )}

      <ToastContainer />
      {paths.includes(pathname) && <Searchbar />}

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="products" element={<ProdAdmin />} />
          <Route path="add" element={<Adding />} />
          <Route path="orders" element={<TraceOrders />} />
        </Route>
        <Route path="/place-order" element={<CheckOut />} />

        <Route path="/product/:prod_id" element={<Product />} />
      </Routes>

      {pathname === "/admin" ||
      pathname === "/admin/add" ||
      pathname === "/admin/products" ||
      pathname === "/login" ||
      pathname == "/place-order" ||
      pathname === "/admin/orders" ? null : (
        <Footer />
      )}
    </div>
  );
}

export default App;
