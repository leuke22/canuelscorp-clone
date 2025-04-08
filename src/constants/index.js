import { sec3, sec4, dp1, dp2, dp3 } from "../assets/images";

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

export const reviews = [
  {
    name: "John Doe",
    place: "Makati City",
    images: dp1,
    reviews:
      "Canuels Enterprises has been our go-to supplier for fresh chicken. Their quality is unmatched!",
  },
  {
    name: "Jane Smith",
    place: "Quezon City",
    images: dp2,
    reviews:
      "The freshness and quality of Canuels' chicken have elevated our dishes to a whole new level.",
  },
  {
    name: "Michael Johnson",
    place: "Pasig City",
    images: dp3,
    reviews:
      "I love the convenience of Canuels' delivery service. The chicken always arrives fresh and on time.",
  },
];
