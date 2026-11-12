import Title from "./Title";
import ShopCart from "./ShopCart";
import { CircleSmall } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { MyLatest } from "../contexts/latest";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
function CheckOut() {
  const nav = useNavigate();
  const {
    cartItems,
    setCartItems,
    usersToken,
    getCartAmount,
    currency,
    latest,
  } = useContext(MyLatest);

  let [pay, setPay] = useState("cash");
  let [inpts, setInpts] = useState({
    frist: "",
    last: "",
    email: "",
    street: "",
    city: "",
    z_IP: "",
    phone: "",
    country: "",
    state: "",
  });

  const handelInputs = (e) => {
    let { value, name } = e.target;
    setInpts({ ...inpts, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            latest.find((product) => product._id === items),
          );

          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    console.log(orderItems, "from order method");
    console.log(cartItems, "from order method cart");

    let orderData = {
      items: orderItems,
      amount: getCartAmount() + currency,
      address: inpts,
    };

    // functionality based on pay

    if (usersToken) {
      if (
        inpts.frist == "" ||
        inpts.email == "" ||
        inpts.last == "" ||
        inpts.country == "" ||
        inpts.city == "" ||
        inpts.phone == "" ||
        inpts.phone.length < 11
      ) {
        return toast.error("data not complete");
      } else {
        if (pay === "cash") {
          const url = "http://localhost:3000/orders/cash";
          const { data } = await axios.post(
            url,
            {
              items: orderData,
              amount: getCartAmount(),
              address: inpts,
            },
            {
              headers: {
                Authorization: usersToken,
              },
            },
          );
          const { success } = await data;
          console.log(success, "req");

          if (success) {
            setCartItems({});
            nav("/orders");
            toast.success("sended");
          } else {
            toast.error("not update");
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(inpts);
  }, [inpts]);

  return (
    <div className=" border-t-gray-200 border-t-2 px-4 sm:px-6 lg:px-8">
      <div className="">
        <form onSubmit={handelSubmit}>
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-40">
            
            {/* inputs info */}
            <div>
              {/* title  */}
              <Title>
                <div className="my-4 px-2 ">
                  <p className="text-gray-500 mb-3 sm:text-3xl gap-2 inline-flex capitalize relative text-lg">
                    delivery
                    <span className="text-gray-700 text-lg sm:text-3xl ">
                      information
                    </span>
                    <span className="bg-gray-700 w-5 sm:w-6 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-17%] sm:right-[-13%] "></span>
                  </p>
                </div>
              </Title>
              {/* inputs */}
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
                  <input
                    onChange={handelInputs}
                    value={inpts.frist}
                    name="frist"
                    type="text"
                    placeholder="Frist name"
                    className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                  />
                  <input
                    onChange={handelInputs}
                    value={inpts.last}
                    name="last"
                    type="text"
                    placeholder="Last name"
                    className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                  />
                </div>

                <input
                  onChange={handelInputs}
                  value={inpts.email}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                />

                <input
                  onChange={handelInputs}
                  value={inpts.street}
                  name="street"
                  type="text"
                  placeholder="Street"
                  className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                />

                <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 sm:gap-4">
                  <input
                    onChange={handelInputs}
                    value={inpts.city}
                    name="city"
                    type="text"
                    placeholder="City"
                    className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                  />
                  <input
                    onChange={handelInputs}
                    value={inpts.state}
                    name="state"
                    type="text"
                    placeholder="State"
                    className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 sm:gap-4">
                  <input
                    onChange={handelInputs}
                    value={inpts.z_IP}
                    name="z_IP"
                    type="text"
                    placeholder="Zipcode"
                    className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                  />
                  <input
                    onChange={handelInputs}
                    value={inpts.country}
                    name="country"
                    type="text"
                    placeholder="Country"
                    className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                  />
                </div>
                <input
                  onChange={handelInputs}
                  value={inpts.phone}
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="border border-gray-200 outline-none ps-2 py-1 sm:py-2 rounded"
                />
              </div>
            </div>
            <div>

              {/* total cart */}
              <div>
                <div className="mb-30"></div>
                {/* cart title */}
                <Title>
                  <div className="my-4 ">
                    <p className="text-gray-500 mb-3 text-lg sm:text-xl gap-2 inline-flex capitalize relative">
                      CART
                      <span className="text-gray-700 font-medium ">TOTALS</span>
                      <span className="bg-gray-700 hidden sm:block w-8 sm:w-6 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-25%] sm:right-[-27%]  "></span>
                    </p>
                  </div>
                </Title>
                <div>
                  <ShopCart />
                </div>
              </div>

              {/* payment method */}
              <div>
                <div className="mb-10"></div>
                {/* payment method title */}
                <Title>
                  <div>
                    <p className="text-gray-500 mb-3 text-lg sm:text-xl gap-2 inline-flex capitalize relative">
                      payment
                      <span className="text-gray-700 font-medium ">method</span>
                      <span className="bg-gray-700 hidden sm:block w-8 sm:w-6 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-25%] sm:right-[-27%] "></span>
                    </p>
                  </div>
                </Title>
                {/* imgs  */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-y-5 sm:gap-x-6">
                  {/* cash */}
                  <button
                    onClick={() => setPay("cash")}
                    type="button"
                    className="border  text-gray-400 border-gray-300 outline-none py-1 px-2 rounded cursor-pointer flex items-center gap-x-5"
                  >
                    {pay == "cash" && (
                      <CircleSmall className="text-green-500 w-4" />
                    )}
                    <p>on delivery</p>
                  </button>
                </div>

                {/* place to order */}
                <div className="mt-4 flex items-center justify-end ">
                  <button
                    type="submit"
                    className=" cursor-pointer bg-black hover:bg-black/80 text-gray-300 capitalize px-2 py-1"
                  >
                    place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckOut;
