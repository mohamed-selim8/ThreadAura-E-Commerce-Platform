import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Trash } from "lucide-react";

function ProdAdmin() {
  const [list, setList] = useState([]);

  const delItem = async (id) => {
    try {
      const url = `http://localhost:3000/products/${id}`;
      let filteration = await axios.delete(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setList(filteration);
      toast.success("Deleted Successfully");
    } catch {
      toast.error("Error Delete");
    }

    let filteration = list.filter((item) => item._id !== id);
    setList(filteration);
  };

  useEffect(() => {
    async function getProoduct() {
      const url = "http://localhost:3000/products";
      let req = await axios.get(url);

      if (req.statusText === "OK") {
        setList(req.data.totalItem);
      }
    }

    getProoduct();
  }, []);

  return (
    <div className="mt-20 p-6">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Products</h2>
        <p className="text-gray-500 mt-1">
          Manage all products from your dashboard.
        </p>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden shadow-lg border bg-white">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[90px_2fr_1fr_1fr_80px] bg-gray-100 px-6 py-4 font-semibold text-gray-700">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* Products */}
        {Array.isArray(list) &&
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[90px_2fr_1fr_1fr_80px]
              items-center gap-4 px-6 py-4 border-t hover:bg-gray-50 transition"
            >
              <img
                src={item.image?.[0]}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover border"
              />

              <div className="font-medium">
                {item.name === "undefined" ? "_" : item.name}
              </div>

              <div className="text-gray-600">{item.category}</div>

              <div className="font-semibold text-sky-600">${item.price}</div>

              <button
                onClick={() => delItem(item._id)}
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProdAdmin;
