import { sec1 } from "../assets/images";
import ShopButton from "../components/ShopButton";
const Hero = () => {
  return (
    <section id="home" className="w-full relative min-h-screen pt-[96px]">
      <div className="relative flex flex-col justify-center items-start w-full">
        <img
          src={sec1}
          alt="sec1"
          className="object-cover w-full h-[calc(100vh-96px)]"
        />
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col text-white">
            <div className="text-white">★</div>
            <p>Quality you can trust.</p>
            <h1>Fresh Chicken Delivery Service</h1>
            <p>
              High-quality chicken for restaurants and food services in Metro
              Manila.
            </p>
            <ShopButton />
          </div>
          <div>Card</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
