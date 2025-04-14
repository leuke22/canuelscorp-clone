import ProductCard from "../components/ProductCard";
import { products } from "../constants";

const Products = () => {
  return (
    <section className="pt-5 text-black">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">Fresh and Premium Chicken</h1>
        <p className="text-gray-600">
          We provide premium-quality fresh chicken, perfect for restaurants and
          food service establishments.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 p-5 place-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            productName={product.name}
            productImage={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
