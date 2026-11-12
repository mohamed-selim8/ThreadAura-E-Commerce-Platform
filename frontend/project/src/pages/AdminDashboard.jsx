import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router";
import {
  House,
  FilePlusCorner,
  X,
  Sun,
  MoonIcon,
  Menu,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import { assets } from "../assets/admin_assets/assets";

function AdminDashboard() {
  // admin logo
  const { logo } = assets;

  const container = useRef();

  const [isOpen, setIsOpen] = useState(true);

  //btn static bg
  const [bg, setBg] = useState("add");

  // mode
  const [mode, setMode] = useState(false);

  function exit() {
    localStorage.removeItem("token");
  }

  // handle mode
  useEffect(() => {
    if (mode) {
      container.current.classList.add("mode");
    } else {
      container.current.classList.remove("mode");
    }
  }, [mode]);

  return (
    <div
      ref={container}
      className={`min-h-screen transition-colors duration-300 ${
        mode ? "bg-gray-100" : "bg-slate-900"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-18 px-6 flex items-center justify-between border-b z-50 backdrop-blur-md transition-all
        ${
          mode
            ? "bg-white/90 border-gray-200 text-black"
            : "bg-slate-800/90 border-slate-700 text-white"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition
            ${
              mode
                ? "bg-slate-900 text-white hover:bg-slate-700"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <img src={logo} className="w-28" alt="logo" />
        </div>

        <h1 className="hidden md:block text-2xl font-bold tracking-wide">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setMode(!mode)}
          className={`p-2 rounded-lg transition
          ${
            mode ? "bg-yellow-100 text-yellow-500" : "bg-slate-700 text-white"
          }`}
        >
          {mode ? <Sun size={20} /> : <MoonIcon size={20} />}
        </button>
      </header>

      {/* Sidebar */}
      {isOpen && (
        <aside
          className={`fixed left-0 top-18 h-[calc(100vh-72px)] w-72 flex flex-col justify-between border-r transition-all duration-300
          ${
            mode
              ? "bg-white border-gray-200 text-gray-700"
              : "bg-slate-800 border-slate-700 text-gray-200"
          }`}
        >
          <div className="p-5 space-y-3">
            <Link
              onClick={() => setBg("add")}
              to="/admin/add"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${bg === "add" ? "bg-sky-500" : ""}  hover:bg-sky-500 hover:text-white transition`}
            >
              <FilePlusCorner size={20} />
              <span>Add Item</span>
            </Link>

            <Link
              onClick={() => setBg("products")}
              to="/admin/products"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${bg === "products" ? "bg-sky-500" : ""} hover:bg-sky-500 hover:text-white transition`}
            >
              <ShoppingBag size={20} />
              <span>List Items</span>
            </Link>

            <Link
              onClick={() => setBg("orders")}
              to="/admin/orders"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${bg === "orders" ? "bg-sky-500" : ""} hover:bg-sky-500 hover:text-white transition`}
            >
              <House size={20} />
              <span>Orders</span>
            </Link>
          </div>

          <div className="p-5 border-t border-gray-300 dark:border-slate-700">
            <button
              onClick={exit}
              className="flex items-center cursor-pointer justify-center gap-2 w-full rounded-xl bg-red-500 py-3 text-white hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main */}
      <main
        className={` px-6 pb-6 transition-all duration-300 ${
          isOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div
          className={`rounded-2xl p-5 min-h-[calc(100vh-120px)]
          ${mode ? "bg-white shadow-lg" : "bg-slate-800 shadow-xl text-white"} overflow-hidden`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
