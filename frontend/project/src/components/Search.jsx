import { useContext } from "react";
import { MyLatest } from "../contexts/latest";
import { X, Search } from "lucide-react";
function Searchbar() {
  const { showSearch, setShow, search, setSearch } = useContext(MyLatest);
  return (
    showSearch && (
      <section
        className={`border-b border-t bg-gray-50 text-center flex gap-1 justify-center items-center  `}
      >
        <div className=" border border-gray-400 px-5 py-2 my-5 mx-3 rounded-2xl inline-flex items-center gap-4 justify-center w-3/4 sm:w-1/2 shadow">
          <input
            className="flex-1 outline-none bg-inherit text-sm"
            type="text"
            placeholder="fast search"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          {/* close search */}
          <p className="bg-sky-200 flex items-center justify-center w-7 h-7 rounded-full sm:w-8 sm:h-8  ">
            <Search className=" text-black cursor-pointer " />
          </p>
        </div>
        <X
          className="bg-black text-white/95 shadow cursor-pointer rounded-sm  "
          onClick={() => {
            setShow(false);
          }}
        />
      </section>
    )
  );
}

export default Searchbar;
