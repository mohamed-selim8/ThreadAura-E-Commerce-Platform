import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import { MyLatest } from "../contexts/latest";
export default function Profile() {
  const nav = useNavigate();

  const { userInfo, usersToken } = useContext(MyLatest);
  const { existingUser } = userInfo;
  // console.log(existingUser);

  const [userPro, setuserPro] = useState([]);

  //   all userInfo
  useEffect(() => {
    async function allData() {
      try {
        const req = await fetch("http://localhost:3000/orders/userr", {
          method: "POST",
          headers: { Authorization: `${localStorage.getItem("userToken")}` },
        });

        if (!req.ok) throw new Error("Failed to fetch profile data");

        // data
        const { orders } = await req.json();
        setuserPro(orders);
        // console.log(orders);
      } catch (error) {
        console.error("Profile data fetch failed:", error);
      }
    }

    allData();
  }, []);

  //   log out
  const handleLogout = () => {
    if (usersToken && userInfo) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      nav("/login");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto space-y-8 mb-4">
        {/* ============ كارت المستخدم ============ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shrink-0">
              {existingUser?.name?.charAt(0)}
            </div>

            {/* البيانات */}
            <div className="flex-1 text-center sm:text-right">
              <h1 className="text-2xl font-bold text-gray-800">
                {existingUser?.name}
              </h1>
              <p className="text-gray-500 mt-1">{existingUser?.email}</p>
            </div>

            {/* زر الخروج */}
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-50 text-red-600 hover:text-red-700 cursor-pointer font-semibold hover:bg-red-100 transition"
            >
              logOut
            </button>
          </div>
        </div>
      </div>
      {userPro && userPro.length > 0 ? (
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-6">
            {/* العنوان مرة واحدة بس */}
            <h2 className="text-xl font-bold text-gray-800">
              Orders ({userPro.length})
            </h2>

            {userPro.map((order) => {
              const status = order?.status;

              const orderDate = new Date(order.createdAt).toLocaleDateString(
                "en-EG",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              );

              // المنتجات متداخلة جوه items.items
              const products = order.items.flatMap(
                (group) => group.items || [],
              );

              return (
                <div
                  key={order?._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* رأس الكارت */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-gray-100 bg-gray-50/50">
                    <div>
                      <p className="text-xs text-gray-400">orderID</p>
                      <p className="font-mono text-sm text-gray-700">
                        #{order?._id.slice(-8)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm text-gray-700">{orderDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">payment</p>
                      <p className="text-sm text-gray-700">
                        {order?.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-bold text-gray-800">${order.amount}</p>
                    </div>
                    <span
                      className={`px-3 py-1 shadow rounded-full text-xs font-semibold ${
                        status == "waiting" || status == "packing"
                          ? "bg-amber-400 text-white capitalize"
                          : status == "out of delivey" || status == "shipped"
                            ? "bg-red-500"
                            : "bg-green-500"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </div>

                  {/* المنتجات */}
                  <div className="divide-y divide-gray-100">
                    {products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
                      >
                        <img
                          src={product.image?.[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Size: {product.size} • Quantity: {product.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-700">
                          ${product.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* العنوان */}
                  <div className="px-5 py-4 bg-gray-50/50 text-sm text-gray-600">
                    <span className="font-semibold text-gray-700">
                      Name & Address :{" "}
                    </span>
                    {order.address.frist} {order.address.last} —{" "}
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.country} • 📞 {order.address.phone}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 capitalize">
          no orders generated now
        </div>
      )}
    </div>
  );
}
