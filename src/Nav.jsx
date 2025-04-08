import headerLogo from "./assets/canuels-logo.png";
import { search, menu } from "./assets/icons";
import { navLinks } from "./constants";

const Nav = () => {
  return (
    <header className="px-5 fixed z-50 w-full top-0 bg-white">
      <nav className="flex flex-row justify-between items-center w-full">
        <div className="flex-0.5 flex justify-center shrink-0">
          <a href="/">
            <img
              src={headerLogo}
              alt="canuelscorp-logo"
              className="object-cover sm:ml-16"
              width={100}
              height={100}
            />
          </a>
        </div>
        <ul className="flex flex-1 flex-row justify-center max-lg:hidden gap-10">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                className="hover:underline text-black text-lg"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <section className="flex flex-row gap-5 items-center mr-10 sm:gap-14">
          <div
            className="flex items-center w-56 md:w-64 lg:w-2xs border-2 border-black/60 px-3 py-1 rounded-xl transition-all duration-300 
           focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
          >
            <img
              className="w-5 h-5 opacity-70 shrink-0"
              src={search}
              alt="search-icon"
            />
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 outline-none bg-transparent text-sm placeholder-gray-500"
            />
          </div>

          {/*<img className="w-10 h-10" src={shoppingBag} alt="shopping-bag" />*/}

          <div className="hidden max-lg:flex shrink-0 items-center w-10 h-10">
            <img src={menu} alt="menu-icon" />
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Nav;
