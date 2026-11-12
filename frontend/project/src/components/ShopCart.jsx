import { MyLatest } from "../contexts/latest";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function ShopCart() {
  let { pathname } = useLocation();
  let nav = useNavigate();
  let { getCartAmount, currency, shopping_fee } = useContext(MyLatest);
  return (
    <div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <hr className=" border border-gray-300" />
        <div className="flex justify-between">
          <p>Shopping Fee</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : shopping_fee}
          </p>
        </div>
        <hr className=" border border-gray-300" />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + shopping_fee}
          </b>
        </div>
        {pathname == "/cart" && getCartAmount() != 0 ? (
          <div className="mt-4 flex items-center justify-end ">
            <button
              onClick={() => nav("/place-order")}
              type="button"
              className=" cursor-pointer bg-black hover:bg-black/80 text-gray-300 capitalize px-2 py-1"
            >
              proceed to checkout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ShopCart;
