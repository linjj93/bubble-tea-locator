import koi from "./Koi.png";
import koiExpress from "./Koi Express.png";
import gongCha from "./GongCha.png";
import liHo from "./LiHo.png";
import tigerSugar from "./Tiger Sugar.png";
// import eachACup from "./Each-A-Cup.png";
import tenRen from "./Tenren.png";

const brands = ["Show me all!", "Gong Cha", "Koi", "LiHo", "Tiger Sugar"];

const userLocation = [
  {
    id: "NE5",
    name: "Clarke Quay MRT",
    latitude: 1.2882433,
    longitude: 103.8463311
  },
  {
    id: "NE4/DT19",
    name: "Chinatown MRT",
    latitude: 1.2847929,
    longitude: 103.8417425
  },
  {
    id: "EW13/NS25",
    name: "City Hall MRT",
    latitude: 1.2930814,
    longitude: 103.849879
  },
  {
    id: "EW14/NS26",
    name: "Raffles Place MRT",
    latitude: 1.2830227,
    longitude: 103.8491478
  },
  {
    id: "DT18",
    name: "Telok Ayer MRT",
    latitude: 1.2822264,
    longitude: 103.846406
  },
  {
    id: "DT17",
    name: "Downtown MRT",
    latitude: 1.279463,
    longitude: 103.8506241
  }
];

const koiShops = [
  {
    id: "koi-rafflescity",
    logo: koiExpress,
    name: "Raffles City",
    brand: "Koi",
    latitude: 1.293418,
    longitude: 103.851561
  },
  {
    id: "koi-citylink",
    logo: koi,
    name: "Citylink Mall",
    brand: "Koi",
    latitude: 1.2928431,
    longitude: 103.8508764
  }
];

const gongChaShops = [
  {
    id: "gongcha-onerafflesplace",
    logo: gongCha,
    name: "One Raffles Place",
    brand: "Gong Cha",
    latitude: 1.2843399,
    longitude: 103.8509823
  }
];

const liHoShops = [
  {
    id: "liho-thecentral",
    logo: liHo,
    name: "The Central",
    brand: "Gong Cha",
    latitude: 1.2891413,
    longitude: 103.8447874
  },
  {
    id: "liho-fareastsquare",
    logo: liHo,
    name: "Far East Square",
    brand: "Gong Cha",
    latitude: 1.2831,
    longitude: 103.848341
  },
  {
    id: "liho-onerafflesplace",
    logo: liHo,
    name: "One Raffles Place",
    brand: "Gong Cha",
    latitude: 1.2844078,
    longitude: 103.8487931
  }
];

const tigerSugarShops = [
  {
    id: "tiger-chinatown",
    logo: tigerSugar,
    name: "Chinatown Point",
    brand: "Tiger Sugar",
    latitude: 1.2856316,
    longitude: 103.8443801
  },
  {
    id: "tiger-capitolpiazza",
    logo: tigerSugar,
    name: "Capitol Piazza",
    brand: "Tiger Sugar",
    latitude: 1.2933627,
    longitude: 103.8497737
  }
];

const tenRenShops = [
  {
    id: "tenren-chinatown",
    logo: tenRen,
    name: "Chinatown Point",
    brand: "Ten Ren",
    latitude: 1.2849138,
    longitude: 103.8424951
  }
];

const shops = [
  ...koiShops,
  ...gongChaShops,
  ...liHoShops,
  ...tigerSugarShops,
  ...tenRenShops
];

export { brands, userLocation, shops };
