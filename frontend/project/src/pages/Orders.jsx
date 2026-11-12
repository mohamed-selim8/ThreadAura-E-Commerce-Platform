import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Title from "../components/Title";

function Orders() {
  let elee1 = useRef();
  let nav = useNavigate();
  let [orders, setOrders] = useState([]);
  useEffect(() => {
    // fetch orders from backend
    async function fetchOrders() {
      try {
        let res = await fetch("http://localhost:3000/orders/userr", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("userToken")}`,
          },
        });
        let data = await res.json();
        console.log("orders data", data);
        setOrders(data.orders);
      } catch (err) {
        console.log("order error ", err);
      }
    }

    // call the function to fetch orders
    fetchOrders();
  }, []);

  const CancelOrder = async (orderId) => {
    try {
      if (!orderId) {
        return;
      }

      let res = await fetch(`http://localhost:3000/orders/del/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("userToken")}`,
        },
      });

      let data = await res.json();
      console.log("cancel order data", data);

      // check if req success
      if (data?.success) {
        setOrders((prevOrders) => {
          if (data?.orders) {
            return data.orders;
          }

          return prevOrders.filter((order) => order._id !== orderId);
        });

        let item;
        clearTimeout(item);
        item = toast.success("Order deleted successfully");

        setTimeout(() => {
          nav("/collection");
        }, 1500);
      }
    } catch (err) {
      console.log("casncel order error ", err);
    }
  };

  useEffect(() => {
    console.log("my orders", orders);
  }, [orders]);

  return (
    <div className={` p-4`}>
      {/* title */}
      <Title>
        <div className="">
          <p className="text-gray-500 mb-3 text-3xl gap-2 inline-flex capitalize relative">
            All
            <span className="text-gray-700 font-medium ">orders</span>
            <span className="bg-gray-700 w-8 sm:w-5 md:w-10 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-24%] sm:right-[-13%] md:right-[-40%]  "></span>
          </p>
        </div>
      </Title>

      <div>
        <div>
          {orders.length > 0 ? (
            <div>
              {orders.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col  md:flex-row md:items-center justify-between  border-black/20 border rounded-2xl overflow-hidden   p-4 my-2 md:my-1 hover:shadow-lg hover:transition-all hover:duration-300`}
                  >
                    {/* order items */}
                    <div>
                      {ele?.items?.map((item) => {
                        return item?.items?.map((subItem, subIndex) => {
                          return (
                            <div key={subIndex} className={`flex gap-4`}>
                              <img
                                loading="lazy"
                                src={subItem?.image[0]}
                                alt="img"
                                className="w-17 h-17 object-cover my-2"
                              />
                              <div>
                                <h1>{subItem?.name}</h1>
                                <div className={`flex gap-4`}>
                                  <p className=" text-lg text-gray-500">
                                    ${subItem?.price}
                                  </p>
                                  <p className="text-lg capitalize text-gray-500">
                                    quantity: {subItem?.quantity}
                                  </p>
                                  <p className="text-lg capitalize text-gray-500">
                                    size: {subItem?.size}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })}
                    </div>

                    <div
                      className={`md:w-[50%] flex justify-between gap-2 items-center`}
                    >
                      <div className={`flex gap-4 items-center`}>
                        <p
                          className={`${ele?.status == "waiting" || ele?.status == "packing" ? "bg-amber-400" : ele?.status == "out of delivey" || ele?.status == "shipped" ? "bg-red-500" : "bg-green-500"} h-2 w-2 rounded-full align-middle`}
                        ></p>
                        <span ref={elee1}>
                          {/* {elee1} */}
                          {ele.status || "Ready to ship"}
                        </span>
                      </div>
                      <div className={`flex md:flex-col gap-4 items-center`}>
                        <button
                          type="button"
                          className=" px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer capitalize font-semibold"
                        >
                          track order
                        </button>

                        <button
                          onClick={() => {
                            CancelOrder(ele._id);
                          }}
                          type="button"
                          className=" px-3 py-2 rounded bg-red-500 hover:bg-red-600 cursor-pointer capitalize font-semibold"
                        >
                          cancel order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
