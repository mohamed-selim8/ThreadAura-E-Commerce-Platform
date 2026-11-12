import { useState, useEffect } from "react";

import Title from "../components/Title";

function TraceOrders() {
  let [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        let res = await fetch("http://localhost:3000/orders", {
          method: "Post",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        let { orders } = await res.json();
        setOrders(orders);
      } catch (err) {
        console.log("order error ", err);
      }
    }
    fetchOrders();
  }, []);

  async function UpdateOrderStatus(_id, status) {
    console.log(_id);
    // setOrderState(status);
    let url = "http://localhost:3000/orders/updOrder";
    let req = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ _id, status }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    let data = await req.json();
    console.log(data, " from update req");
    if (data?.success) {
      setOrders((prev) =>
        prev.map((o) => (o._id === _id ? { ...o, status } : o)),
      );
    }
  }

  useEffect(() => {
    // console.log("my orders", orders);
  }, [orders]);
  return (
    <div className={` p-4 mt-20`}>
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
                  className={`   md:w-[50%] flex justify-between gap-2 items-center`}
                >
                  <div className={`flex gap-4 items-center`}>
                    <p
                      className={`${ele?.status == "waiting" ? "bg-amber-400" : "bg-green-500"} h-2 w-2 rounded-full`}
                    ></p>
                    <span>
                      {ele?.status ? `${ele.status}` : "Ready to ship"}
                    </span>
                  </div>
                  <div>
                    <select
                      className="bg-gray-300 rounded py-2 cursor-pointer"
                      value={ele?.status}
                      onChange={async (e) => {
                        await UpdateOrderStatus(ele._id, e.target.value);
                      }}
                    >
                      <option value="order placed">order placed</option>
                      <option value="delivered">delivered</option>
                      <option value="packing">packing</option>
                      <option value="shipped">shipped</option>
                      <option value="waiting">waiting</option>
                      <option value="out of delivey">out of delivey</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TraceOrders;
