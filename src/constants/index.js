import sec3 from "../assets/images/sec3.png";
import sec4 from "../assets/images/sec4.png";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export const formFields = [
  {
    name: "Name",
    label: "Your First Name",
    type: "text",
    required: "false",
  },
  {
    name: "Email*",
    label: "Your Email Address",
    type: "email",
    required: "true",
  },
  {
    name: "Phone Number*",
    label: "Enter your phone number",
    type: "tel",
    required: "true",
  },
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
    title: "Freshness Guaranteed",
    description:
      "We ensure that all our chicken products maintain the highest standards of freshness and quality.",
    images: sec3,
  },
  {
    title: "Fast Delivery Service",
    description:
      "Quick and reliable delivery of fresh chicken right to your food service establishment.",
    images: sec4,
  },
];
