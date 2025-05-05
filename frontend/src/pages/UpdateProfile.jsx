import React from "react";
import { UserOrdersCard } from "../components";
import { useState } from "react";

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
  return (
    <section className="py-10 px-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="avatar">
            <div className="w-50 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
          <h1>John Doe</h1>
          <p>johndoe123</p>
          <button className="w-full btn btn-secondary">Edit Profile</button>
        </div>
        <div className="col-span-2">
          {orders.map((order) => (
            <UserOrdersCard order={order} key={order.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
