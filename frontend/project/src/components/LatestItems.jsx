import Title from "./Title";

import ProductId from "./ProductId";
// hooks
import { useContext, useEffect, useMemo, useState } from "react";
import { MyLatest } from "../contexts/latest";
import { motion } from "framer-motion";
import axios from "axios";
function LatestItems() {
  // extract data from context
  // const { latest } = useContext(MyLatest);
  // console.log(latest);

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

  const { search, showSearch } = useContext(MyLatest);
  // console.log(search, showSearch);

  let viewItems = useMemo(() => {
    if (search && showSearch) {
      return latest
        .filter(
          (item) =>
            item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
        )
        .slice(0, 10)
        .map((item, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              key={index}
            >
              <div>
                <ProductId
                  props={{
                    id: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                  }}
                />
              </div>
            </motion.div>
          );
        });
    }

    // else
    return latest.slice(0, 10).map((item, index) => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          key={index}
        >
          <div>
            <ProductId
              props={{
                id: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
              }}
            />
          </div>
        </motion.div>
      );
    });
  }, [latest, search, showSearch]);

  return (
    <section>
      <Title>
        <div className="text-center my-12 px-4 ">
          <p className="text-gray-500 mb-3 text-3xl gap-2 inline-flex capitalize relative">
            latest
            <span className="text-gray-700 font-medium ">collection</span>
            <span className="bg-gray-700 w-5 sm:w-12 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-10%] sm:right-[-25%] "></span>
          </p>
          <p className="text-gray-600 w-3/4 mx-auto text-xs sm:text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            cupiditate eligendi ducimus aspernatur exercitationem ipsa amet
            sequi ad explicabo at.
          </p>
        </div>
      </Title>
      {/* latest items */}
      <div className="grid p-8 gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {viewItems}
      </div>
    </section>
  );
}

export default LatestItems;
