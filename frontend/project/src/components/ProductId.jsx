import { Link } from "react-router";
import { useContext } from "react";
import { MyLatest } from "../contexts/latest";
function ProductId({ props }) {
  let { currency } = useContext(MyLatest);
  let { id, name, image, price } = props;
  console.log(id);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="img"
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductId;
