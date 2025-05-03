import { DashboardCard, DashboardTable } from "../../components";
import { dashboard } from "../../constants";

const Dashboard = () => {
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
