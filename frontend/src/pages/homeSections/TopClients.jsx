import { topClients } from "../../constants";

const TopClients = () => {
  return (
    <div className="w-full container ml-10 py-20 overflow-hidden flex  flex-col sm:flex-row sm:items-center items-start ">
      <div
        className="w-[300px] shrink-0 px-8 text-gray-600 border-l-4 border-blue-500 bg-white py-2 z-10 text-base lg:text-2xl
       font-semibold sm:text-left  mb-8 sm:mb-0"
      >
        Our top Clients
      </div>
      <div className="flex animate-marquee whitespace-nowrap">
        {topClients.map((topClient) => (
          <img
            key={topClient.id}
            src={topClient.images}
            alt={`Company Logo ${topClient.name}`}
            className="mx-12 h-30 w-50 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
        ))}
      </div>
    </div>
  );
};

export default TopClients;
