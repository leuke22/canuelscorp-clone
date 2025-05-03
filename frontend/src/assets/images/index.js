import { buildSrc } from "@imagekit/javascript";

const urlEndpoint = "https://ik.imagekit.io/cx99ic1g8/assets/images";

export const sec1 = buildSrc({ urlEndpoint, src: "/sec1.png" });
export const sec2 = buildSrc({ urlEndpoint, src: "/sec2.png" });
export const sec3 = buildSrc({ urlEndpoint, src: "/sec3.png" });
export const sec4 = buildSrc({ urlEndpoint, src: "/sec4.png" });
export const sec11 = buildSrc({ urlEndpoint, src: "/sec11.jpg" });
export const sec12 = buildSrc({ urlEndpoint, src: "/sec12.jpg" });
export const sec13 = buildSrc({ urlEndpoint, src: "/sec13.jpeg" });

export const beefBg = buildSrc({ urlEndpoint, src: "/beefBg.png" });
export const chickenBg = buildSrc({ urlEndpoint, src: "/chickenBg.png" });
export const porkBg = buildSrc({ urlEndpoint, src: "/porkBg.png" });
