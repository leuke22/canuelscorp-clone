import { chickens } from "../assets/images";
import { chickenDescription } from "../constants";

const Suppliers = () => {
  return (
    <section className="px-8 py-12 text-black">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-3xl">
          Quality Chicken Distribution in Manila
        </h1>
        <div className="flex flex-row gap-10">
          {chickenDescription.map((items) => (
            <div>
              <h2 className="text-[20px] font-semibold pb-1">{items.title}</h2>
              <p>{items.description}</p>
            </div>
          ))}
        </div>
        <img
          className="w-full max-h-80 object-cover opacity-85 rounded-2xl lg:mt-4 lg:max-h-100 lg:object-center"
          src={chickens}
          alt="sec2"
        />
      </div>
    </section>
  );
};

export default Suppliers;
