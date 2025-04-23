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
  sec19,
  sec20,
} from "../assets/images";

import {
  facebook,
  instagram,
  tiktok,
  twitter,
  browser,
  service1,
  service2,
  service3,
  service4,
  service5,
  cv1,
  cv2,
  cv3,
  cv4,
  cv5,
  cv6,
} from "../assets/icons";

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

export const serviceDescription = [
  {
    id: 1,
    title: "Fresh Chicken Supply",
    description:
      "We specialize in supplying fresh chicken to various food services, ensuring quality and satisfaction.",
    images: sec19,
  },
  {
    id: 2,
    title: "Fast Delivery Service",
    description:
      "Quick and reliable delivery of fresh chicken right to your food service establishment.",
    images: sec20,
  },
];

export const services = [
  {
    id: 1,
    images: service1,
    title: "Next day Delivery",
    description: "Free delivery with minimum of 10 bags",
  },
  {
    id: 2,
    images: service2,
    title: "Custom / Specialty Cuts",
    description:
      "Hand-trimmed, specialty chicken cuts prepared just how you like - from fillets to custom portions",
  },
  {
    id: 3,
    images: service3,
    title: "Exceptional Quality",
    description:
      "Exceptional-quality chicken, custom cut to your exact specifications for premium results every time",
  },
  {
    id: 4,
    images: service4,
    title: "Bulk purchase discounts",
    description:
      "We offer substantial discounts for bulk purchases to our clients as they require a large quantity of frozen meat products",
  },
  {
    id: 5,
    images: service5,
    title: "Secure payment options",
    description:
      "Shop with confidence - multiple secure payment methods to protect your purchase.",
  },
];

export const coreValues = [
  {
    id: 1,
    images: cv1,
    title: "Harmony",
    description:
      "We value harmony in all aspects of our business, promoting collaboration, unity, and mutual respect among our team members, partners, and stakeholders. By fostering a harmonious environment, we can achieve greater success and collective growth.",
  },
  {
    id: 2,
    images: cv2,
    title: "High-Quality",
    description:
      "We are committed to upholding the highest standards of quality in every product we distribute and sell. From sourcing premium ingredients to ensuring freshness and safety, we prioritize excellence to deliver exceptional culinary experiences.",
  },
  {
    id: 3,
    images: cv3,
    title: "Honesty",
    description:
      "Honesty and Integrity are fundamental to our operations. We uphold honesty, highest ethical standards, transparently communicating with integrity, and accountability in all our interactions, decisions, and commitments.",
  },
  {
    id: 4,
    images: cv4,
    title: "Just",
    description:
      "We believe in just and fair-trade practices that support farmers, producers, and artisans. By fostering transparent and equitable partnerships, we contribute to a more sustainable and ethical food supply chain.",
  },
  {
    id: 5,
    images: cv5,
    title: "Joy",
    description:
      "We aim to bring joy to every dining experience. Whether through delicious flavors, convenient ordering processes, or exceptional customer service, we strive to create moments of culinary delight for our customers.",
  },
  {
    id: 6,
    images: cv6,
    title: "Journey",
    description:
      "Honesty and Integrity are fundamental to our operations. We uphold honesty, highest ethical standards, transparently communicating with integrity, and accountability in all our interactions, decisions, and commitments.",
  },
];
