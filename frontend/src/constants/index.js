import {
  sec3,
  sec4,
  sec11,
  sec12,
  beefBg,
  chickenBg,
  porkBg,
} from "../assets/images";

import {
  topClient1,
  topClient2,
  topClient3,
  topClient4,
  topClient5,
  topClient6,
  topClient7,
  topClient8,
  topClient9,
  topClient10,
} from "../assets/canuelsImage";

import { TbTruckDelivery } from "react-icons/tb";
import { GiMeatCleaver, GiMeat, GiPathDistance } from "react-icons/gi";
import { BiSolidDiscount } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import {
  FaFacebook,
  FaInstagram,
  FaHandHoldingHeart,
  FaPhoneAlt,
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import {
  FaSquareXTwitter,
  FaGlobe,
  FaRegHandshake,
  FaPeopleRoof,
  FaMapLocationDot,
} from "react-icons/fa6";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdWorkspacePremium, MdEmail } from "react-icons/md";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About Us" },
];

export const adminLinks = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export const chickenDescription = [
  {
    title: "Fresh Chicken Supplier",
    description:
      "At Canuels Enterprises Corporation, we specialize in delivering fresh, high-quality chicken to restaurants and food services throughout Metro Manila, ensuring that our clients receive only the best products for their culinary needs.",
  },
  {
    title: "Serving Metro Manila",
    description:
      "Our commitment to quality and service sets us apart. We pride ourselves on providing top-notch chicken products that meet the highest standards, making us a trusted partner for food service establishments.",
  },
];

export const deliverDescription = [
  {
    id: 1,
    title: "Freshness Guaranteed",
    description:
      "We ensure that all our chicken products maintain the highest standards of freshness and quality.",
    images: sec3,
  },
  {
    id: 2,
    title: "Fast Delivery Service",
    description:
      "Quick and reliable delivery of fresh chicken right to your food service establishment.",
    images: sec4,
  },
];

export const reviews = [
  {
    id: 1,
    name: "MC Wilson",
    place: "Quezon City",
    images: topClient1,
    reviews:
      "Canuels Enterprises has been our go-to supplier for fresh chicken. Their quality is unmatched!",
  },
  {
    id: 2,
    name: "Migs Litson",
    place: "Taguig City",
    images: topClient4,
    reviews:
      "The freshness and quality of Canuels' chicken have elevated our dishes to a whole new level.",
  },
  {
    id: 3,
    name: "Pa Chix",
    place: "Caloocan City",
    images: topClient5,
    reviews:
      "I love the convenience of Canuels' delivery service. The chicken always arrives fresh and on time.",
  },
];

export const topClients = [
  {
    id: 1,
    name: "McWilson",
    images: topClient1,
  },
  {
    id: 2,
    name: "CafeFrance",
    images: topClient2,
  },
  {
    id: 3,
    name: "Moment the Grocer",
    images: topClient3,
  },
  {
    id: 4,
    name: "Migs Litsong Manok at Liempo",
    images: topClient4,
  },
  {
    id: 5,
    name: "Pa Chix",
    images: topClient5,
  },
  {
    id: 6,
    name: "Artemis",
    images: topClient6,
  },
  {
    id: 7,
    name: "Family Fried Chicken",
    images: topClient7,
  },
  {
    id: 8,
    name: "Fondre",
    images: topClient8,
  },
  {
    id: 9,
    name: "Arancia",
    images: topClient9,
  },
  {
    id: 10,
    name: "Gordo's Crispy Pata",
    images: topClient10,
  },
];

export const offers = [
  {
    id: 1,
    image: beefBg,
    name: "Beef",
  },
  {
    id: 2,
    image: chickenBg,
    name: "Chicken",
  },
  {
    id: 3,
    image: porkBg,
    name: "Pork",
  },
];

export const socialMediaLinks = [
  {
    id: 1,
    name: "Facebook",
    Icons: FaFacebook,
    url: "https://www.facebook.com/canuelscorp",
  },
  {
    id: 2,
    name: "Instagram",
    Icons: FaInstagram,
    url: "https://www.instagram.com/canuelscorp",
  },
  {
    id: 3,
    name: "TikTok",
    Icons: AiFillTikTok,
    url: "https://www.tiktok.com/@canuelscorp",
  },
  {
    id: 4,
    name: "Twitter",
    Icons: FaSquareXTwitter,
    url: "https://twitter.com/canuelscorp",
  },
  {
    id: 5,
    name: "Website",
    Icons: FaGlobe,
    url: "https://www.canuelscorp.com",
  },
];

export const serviceDescription = [
  {
    id: 1,
    title: "Fresh Chicken Supply",
    description:
      "We specialize in supplying fresh chicken to various food services, ensuring quality and satisfaction.",
    images: sec11,
  },
  {
    id: 2,
    title: "Fast Delivery Service",
    description:
      "Quick and reliable delivery of fresh chicken right to your food service establishment.",
    images: sec12,
  },
];

export const services = [
  {
    id: 1,
    Icons: TbTruckDelivery,
    title: "3 days Delivery",
    description: "Free delivery with minimum of 10 bags",
  },
  {
    id: 2,
    Icons: GiMeatCleaver,
    title: "Custom / Specialty Cuts",
    description:
      "Hand-trimmed, specialty chicken cuts prepared just how you like - from fillets to custom portions",
  },
  {
    id: 3,
    Icons: GiMeat,
    title: "Exceptional Quality",
    description:
      "Exceptional-quality chicken, custom cut to your exact specifications for premium results every time",
  },
  {
    id: 4,
    Icons: BiSolidDiscount,
    title: "Bulk purchase discounts",
    description:
      "We offer substantial discounts for bulk purchases to our clients as they require a large quantity of frozen meat products",
  },
  {
    id: 5,
    Icons: RiSecurePaymentLine,
    title: "Secure payment options",
    description:
      "Shop with confidence - multiple secure payment methods to protect your purchase.",
  },
];

export const contactInfo = [
  {
    id: 1,
    Icons: FaMapLocationDot,
    description: "21 Engineer St, Novaliches, Quezon City, 1116 Metro Manila",
  },
  {
    id: 2,
    Icons: MdEmail,
    description: "canuelscorp@gmail.com",
  },
  {
    id: 3,
    Icons: FaPhoneAlt,
    description: "+639123456789",
  },
];

export const deliveryLocation = [
  {
    id: 1,
    location: "Quezon City",
  },
  {
    id: 2,
    location: "Manila",
  },
  {
    id: 3,
    location: "Caloocan",
  },
  {
    id: 4,
    location: "Makati",
  },
  {
    id: 5,
    location: "Pasig",
  },
  {
    id: 6,
    location: "Marikina",
  },
];

export const coreValues = [
  {
    id: 1,
    Icons: LiaHandsHelpingSolid,
    title: "Harmony",
    description:
      "We value harmony in all aspects of our business, promoting collaboration, unity, and mutual respect among our team members, partners, and stakeholders. By fostering a harmonious environment, we can achieve greater success and collective growth.",
  },
  {
    id: 2,
    Icons: MdWorkspacePremium,
    title: "High-Quality",
    description:
      "We are committed to upholding the highest standards of quality in every product we distribute and sell. From sourcing premium ingredients to ensuring freshness and safety, we prioritize excellence to deliver exceptional culinary experiences.",
  },
  {
    id: 3,
    Icons: FaHandHoldingHeart,
    title: "Honesty",
    description:
      "Honesty and Integrity are fundamental to our operations. We uphold honesty, highest ethical standards, transparently communicating with integrity, and accountability in all our interactions, decisions, and commitments.",
  },
  {
    id: 4,
    Icons: FaRegHandshake,
    title: "Just",
    description:
      "We believe in just and fair-trade practices that support farmers, producers, and artisans. By fostering transparent and equitable partnerships, we contribute to a more sustainable and ethical food supply chain.",
  },
  {
    id: 5,
    Icons: FaPeopleRoof,
    title: "Joy",
    description:
      "We aim to bring joy to every dining experience. Whether through delicious flavors, convenient ordering processes, or exceptional customer service, we strive to create moments of culinary delight for our customers.",
  },
  {
    id: 6,
    Icons: GiPathDistance,
    title: "Journey",
    description:
      "Honesty and Integrity are fundamental to our operations. We uphold honesty, highest ethical standards, transparently communicating with integrity, and accountability in all our interactions, decisions, and commitments.",
  },
];
