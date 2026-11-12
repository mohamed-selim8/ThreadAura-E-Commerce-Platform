import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// provider
let MyLatest = createContext(null);

// function to be public to any component want it

export default function LatestContext({ children }) {
  let shopping_fee = 10;
  let currency = "$";
  let price = 10;
  // all items
  const [latest, setLatest] = useState([]);
  useEffect(() => {
    async function getApi() {
      const req = await axios.get("http://localhost:3000/products/");
      const items = req.data.totalItem;
      if (req.status === 200 && req.statusText === "OK") {
        setLatest(items);
      }
      // console.log(req.data.totalItem);
    }
    getApi();
  }, []);

  // console.log(latest);

  // search
  let [search, setSearch] = useState("");
  let [showSearch, setShow] = useState(true);

  // user token
  const [usersToken, setToken] = useState(
    localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : null,
  );
  // userInfo
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  );

  // add to cart
  const [cartItems, setCartItems] = useState({});
  async function addToCart(itemId, size) {
    if (!size) {
      toast.error("no size selected");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (usersToken) {
      try {
        let url = "http://localhost:3000/cart/add";
        await axios.post(
          url,
          { itemId, size },
          {
            headers: {
              Authorization: usersToken,
            },
          },
        );
        toast.success("item add in cart");
      } catch (err) {
        console.log(err);
      }
    }
  }

  const totalCart = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const ele in cartItems[items]) {
        try {
          // console.log(cartItems[items]);

          if (cartItems[items][ele] > 0) {
            totalCount += cartItems[items][ele];
          }
        } catch (err) {
          toast.error("msg ", err);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (usersToken) {
      try {
        const url = "http://localhost:3000/cart/update";
        await axios.post(
          url,
          { itemId, size, quantity },
          {
            headers: { Authorization: usersToken },
          },
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = latest.find((product) => product._id === items);
      // console.log("item :", itemInfo);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {
          toast.error(err);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    // console.log(userInfo, "ui");
    // console.log(cartItems);
  }, [cartItems, userInfo]);

  let value = {
    latest,
    shopping_fee,
    currency,
    price,
    showSearch,
    setShow,
    search,
    setSearch,
    usersToken,
    setToken,
    cartItems,
    addToCart,
    totalCart,
    updateQuantity,
    getCartAmount,
    setCartItems,
    userInfo,
    setUserInfo,
  };
  return (
    <div>
      <MyLatest.Provider value={value}>{children}</MyLatest.Provider>
    </div>
  );
}

export { MyLatest };
