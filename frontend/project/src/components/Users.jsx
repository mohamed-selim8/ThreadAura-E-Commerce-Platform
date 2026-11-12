import { assets } from "../assets/admin_assets/assets";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
function Adding() {
  const { upload_area } = assets;

  // open file input
  const openFile1 = useRef();
  const openFile2 = useRef();
  const openFile3 = useRef();
  const openFile4 = useRef();
  const btn = useRef();

  // loaders
  // const [loading, setLoading] = useState(false);

  // img state
  const [img, setImg] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  // types state
  const [type, setType] = useState({ name: "", description: "" });
  // category state
  const [categ, setCateg] = useState({
    category: "Men",
    subCategory: "Topwear",
  });
  // price state
  const [price, setPrice] = useState(25);
  // size states
  const [size, setSize] = useState([]);
  // bestsallers state
  const [bestseller, setBest] = useState(false);
  const handelImg = (e) => {
    const { name } = e.target;
    console.log(e.target.files[0]);

    if (name == "image1") {
      setImg({ ...img, image1: e.target.files[0] });
    } else if (name == "image2") {
      setImg({ ...img, image2: e.target.files[0] });
    } else if (name == "image3") {
      setImg({ ...img, image3: e.target.files[0] });
    } else {
      setImg({ ...img, image4: e.target.files[0] });
    }
  };

  const handelType = (e) => {
    const { name } = e.target;
    if (name == "description") {
      setType({ ...type, description: e.target.value });
    } else {
      setType({ ...type, name: e.target.value });
    }
  };

  const handelCategory = (e) => {
    console.log(e.target.value);
    const { name } = e.target;
    if (name == "subCategory") {
      setCateg({ ...categ, subCategory: e.target.value });
    } else {
      setCateg({ ...categ, category: e.target.value });
    }
  };

  const handelPrice = (e) => {
    const val = Number(e.target.value);
    if (val > 0) {
      setPrice(val);
    }
  };

  const handelForm = async (e) => {
    e.preventDefault();
    try {
      if (size.length === 0 || type.name === "") {
        btn.current.disabled = true;
      }

      const token = localStorage.getItem("token");
      const { image1, image2, image3, image4 } = img;
      const { name, description } = type;
      const { category, subCategory } = categ;

      const url = "http://localhost:3000/products";

      const formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("size", JSON.stringify(size));
      formData.append("bestSeller", bestseller);
      console.log(token);

      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": " multipart/form-data",
          Authorization: `${token}`,
        },
      });

      if (data) {
        console.log(data);
        toast.success(data.msg);

        setImg({});
        setCateg({ ...categ, category: "", subCategory: "" });
        setPrice(1);
        setSize([]);
        setType({ ...type, name: "", description: "" });
      }
    } catch (err) {
      toast.error("can`t add product");
      console.log(err, " cant adding item");
    }
  };
  // useEffect(() => {
  //   console.log(img);
  //   console.log(type);
  //   console.log(categ);
  //   console.log(price);
  //   console.log(size);
  //   console.log(bestseller);
  // }, [img, type, categ, price, size, bestseller]);
  return (
    <div className="mt-25 ms-2 sm:ms-4">
      <form onSubmit={handelForm}>
        {/* handel imgs */}
        <div>
          <p className="capitalize mb-2">upload images</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div>
              <label
                className="cursor-pointer"
                onClick={() => openFile1.current?.click()}
              >
                <img
                  src={
                    !img.image1 ? upload_area : URL.createObjectURL(img.image1)
                  }
                  className="w-40 sm:w-20"
                  alt=""
                />
                <input
                  onChange={handelImg}
                  ref={openFile1}
                  type="file"
                  hidden
                  name="image1"
                />
              </label>
            </div>
            <div>
              <label
                className="cursor-pointer"
                onClick={() => openFile2.current?.click()}
              >
                <img
                  src={
                    !img.image2 ? upload_area : URL.createObjectURL(img.image2)
                  }
                  className="w-40 sm:w-20"
                  alt=""
                />
                <input
                  onChange={handelImg}
                  ref={openFile2}
                  type="file"
                  hidden
                  name="image2"
                />
              </label>
            </div>
            <div>
              <label
                className="cursor-pointer"
                onClick={() => openFile3.current?.click()}
              >
                <img
                  src={
                    !img.image3 ? upload_area : URL.createObjectURL(img.image3)
                  }
                  className="w-40 sm:w-20"
                  alt=""
                />
                <input
                  name="image3"
                  onChange={handelImg}
                  ref={openFile3}
                  type="file"
                  hidden
                />
              </label>
            </div>
            <div>
              <label
                className="cursor-pointer"
                onClick={() => openFile4.current?.click()}
              >
                <img
                  src={
                    !img.image4 ? upload_area : URL.createObjectURL(img.image4)
                  }
                  className="w-40 sm:w-20"
                  alt=""
                />
                <input
                  onChange={handelImg}
                  ref={openFile4}
                  type="file"
                  hidden
                  name="image4"
                />
              </label>
            </div>
          </div>
        </div>

        {/* handel types */}
        <div className="my-5">
          <p className="mb-2">Product Name</p>
          <input
            value={type.name}
            onChange={handelType}
            type="text"
            className="py-2 px-3 max-w-125 w-full border focus:border-pink-300 outline-none rounded-lg"
            placeholder="type...."
            name="name"
            required
            id=""
          />
        </div>
        <div>
          <p className="mb-2">Product Description</p>
          <textarea
            value={type.description}
            onChange={handelType}
            type="text"
            className="py-2 px-3 max-w-125 w-full border focus:border-pink-300 outline-none rounded-lg"
            placeholder="type...."
            name="description"
            required
            id=""
          />
        </div>

        {/* handel category */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-9">
          {/* category */}
          <div className="my-5">
            <p>Category</p>
            <select
              onChange={handelCategory}
              name="category"
              className={` outline-none  border text-gray-500 border-gray-400`}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <p>subCategory</p>
            <select
              onChange={handelCategory}
              name="subCategory"
              id=""
              className={` outline-none text-gray-500  border  border-gray-400`}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p>Price</p>
            <input
              value={Number(price)}
              onChange={handelPrice}
              className={` outline-none w-full sm:w-50 border  border-gray-400`}
              type="number"
              name="price"
              placeholder="20"
            />
          </div>
        </div>

        {/* size */}
        <div className="my-3">
          <p>Size</p>

          <div className="flex items-center gap-4">
            <p
              onClick={() =>
                setSize((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"],
                )
              }
              className={`cursor-pointer px-3 border ${size.includes("S") ? "bg-pink-300 border border-gray-200 shadow" : "border-gray-400"} }`}
            >
              <button type="button" className="cursor-pointer">
                S
              </button>
            </p>
            <p
              onClick={() =>
                setSize((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"],
                )
              }
              className={`cursor-pointer px-3 border ${size.includes("M") ? "bg-pink-300 border border-gray-200 shadow" : "border-gray-400"} }`}
            >
              <button type="button" className="cursor-pointer">
                M
              </button>
            </p>
            <p
              onClick={() =>
                setSize((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"],
                )
              }
              className={`cursor-pointer px-3 border ${size.includes("L") ? "bg-pink-300 border border-gray-200 shadow" : "border-gray-400"} }`}
            >
              <button type="button" className="cursor-pointer">
                L
              </button>
            </p>
            <p
              onClick={() =>
                setSize((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"],
                )
              }
              className={`cursor-pointer px-3 border ${size.includes("XL") ? "bg-pink-300 border border-gray-200 shadow" : "border-gray-400"} }`}
            >
              <button type="button" className="cursor-pointer">
                XL
              </button>
            </p>
            <p
              onClick={() =>
                setSize((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"],
                )
              }
              className={`cursor-pointer px-3 border ${size.includes("XXL") ? "bg-pink-300 border border-gray-200 shadow" : "border-gray-400"} }`}
            >
              <button type="button" className="cursor-pointer">
                XXL
              </button>
            </p>
          </div>
        </div>

        <div className="my-2 flex items-center gap-3">
          <input
            type="checkbox"
            name="best"
            value={bestseller}
            onChange={(e) => setBest(e.target.checked)}
          />
          <span>Add to bestseller</span>
        </div>

        <button
          ref={btn}
          disabled={size.length === 0}
          type="submit"
          className="bg-green-500 cursor-pointer
           hover:bg-green-600 text-white outline-none w-full sm:w-100 p-1 rounded-lg mt-6 "
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default Adding;
