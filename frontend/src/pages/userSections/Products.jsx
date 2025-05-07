import { ProductCard } from "../../components";
import { beefProducts, chickenProducts, porkProducts } from "../../constants";
import { GiShoppingCart } from "react-icons/gi";
import { useState } from "react";

const Products = () => {
  const [category, setCategory] = useState("Chicken");
  const [isUserAuth, setIsUserAuth] = useState(false);

  return (
    <section className="pt-5 text-black ">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">Fresh and Premium Chicken</h1>
        <p className="text-gray-600">
          We provide premium-quality fresh chicken, perfect for restaurants and
          food service establishments.
        </p>
      </div>
      <div className="container mx-auto px-4 flex flex-col gap-5 items-center mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center min-w-full px-20 gap-5 md:gap-20 lg:gap-100 xl:gap-150">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select md:w-50"
          >
            <option disabled={true}>Select one..</option>
            <option value={"Chicken"}>Chicken</option>
            <option value={"Beef"}>Beef</option>
            <option value={"Pork"}>Pork</option>
          </select>
          {isUserAuth && (
            <button className="btn btn-secondary w-full md:flex-1">
              <GiShoppingCart size={30} />
              Check your Order
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 place-items-center">
          {category === "Chicken"
            ? chickenProducts.map((chickenProduct) => (
                <ProductCard
                  key={chickenProduct.id}
                  isUserAuth={isUserAuth}
                  productId={chickenProduct.id}
                  productName={chickenProduct.name}
                  productImage={chickenProduct.image}
                />
              ))
            : category === "Beef"
            ? beefProducts.map((beefProduct) => (
                <ProductCard
                  key={beefProduct.id}
                  isUserAuth={isUserAuth}
                  productId={beefProduct.id}
                  productName={beefProduct.name}
                  productImage={beefProduct.image}
                />
              ))
            : category === "Pork"
            ? porkProducts.map((porkProduct) => (
                <ProductCard
                  key={porkProduct.id}
                  isUserAuth={isUserAuth}
                  productId={porkProduct.id}
                  productName={porkProduct.name}
                  productImage={porkProduct.image}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default Products;
