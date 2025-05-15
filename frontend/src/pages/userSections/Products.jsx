import { ProductCard } from "../../components";
import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useProducts } from "../../fetch/useProducts";
import { useUserAuth } from "../../fetch/useUserAuth";
import { useCart } from "../../fetch/useCart";
import { Link } from "react-router-dom";

const Products = () => {
  const [category, setCategory] = useState("All");

  const { isAuthenticated, user } = useUserAuth();
  const { products, getProducts, getCategory } = useProducts();
  const { cart, itemCount, getCartItems } = useCart();

  const isUserAnAuthenticated = isAuthenticated && user?.isAccountVerified;

  useEffect(() => {
    if (category === "All") {
      getProducts();
    } else {
      getCategory(category);
    }
  }, [category, getProducts, getCategory]);

  useEffect(() => {
    if (isUserAnAuthenticated) {
      getCartItems();
    }
  }, [isUserAnAuthenticated, getCartItems, cart]);

  return (
    <section className="pt-5 text-black ">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">Fresh and Premium Chicken</h1>
        <p className="text-gray-600">
          We provide premium-quality fresh chicken, perfect for restaurants and
          food service establishments.
        </p>
      </div>
      <div className="container mx-auto flex flex-col gap-5 items-center mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center min-w-full px-20 gap-5 md:gap-20 lg:gap-100 xl:gap-180">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select md:w-50"
          >
            <option disabled={true}>Select one..</option>
            <option value={"All"}>All</option>
            <option value={"Chicken"}>Chicken</option>
            <option value={"Beef"}>Beef</option>
            <option value={"Pork"}>Pork</option>
          </select>
          {isUserAnAuthenticated && (
            <Link to="/cart" className="btn btn-secondary w-60 md:flex-1">
              <GiShoppingCart size={30} />
              Check your Order <span>({itemCount || 0})</span>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 place-items-center">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              isUserAuth={isUserAnAuthenticated}
              productId={product._id}
              productName={product.name}
              productImage={product.image}
              productDescription={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
