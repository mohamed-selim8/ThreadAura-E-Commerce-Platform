import { useContext, useMemo } from "react";
import { MyLatest } from "../contexts/latest";
import Title from "./Title";
function RealtedProd({ info }) {
  // extract all product
  let { latest, currency } = useContext(MyLatest);
  let { category, type } = info;
  console.log(category, type);

  let result = useMemo(() => {
    return latest

      .filter((item) => category === item.category)
      .slice(0, 5)
      .map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-y-3">
            <img
              src={item?.image?.[0]}
              className="hover:scale-105 transition duration-500 ease-in-out
            ion dur"
              alt=""
            />
            <div>
              <p>{item.name}</p>
              <p>{item.subCategory}</p>
              <p>{currency + item.price}</p>
            </div>
          </div>
        );
      });
  }, [latest, category, currency]);

  return (
    <div>
      {/* title */}
      <Title>
        <div className="text-center my-12 px-4 ">
          <p className="text-gray-500 mb-3 text-3xl gap-2 inline-flex capitalize relative">
            related
            <span className="text-gray-700 font-medium ">products</span>
            <span className="bg-gray-700 w-5 sm:w-12 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-10%] sm:right-[-25%] "></span>
          </p>
          <p className="text-gray-600 w-3/4 mx-auto text-xs sm:text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            cupiditate eligendi ducimus aspernatur exercitationem ipsa amet
            sequi ad explicabo at.
          </p>
        </div>
      </Title>

      {/* product relate */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-5 cursor-pointer ">
        {result}
      </div>
    </div>
  );
}

export default RealtedProd;
