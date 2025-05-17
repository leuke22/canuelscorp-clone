import { useEffect } from "react";
import { DashboardCard, DashboardTable } from "../../components";
import { useAdmin } from "../../fetch/useAdmin";
import { useOrder } from "../../fetch/useOrder";
import { useProducts } from "../../fetch/useProducts";

const Dashboard = () => {
  const { userCount, getUsers } = useAdmin();
  const { orderItemCount, getOrders } = useOrder();
  const { productCount, getProducts } = useProducts();

  useEffect(() => {
    getUsers();
    getOrders();
    getProducts();
  }, [getUsers, getOrders, getProducts]);

  const dashboard = [
    {
      id: 1,
      imageUrl: "https://img.icons8.com/bubbles/100/purchase-order.png",
      title: "Total Orders",
      count: orderItemCount,
      name: "Orders",
    },
    {
      id: 2,
      imageUrl: "https://img.icons8.com/bubbles/100/user.png",
      title: "Total Customers",
      count: userCount,
      name: "Customers",
    },
    {
      id: 3,
      imageUrl: "https://img.icons8.com/bubbles/100/apple-stocks.png",
      title: "Total Products",
      count: productCount,
      name: "Products",
    },
  ];

  return (
    <section className="bg-gray-100 p-10 gap-10 flex flex-col">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dashboard.map((items) => (
            <DashboardCard key={items.id} items={items} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">Best Selling Products </h2>
        <DashboardTable />
      </div>
    </section>
  );
};

export default Dashboard;
