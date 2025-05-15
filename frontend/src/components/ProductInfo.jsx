const ProductInfo = ({ productName, quantity }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <p>{productName}</p>
      <p className="text-gray-500">x {quantity}</p>
    </div>
  );
};

export default ProductInfo;
