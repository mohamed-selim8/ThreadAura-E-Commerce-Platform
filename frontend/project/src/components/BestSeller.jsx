import Title from "./Title";
import { useContext, useEffect, useMemo, useState } from "react";
import { MyLatest } from "../contexts/latest";
import ProductId from "./ProductId";
function BestSeller() {
  // extract product from context
  let { latest } = useContext(MyLatest);
  let [bestSale, setSale] = useState(latest);
  useEffect(() => {
    function filterItem() {
      setSale(latest.filter((e) => e.bestSeller).slice(0, 5));
    }
    filterItem();
  }, [latest]);

  //   show result of filteration
  let filters = useMemo(() => {
    return bestSale.map((item, index) => {
      return (
        <div key={index}>
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
        </div>
      );
    });
  }, [bestSale]);

  return (
    <section className="p-8 mt-10">
      {/* title of section */}
      <Title>
        <div className="text-center ">
          <p className="text-gray-500 mb-3 text-3xl gap-2 inline-flex capitalize relative">
            Best
            <span className="text-gray-700 font-medium ">Seller</span>
            <span className="bg-gray-700 w-8 sm:w-12 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-25%] sm:right-[-39%] "></span>
          </p>
          <p className="text-gray-600 w-3/4 mx-auto text-xs sm:text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            cupiditate eligendi ducimus aspernatur exercitationem ipsa amet
            sequi ad explicabo at.
          </p>
        </div>
      </Title>

      {/* filter items */}
      <div className="grid p-8 gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filters}
      </div>
    </section>
  );
}

export default BestSeller;
