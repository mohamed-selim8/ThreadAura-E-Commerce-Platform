import Logo from "../assets/frontend_assets/logo.png";
import Mobile from "./Mobile";
// icons
import { Search, User, ShoppingBag, Menu } from "lucide-react";

// hooks
import { useMemo, useState, useContext } from "react";
import { MyLatest } from "../contexts/latest";
import { useLocation } from "react-router";
import { Link } from "react-router";
import { useNavigate } from "react-router";

function Navbar() {
  // get pathname
  const { pathname } = useLocation();
  const nav = useNavigate();

  //   all links in nav
  const navLinks = [
    {
      nav: "home",
      path: "/",
    },
    {
      nav: "collection",
      path: "/collection",
    },
    {
      nav: "about",
      path: "/about",
    },
    {
      nav: "contact",
      path: "/contact",
    },
  ];

  //   states
  const [readLinks] = useState(navLinks);
  const [open, setOpen] = useState(false);

  //   showing links
  const resultLinks = useMemo(() => {
    return readLinks.map((item, index) => {
      return (
        <div
          key={index}
          className={` duration-150 ease-linear pb-1 ${pathname === item.path ? "active  " : ""}`}
        >
          <Link to={item.path} className={` uppercase fw-bold`}>
            {item.nav}
          </Link>
        </div>
      );
    });
  }, [pathname, readLinks]);

  // extract context search to handel
  let { usersToken, setShow, showSearch, totalCart, userInfo } =
    useContext(MyLatest);

  // console.log(usersToken);

  // handel logOut

  function logOut() {
    if (usersToken && userInfo) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");

      nav("/login");
    }
  }


  return (
    <div className=" relative px-4  py-9">
      <div className="flex justify-between items-center">
        {/* logo */}
        <img
          src={Logo}
          alt="logo"
          className="w-30 cursor-pointer"
          onClick={() => (usersToken ? null : nav("/login"))}
        />
        {/* pages */}
        <div className={` items-center gap-x-6 hidden md:flex `}>
          {resultLinks}
        </div>
        {/* profile settings*/}
        <div className="flex items-center gap-x-5">
          {/* search icon */}
          <Search
            onClick={() => {
              setShow(!showSearch);
            }}
            className={`cursor-pointer ${pathname !== "/" && pathname !== "/collection" ? "hidden" : "block"}`}
          />

          {/* drop down list */}
          <div className="group relative ">
            <User
              onClick={() => (usersToken ? null : nav("/login"))}
              className="cursor-pointer"
            />
            <div
              className={`${usersToken ? " group-hover:block" : " group-hover:hidden"} hidden dropdown-menu absolute right-0 pt-4 cursor-pointer   `}
            >
              <div className="flex flex-col gap-y-2 bg-slate-100 text-gray-500 w-36 py-3 px-5 rounded-2xl">
                <Link
                  to={"/profile"}
                  className=" cursor-pointer text-center hover:text-black capitalize fw "
                >
                  my profile
                </Link>

                <Link
                  to={"/orders"}
                  className=" cursor-pointer text-center hover:text-black  capitalize"
                >
                  orders
                </Link>

                <button
                  type="button"
                  className=" cursor-pointer hover:text-black capitalize"
                  onClick={logOut}
                >
                  logout
                </button>
              </div>
            </div>
          </div>

          {/* cart */}
          <Link to={"/cart"} className="relative">
            <ShoppingBag />
            <p className="bg-black absolute aspect-square -bottom-1.25 -right-1.25 text-white text-[10px] leading-4 text-center w-4 rounded-full ">
              {totalCart()}
            </p>
          </Link>

          {/* menu mobile */}
          <Menu
            className="md:hidden cursor-pointer "
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      {/* mobile menu */}
      {open && <Mobile opens={{ setOpen, open }} />}
    </div>
  );
}

export default Navbar;
