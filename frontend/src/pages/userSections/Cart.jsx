import { CartCard, ProductInfo } from "../../components";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useCart } from "../../fetch/useCart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useUserAuth } from "../../fetch/useUserAuth";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { useOrder } from "../../fetch/useOrder";

const Cart = () => {
  const { getCartItems, cart, clearCart, updateCartAddress } = useCart();
  const { user } = useUserAuth();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  useEffect(() => {
    if (cart?.shippingAddress) {
      setAddressForm({
        street: cart.shippingAddress.street || "",
        city: cart.shippingAddress.city || "",
        province: cart.shippingAddress.province || "",
        postalCode: cart.shippingAddress.postalCode || "",
      });
    }
  }, [cart]);

  const handleCancelCart = async () => {
    try {
      await clearCart();
      navigate("/products");
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (
        !cart?.shippingAddress ||
        !cart.shippingAddress.street ||
        !cart.shippingAddress.city ||
        !cart.shippingAddress.province ||
        !cart.shippingAddress.postalCode
      ) {
        toast.error(
          "Please complete your shipping address before placing the order"
        );
        return;
      }

      await placeOrder();
      toast.success("Order placed successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      await updateCartAddress(addressForm, false);
      closeModal();
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-5">
        <FaCartPlus size={100} className="text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500">
          Add items to your cart to start shopping
        </p>
        <button
          onClick={() => navigate("/products")}
          className="btn btn-primary flex items-center gap-2"
        >
          Start Shopping
          <FaArrowRightLong />
        </button>
      </div>
    );
  }

  return (
    <section className="p-10 flex flex-col md:flex-row gap-5 bg-gray-50">
      <motion.div
        variants={fadeIn("right", 0.5)}
        initial="hidden"
        whileInView="show"
        className="md:basis-2/3 overflow-auto h-lvh"
      >
        {cart.items?.map((items) => (
          <CartCard
            key={items._id}
            productId={items.product._id}
            productName={items.product.name}
            productImage={items.product.image}
            productDescription={items.product.description}
            quantity={items.quantity}
          />
        ))}
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col md:basis-1/3 gap-5"
      >
        <div className="flex flex-col p-5 shadow-sm rounded-lg bg-white">
          <h1 className="text-xl text-primary font-bold mb-3">Order Summary</h1>
          <div className="flex flex-row justify-between text-lg font-semibold ">
            <p>Products</p>
            <p>Quantity</p>
          </div>
          <div>
            {cart.items?.map((items) => (
              <ProductInfo
                key={items._id}
                productName={items.product.name}
                quantity={items.quantity}
              />
            ))}
          </div>
          <div className="divider"></div>
          <button onClick={handlePlaceOrder} className="btn btn-secondary mb-3">
            Place your Order
          </button>
          <button
            onClick={handleCancelCart}
            className="btn btn-outline btn-primary mb-5"
          >
            Cancel Order
          </button>
          <div className="flex flex-row items-center justify-center gap-2">
            <p>or</p>
            <p
              onClick={() => navigate("/products")}
              className="text-blue-700 flex flex-row items-center gap-2 cursor-pointer"
            >
              Continue Shopping <FaArrowRightLong />
            </p>
          </div>
        </div>

        <div className="flex flex-col p-5 shadow-sm rounded-lg bg-white">
          <h1 className="text-xl text-primary font-bold mb-3">
            User Address Information
          </h1>
          <div>
            <p className="font-semibold">Name</p>
            <p className="text-gray-500">{user?.fullname}</p>
          </div>
          <div className="mt-3">
            <p className="font-semibold">Phone Number</p>
            <p className="text-gray-500">{user?.phone}</p>
          </div>
          <div className="mt-3">
            <p className="font-semibold">Shipping Address</p>
            <p className="text-gray-500">
              {cart?.shippingAddress.street}, {cart?.shippingAddress.city},{" "}
              {cart?.shippingAddress.province},{" "}
              {cart?.shippingAddress.postalCode}
            </p>
          </div>
          <button
            onClick={openModal}
            className="btn btn-secondary mt-5 flex items-center gap-2"
          >
            Edit Address Information <CiEdit size={20} />
          </button>
        </div>

        <div className={`modal ${showModal ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Address</h3>
            <form onSubmit={handleSaveAddress} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium">Street</label>
                <input
                  name="street"
                  value={addressForm.street}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  name="city"
                  value={addressForm.city}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Province</label>
                <input
                  name="province"
                  value={addressForm.province}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  name="postalCode"
                  value={addressForm.postalCode}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Cart;
