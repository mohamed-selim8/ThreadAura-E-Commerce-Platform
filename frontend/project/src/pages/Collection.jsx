import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import Title from "../components/Title";
import ProductId from "../components/ProductId";
// hooks
import { useContext } from "react";
import { MyLatest } from "../contexts/latest";
function Collection() {
  // extract all product from context
  const { latest } = useContext(MyLatest);
  const { search, showSearch } = useContext(MyLatest);

  // apper&hide filter categ
  let [showFilter, setFilter] = useState(true);

  // hadel choosen of categ (men,women,kid)
  let [options, setOptions] = useState([]);
  let [type, setType] = useState([]);
  let [select, setSelect] = useState(null);

  // all product results with 2 king of filter [category,type]
  let viewProduct = useMemo(() => {
    let newProduct = [...latest];
    if (options.length > 0) {
      // apply filteration if(men||kids||women)

      newProduct = newProduct.filter((items) => {
        return options.includes(items.category);
      });
    } else if (type.length > 0) {
      newProduct = newProduct.filter((items) =>
        type.includes(items.subCategory),
      );
    }

    // sorting
    if (select === "low-high") {
      newProduct = newProduct.sort((a, b) => {
        console.log(a, b);

        return a.price - b.price;
      });
    } else if (select === "high-low") {
      newProduct = newProduct.sort((a, b) => {
        return b.price - a.price;
      });
    }

    // search filteration
    if (search && showSearch) {
      newProduct = newProduct.filter((item) => {
        const nameMatches = item.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const categoryMatches =
          options.includes(item.category) && type.includes(item.category);

        return nameMatches || categoryMatches;
      });
    }

    // else
    return newProduct.map((item, index) => {
      return (
        <div key={index}>
          <ProductId
            props={{
              id: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
            }}
          />
        </div>
      );
    });
  }, [latest, options, type, select, search, showSearch]);

  const handelOption = (e) => {
    console.log(e.target.value);
    if (options.includes(e.target.value)) {
      setOptions((prev) =>
        prev.filter((item) => {
          return item !== e.target.value;
        }),
      );
    } else {
      setOptions((prev) => [...prev, e.target.value]);
    }
  };
  const handelType = (e) => {
    console.log(e.target.value);
    if (type.includes(e.target.value)) {
      setType((prev) =>
        prev.filter((item) => {
          return item !== e.target.value;
        }),
      );
    } else {
      setType((prev) => [...prev, e.target.value]);
    }
  };

  // handel sort items
  const handelSelect = (e) => {
    console.log(e.target.value);
    let { value } = e.target;
    setSelect(value);
  };

  return (
    <section className="mx-4 py-5 flex flex-col sm:flex-row gap-1 sm:gap-10 border-t border-gray-200">
      {/* fiteration categ */}
      <div className="min-w-60">
        <p
          className="capitalize  text-xl cursor-pointer flex gap-2 items-center"
          onClick={() => setFilter(!showFilter)}
        >
          filters{" "}
          <ChevronRight
            className={`${showFilter ? "rotate-90 " : ""} transition ease-in-out text-gray-300 sm:hidden`}
          />
        </p>

        {/* categ filters */}
        <div
          className={` border border-gray-300 py-3 pl-5 mt-6 ${showFilter ? "" : "hidden"}`}
        >
          <p className=" uppercase font-medium text-sm  mb-3">categories</p>
          <div className=" text-gray-700 font-light text-sm ">
            <p className="flex gap-2">
              <input type="checkbox" value={"Men"} onChange={handelOption} />
              Men
            </p>
            <p className="flex gap-2 my-3">
              <input type="checkbox" value={"Women"} onChange={handelOption} />
              Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} onChange={handelOption} />
              Kids
            </p>
          </div>
        </div>
        <div className="min-w-60 ">
          {/* type filters */}
          <div
            className={` border border-gray-300 py-3 pl-5 mt-6 ${showFilter ? "" : "hidden"}`}
          >
            <p className=" uppercase font-medium text-sm  mb-3">type</p>
            <div className=" text-gray-700 font-light text-sm ">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  value={"Topwear"}
                  onChange={handelType}
                />
                Topwear
              </p>
              <p className="flex gap-2 my-3">
                <input
                  type="checkbox"
                  value={"Bottomwear"}
                  onChange={handelType}
                />
                Bottomwear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  value={"Winterwear"}
                  onChange={handelType}
                />
                Winterwear
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* right side categ */}
      <div className="flex-1 mt-8 sm:mt-0">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <Title>
            <div className="">
              <p className="text-gray-500 mb-3 text-3xl gap-2 inline-flex capitalize relative">
                All
                <span className="text-gray-700 font-medium ">collection</span>
                <span className="bg-gray-700 w-8 sm:w-6 md:w-12 h-px sm:h-px absolute top-[50%] translate-y-[-50%] right-[-24%] sm:right-[-13%] md:right-[-35%]  "></span>
              </p>
            </div>
          </Title>

          {/* product sorting */}
          <div>
            <select
              onChange={handelSelect}
              name=""
              className="border border-gray-300 sm:text-sm mb-4 cursor-pointer"
            >
              <option value={"relavent"}>sort by: Relavent</option>
              <option value={"low-high"}>sort by: low to hig</option>
              <option value={"high-low"}>sort by: high to low</option>
            </select>
          </div>
        </div>

        {/*map at all product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {viewProduct}
        </div>
      </div>
    </section>
  );
}

export default Collection;
