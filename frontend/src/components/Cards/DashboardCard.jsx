const DashboardCard = ({ items }) => {
  return (
    <div className="card card-side bg-base-100 shadow-sm w-100">
      <figure className="w-24 h-full shrink-0 flex ml-5">
        <img
          src={items.imageUrl}
          alt={items.name}
          className="w-full h-full object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-3xl font-bold">
          {12} {items.name}
        </h2>
        <p className="text-gray-500">{items.title}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
