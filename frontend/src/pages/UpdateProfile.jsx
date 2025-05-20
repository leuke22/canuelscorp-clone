import { CheckOrder, UserOrdersCard } from "../components";
import { useEffect, useState } from "react";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineDateRange,
} from "react-icons/md";
import { ItemInfo, UpdateUserModal } from "../components";
import { useUserAuth } from "../fetch/useUserAuth";
import { Link } from "react-router-dom";
import { useOrder } from "../fetch/useOrder";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user } = useUserAuth();
  const { orders, getOrders, isFetchLoading } = useOrder();
  const [userOrders, setUserOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await getOrders();
      } catch (error) {
        toast.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [getOrders]);

  useEffect(() => {
    if (orders.length > 0 && user?._id) {
      const filteredOrders = orders.filter(
        (order) => order.user._id === user._id
      );
      setUserOrders(filteredOrders);
    }
  }, [orders, user]);

  const formatAddress = (address) => {
    return `${address.street || "1235 Bulacan St."}, ${
      address.city || "Quezon City"
    }, ${address.province || "Metro Manila"}, ${address.postalCode || "1116"}`;
  };

  return (
    <section className="lg:py-10 lg:px-50 px-10 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="avatar mb-5">
            <div className="w-50 rounded-full">
              <img
                src={
                  !user?.profileImg
                    ? "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    : user.profileImg
                }
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold">{user.fullname}</h1>
          <p className="text-gray-600">{user.username}</p>
          <button
            className="w-full btn btn-secondary my-5"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>
          <div className="flex flex-col gap-2">
            <ItemInfo icon={MdOutlineEmail} text={user.email} />
            <ItemInfo icon={MdOutlinePhone} text={user.phone} />
            <ItemInfo
              icon={MdOutlineLocationOn}
              text={formatAddress(user.address)}
            />
            <ItemInfo
              icon={MdOutlineDateRange}
              text={user.dateJoining || "2025-01-01"}
            />
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          {user?.role === "user" ? (
            <div className="grid md:col-span-2 gap-5">
              <h1 className="text-3xl font-bold">Your Orders</h1>
              {isFetchLoading ? (
                <div className="md:col-span-2">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : userOrders.length > 0 ? (
                <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {userOrders.map((order) => (
                      <UserOrdersCard
                        order={order}
                        key={order._id}
                        setSelectedOrder={setSelectedOrder}
                        setIsOrderModalOpen={setIsOrderModalOpen}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2">No orders found</div>
              )}
            </div>
          ) : user?.role === "admin" ? (
            <>
              <h1 className="text-3xl font-bold md:col-span-2">
                Welcome Admin
              </h1>
              <div className="flex flex-col gap-4 md:col-span-2">
                <Link to="/admin/users" className="btn btn-primary w-full">
                  View Users
                </Link>
                <Link to="/admin/products" className="btn btn-primary w-full">
                  View Products
                </Link>
                <Link to="/admin/orders" className="btn btn-primary w-full">
                  View Orders
                </Link>
                <Link to="/admin/inquiries" className="btn btn-primary w-full">
                  Check Inquiries
                </Link>
              </div>
            </>
          ) : user?.role === "supervisor" ? (
            <>
              <h1 className="text-3xl font-bold md:col-span-2">
                Welcome Supervisor
              </h1>
              <div className="flex flex-col gap-4 md:col-span-2">
                <Link to="/admin/users" className="btn btn-primary w-full">
                  View Users
                </Link>
                <Link to="/admin/products" className="btn btn-primary w-full">
                  View Products
                </Link>
                <Link to="/admin/orders" className="btn btn-primary w-full">
                  View Orders
                </Link>
                <Link to="/admin/inquiries" className="btn btn-primary w-full">
                  Check Inquiries
                </Link>
              </div>
            </>
          ) : (
            <div className="md:col-span-2">No orders found</div>
          )}
        </div>

        <CheckOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          isOpen={isOrderModalOpen}
          setIsOpen={setIsOrderModalOpen}
        />
      </div>

      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </section>
  );
};

export default UpdateProfile;
