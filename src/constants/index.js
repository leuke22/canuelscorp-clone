import {
  sec3,
  sec4,
  dp1,
  dp2,
  dp3,
  sec5,
  sec6,
  sec7,
  sec8,
  sec9,
  sec10,
} from "../assets/images";

import { facebook, instagram, tiktok, twitter, browser } from "../assets/icons";

import {
  prod1,
  prod2,
  prod3,
  prod4,
  prod5,
  prod6,
  prod7,
  prod8,
  prod9,
  prod10,
  prod11,
  prod12,
  prod13,
} from "../assets/productImage";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
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

export const galleryImages = [
  { id: 1, image: sec5 },
  { id: 2, image: sec6 },
  { id: 3, image: sec7 },
  { id: 4, image: sec8 },
  { id: 5, image: sec9 },
  { id: 6, image: sec10 },
];

export const socialMediaLinks = [
  {
    name: "Facebook",
    icon: facebook,
    url: "https://www.facebook.com/canuelscorp",
  },
  {
    name: "Instagram",
    icon: instagram,
    url: "https://www.instagram.com/canuelscorp",
  },
  { name: "TikTok", icon: tiktok, url: "https://www.tiktok.com/@canuelscorp" },
  { name: "Twitter", icon: twitter, url: "https://twitter.com/canuelscorp" },
  { name: "Website", icon: browser, url: "https://www.canuelscorp.com" },
];

export const products = [
  {
    id: 1,
    name: "Cook’s Freshly Frozen Premium Whole Chicken",
    image: prod1,
  },
  {
    id: 2,
    name: "Cook’s Freshly Frozen Premium Chicken Wings",
    image: prod2,
  },
  {
    id: 3,
    name: "Cook’s Freshly Frozen Premium Chicken Breast",
    image: prod3,
  },
  {
    id: 4,
    name: "Cook’s Freshly Frozen Premium Chicken Thigh",
    image: prod4,
  },
  {
    id: 5,
    name: "Cook’s Premium Whole Chicken",
    image: prod5,
  },
  {
    id: 6,
    name: "Chicken Gizzards",
    image: prod6,
  },
  {
    id: 7,
    name: "Chicken Drumsticks",
    image: prod7,
  },
  {
    id: 8,
    name: "Chicken Neck",
    image: prod8,
  },
  {
    id: 9,
    name: "Chicken Wings",
    image: prod9,
  },
  {
    id: 10,
    name: "Chicken Ballotine",
    image: prod10,
  },
  {
    id: 11,
    name: "Chicken Thigh",
    image: prod11,
  },
  {
    id: 12,
    name: "Chicken Breast",
    image: prod12,
  },
  {
    id: 13,
    name: "Chicken Liver",
    image: prod13,
  },
];
