import { useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { MyLatest } from "../contexts/latest";
import { motion } from "framer-motion";

import { assets } from "../assets/frontend_assets/assets";

import RealtedProd from "../components/RealtedProd";

// import { toast, Bounce } from "react-toastify";
// product page
function Product() {
  const { star_dull_icon, star_icon } = assets;

  let { prod_id } = useParams();

  let [elements, setEle] = useState(false);

  // change img
  let [currSrc, setSrc] = useState("");

  // size
  let [size, setSize] = useState(null);

  // extract product
  let { latest, currency, addToCart } = useContext(MyLatest);
  // console.log(prod_id);
  // console.log(currSrc);
  // console.log(size);

  useEffect(() => {
    latest.map((item) => {
      if (prod_id === item._id) {
        setEle(item);
        setSrc(item.image[0]);
        console.log("items", item);
        return null;
      }
    });
  }, [prod_id, latest]);

  // add to cart

  return elements ? (
    <div className="px-4 border-t border-gray-200 py-2">
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-8  ">
        <motion.div className=" w-full flex gap-3 hover:duration-750 transition hover:ease-in-out ">
          <div className=" cursor-pointer w-[30%] flex flex-col gap-2 ">
            {elements.image.map((ph, index) => {
              console.log(ph);

              return (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  key={index}
                >
                  <img
                    onClick={() => setSrc(ph)}
                    className={`hover:scale-105 ${currSrc === ph ? " border-orange-500 border-2 rounded-2xl" : ""} `}
                    src={ph}
                    alt=""
                  />
                </motion.div>
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-[70%] h-"
          >
            <img src={`${currSrc}`} className="w-full object-contain" alt="" />
          </motion.div>
        </motion.div>

        {/* content */}
        <div>
          <p className="font-medium text-2xl mt-2">{elements.name}</p>
          <div className="flex items-center gap-1 mt-2">
            <img src={star_icon} className="w-3 " alt="" />
            <img src={star_icon} className="w-3 " alt="" />
            <img src={star_icon} className="w-3 " alt="" />
            <img src={star_icon} className="w-3 " alt="" />
            <img src={star_dull_icon} className="w-3 " alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {elements.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{elements.description}</p>

          {/* size */}
          <div className="my-8">
            <p className=" capitalize">select size</p>
            {/* size option */}
            <div className="flex gap-2  mt-2 text-sm">
              {elements.size.map((item, index) => {
                return (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border px-4 py-2 cursor-pointer bg-gray-100 border-gray-300 flex gap-2 ${item === size ? "bg-orange-500 text-white" : ""}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* add to cart */}
            <div>
              <button
                className=" uppercase bg-black text-white mt-5 rounded-2xl cursor-pointer active:bg-gray-700 px-8 py-3 text-sm"
                onClick={() => addToCart(elements._id, size)}
              >
                add to cart
              </button>
            </div>
            <hr className=" my-8 sm:w-4/5 text-gray-200" />

            <div className="text-sm text-gray-400 border-l-4 ps-2">
              <p>100% original product.</p>
              <p className="my-2">
                Cash on delivery is available on this product.
              </p>
              <p>Easy return and policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* description and reviews */}
      <div className="mt-20 px-4 ">
        <div className="flex text-black gap-1 ">
          <p className="border capitalize px-5 py-3 text-sm">description</p>
          <p className="border capitalize px-5 py-3 text-sm">reviews (122)</p>
        </div>

        <div className=" flex flex-col gap-4 border border-gray-300 text-sm text-gray-500 p-6 mt-2">
          <p>
            {" "}
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet.It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* related products */}
      <RealtedProd
        info={{
          category: elements.category,
          type: elements.subCategory,
          id: elements._id,
        }}
      />
    </div>
  ) : (
    <p className="text-center"> "not found any element"</p>
  );
}

export default Product;
