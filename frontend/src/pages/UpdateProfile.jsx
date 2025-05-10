import React from "react";
import { CheckOrder, UserOrdersCard } from "../components";
import { useState } from "react";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineDateRange,
} from "react-icons/md";
import { ItemInfo, UpdateUserModal } from "../components";
//import { useUserAuth } from "../fetch/useUserAuth";

const UpdateProfile = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2025-04-25",
      status: "Delivered",
      items: [
        { id: "P-01", product: "Fresh Whole Chicken - 1kg", quantity: 2 },
        { id: "P-02", product: "Organic Eggs - 12pcs", quantity: 1 },
      ],
    },
    {
      id: "ORD-002",
      date: "2025-04-22",
      status: "Processing",
      items: [{ id: "P-03", product: "Dio Lupa Coffee Beans", quantity: 1 }],
    },
    {
      id: "ORD-003",
      date: "2025-04-20",
      status: "Shipped",
      items: [
        { id: "P-04", product: "Organic Apples - 1kg", quantity: 1 },
        { id: "P-05", product: "Fresh Bread", quantity: 2 },
      ],
    },
  ]);

  const user = {
    fullname: "John Doe",
    username: "johndoe123",
    email: "johndoe123@gmail.com",
    address: {
      street: "1235 Bulacan St.",
      city: "San Juan",
      province: "Metro Manila",
      postalCode: "1600",
    },
    phone: "09223456789",
    dateJoining: "2025-01-01",
  };

  //const { user } = useUserAuth();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateUser = (updatedData) => {
    console.log("Updated user data:", updatedData);
  };

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.province}, ${address.postalCode}`;
  };

  return (
    <section className="lg:py-10 lg:px-50 px-10 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="avatar mb-5">
            <div className="w-50 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
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
            <ItemInfo icon={MdOutlineDateRange} text={user.dateJoining} />
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          <h1 className="text-3xl font-bold md:col-span-2">Your Orders</h1>
          {orders.map((order) => (
            <UserOrdersCard
              order={order}
              key={order.id}
              setSelectedOrder={setSelectedOrder}
            />
          ))}
        </div>

        <CheckOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </div>

      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />
    </section>
  );
};

export default UpdateProfile;
