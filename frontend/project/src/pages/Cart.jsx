import { useContext, useEffect, useState } from "react";
import { MyLatest } from "../contexts/latest";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import Title from "../components/Title";
import ShopCart from "../components/ShopCart";

function Cart() {
  let nav = useNavigate();
  const {
    latest,
    cartItems,
    currency,
    updateQuantity,
    getCartAmount,
    usersToken,
  } = useContext(MyLatest);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    function myCart() {
      let tempData = [];
      for (const items in cartItems) {
        for (const ele in cartItems[items]) {
          if (cartItems[items][ele] > 0) {
            tempData.push({
              _id: items,
              size: ele,
              quantity: cartItems[items][ele],
            });
          }
        }
      }
      setCartData(tempData);
      console.log(tempData);
    }
    myCart();
  }, [cartItems]);

  if (!usersToken) {
    nav("/login");
    return;
  }
  if (getCartAmount() <= 0) {
    return <div className="text-center">no items selected</div>;
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <p className="mb-2 text-ba-400">MY ITEMS</p>
      {cartData.map((item, index) => {
        const productData = latest.find((product) => product._id === item._id);
        return (
          <div
            key={index}
            className=" py-4 border-t border-b  text-gray-700 gap-4 items-center"
          >
            <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-6  ">
              <img
                src={productData.image[0]}
                className="w-100 sm:w-20"
                alt=""
              />
              <div>
                <p className=" text-xs sm:text-lg font-medium text-center sm:text-start">
                  {productData.name}
                </p>
                <div className=" flex justify-center sm:justify-baseline items-center gap-5 mt-2">
                  <p>{currency + productData.price}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
              <div className="flex justify-center sm:justify-baseline flex-row items-center gap-4">
                <input
                  onChange={(e) =>
                    e.target.value == "" || e.target.value == "0"
                      ? null
                      : updateQuantity(
                          productData._id,
                          item.size,
                          Number(e.target.value),
                        )
                  }
                  className=" border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:py-2 py-1"
                  type="number"
                  name="number"
                  min={1}
                  defaultValue={item.quantity}
                />

                <p className="bg-indigo-100 w-8 h-8 flex items-center justify-center shadow rounded-full cursor-pointer">
                  <Trash2
                    className="text-red-500 w-5"
                    onClick={() =>
                      updateQuantity(productData._id, item.size, 0)
                    }
                  />
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className=" grid grid-cols-2">
        <div></div>
        <div>
          {/* cart title */}
          <Title>
            <div className="text-center my-10 ">
              <p className="text-gray-500 mb-3 text-lg sm:text-3xl gap-2 inline-flex capitalize relative">
                CART
                <span className="text-gray-700 font-medium ">TOTALS</span>
                <span className="bg-gray-700 hidden sm:block w-8 sm:w-12 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-25%] sm:right-[-39%] "></span>
              </p>
            </div>
          </Title>
          <ShopCart />
        </div>
      </div>
    </div>
  );
}

export default Cart;
