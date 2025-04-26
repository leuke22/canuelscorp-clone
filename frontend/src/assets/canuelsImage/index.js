import { buildSrc } from "@imagekit/javascript";

const urlEndpoint = "https://ik.imagekit.io/cx99ic1g8/assets/canuelsImage";

export const bgSec1 = buildSrc({ urlEndpoint, src: "/bgSec1.png" });
export const bgSec2 = buildSrc({ urlEndpoint, src: "/bgSec2.png" });
export const team = buildSrc({ urlEndpoint, src: "/team.jpg" });
export const canuelsLogo = buildSrc({
  urlEndpoint,
  src: "/canuels-logo.png",
});
export const canuelsLogoCircle = buildSrc({
  urlEndpoint,
  src: "/logoCircle.png",
});
