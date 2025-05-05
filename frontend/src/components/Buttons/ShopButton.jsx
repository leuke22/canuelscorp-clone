/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

const ShopButton = () => {
  return (
    <Link
      to="/products"
      className="btn btn-secondary text-white font-bold lg:py-3 py-1.5
      px-4 rounded-full lg:mt-10 mt-4 lg:w-2xs w-[200px]"
      label="Shop Now"
    >
      Shop now
    </Link>
  );
};

export default ShopButton;
