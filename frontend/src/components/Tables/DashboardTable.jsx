import { useProducts } from "../../fetch/useProducts";
import { useEffect } from "react";

const DashboardTable = () => {
  const { bestSelling, getBestSelling, isBestSellingLoading } = useProducts();

  useEffect(() => {
    getBestSelling();
  }, [getBestSelling]);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 px-5">
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Product</th>
            <th>Category</th>
            <th className="text-center">Total Orders</th>
            <th className="text-center">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {isBestSellingLoading ? (
            <tr>
              <td colSpan={5} className="text-center">
                <span className="loading loading-spinner loading-md"></span>
              </td>
            </tr>
          ) : bestSelling.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-500">
                No products data available
              </td>
            </tr>
          ) : (
            bestSelling.map((product, index) => (
              <tr key={product._id}>
                <th className="font-bold text-lg">{index + 1}</th>
                <td className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {product.category}
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td className="text-center">
                  <div className="badge badge-secondary h-full">
                    {product.totalOrders}
                  </div>
                </td>
                <td className="text-center">
                  <div className="badge badge-primary">
                    {product.totalQuantity}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
