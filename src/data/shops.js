import koi from "../assets/logos/Koi.png";
import koiExpress from "../assets/logos/Koi Express.png";
import gongCha from "../assets/logos/GongCha.png";
import liHo from "../assets/logos/LiHo.png";
import tigerSugar from "../assets/logos/Tiger Sugar.png";
import tenRen from "../assets/logos/Tenren.png";

const koiShops = [
  {
    id: "koi-rafflescity",
    logo: koiExpress,
    name: "Raffles City",
    unit: "#B1-71",
    brand: "Koi",
    queueTime: 5,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2937075,
    longitude: 103.8518958
  },
  {
    id: "koi-citylink",
    logo: koi,
    name: "Citylink Mall",
    unit: "#B1-66",
    brand: "Koi",
    queueTime: 10,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2928431,
    longitude: 103.8508764
  },
  {
    id: "koi-chinatownpoint",
    logo: koi,
    name: "Chinatown Point",
    unit: "#01-39",
    brand: "Koi",
    queueTime: 20,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2854009,
    longitude: 103.8439811
  },
  {
    id: "koi-thearcade",
    logo: koi,
    name: "The Arcade",
    unit: "#01-12",
    brand: "Koi",
    queueTime: 8,
    openingTime: "10:00",
    closingTime: "20:00",
    latitude: 1.2836638,
    longitude: 103.8503334
  },
  {
    id: "koi-plazasingapura1",
    logo: koi,
    name: "Plaza Singapura",
    unit: "#01-68",
    brand: "Koi",
    queueTime: 11,
    openingTime: "10:30",
    closingTime: "22:30",
    latitude: 1.3007936,
    longitude: 103.8425952
  },
  {
    id: "koi-plazasingapurab2",
    logo: koi,
    name: "Plaza Singapura (Basement)",
    unit: "#B2-11",
    brand: "Koi",
    queueTime: 14,
    openingTime: "10:00",
    closingTime: "22:00",
    latitude: 1.3007936,
    longitude: 103.8425952
  },
  {
    id: "koi-bugisplus",
    logo: koi,
    name: "Bugis+",
    unit: "#01-01",
    brand: "Koi",
    queueTime: 10,
    openingTime: "10:30",
    closingTime: "22:30",
    latitude: 1.2997181,
    longitude: 103.8541392
  },
  {
    id: "koi-milleniawalk",
    logo: koi,
    name: "Millenia Walk",
    unit: "#01-85",
    brand: "Koi",
    queueTime: 5,
    openingTime: "11:00",
    closingTime: "21:00",
    latitude: 1.2933613,
    longitude: 103.8575806
  }
];

const gongChaShops = [
  {
    id: "gongcha-onerafflesplace",
    logo: gongCha,
    name: "One Raffles Place",
    unit: "#B1-39",
    brand: "Gong Cha",
    queueTime: 15,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2841886,
    longitude: 103.8505106
  },
  {
    id: "gongcha-SMU",
    logo: gongCha,
    name: "SMU",
    unit: "#01-01",
    brand: "Gong Cha",
    queueTime: 9,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.294981,
    longitude: 103.850458
  },
  {
    id: "gongcha-bugis",
    logo: gongCha,
    name: "Bugis Junction",
    unit: "#03-08",
    brand: "Gong Cha",
    queueTime: 15,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.299381,
    longitude: 103.8554475
  },
  {
    id: "gongcha-plazasingapura",
    logo: gongCha,
    name: "Plaza Singapura",
    unit: "#B1-K7",
    brand: "Gong Cha",
    queueTime: 12,
    openingTime: "10:00",
    closingTime: "22:00",
    latitude: 1.3007936,
    longitude: 103.8425952
  }
];

const liHoShops = [
  {
    id: "liho-thecentral",
    logo: liHo,
    name: "The Central",
    unit: "#01-37",
    brand: "LiHo",
    queueTime: 5,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.288956,
    longitude: 103.846964
  },
  {
    id: "liho-fareastsquare",
    logo: liHo,
    name: "Far East Square",
    unit: "#01-02",
    brand: "LiHo",
    queueTime: 10,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.283158,
    longitude: 103.84794
  },
  {
    id: "liho-onerafflesplace",
    logo: liHo,
    name: "One Raffles Place",
    unit: "#B1-10",
    brand: "LiHo",
    queueTime: 7,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2841886,
    longitude: 103.8505106
  },
  {
    id: "liho-capitolpiazza",
    logo: liHo,
    name: "Capitol Piazza",
    unit: "#B2-31",
    brand: "LiHo",
    queueTime: 3,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2930854,
    longitude: 103.85044
  },
  {
    id: "liho-luckychinatown",
    logo: liHo,
    name: "Lucky Chinatown",
    unit: "#01-09",
    brand: "LiHo",
    queueTime: 8,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.283644,
    longitude: 103.8433191
  },
  {
    id: "liho-tanjongpagarcentre",
    logo: liHo,
    name: "Tanjong Pagar Center",
    unit: "#B2-20",
    brand: "LiHo",
    queueTime: 8,
    openingTime: "08:00",
    closingTime: "21:00",
    latitude: 1.2770375,
    longitude: 103.8436887
  },
  {
    id: "liho-asiasquare",
    logo: liHo,
    name: "Asia Square Tower 2",
    unit: "#02-08",
    brand: "LiHo",
    queueTime: 12,
    openingTime: "08:00",
    closingTime: "20:00",
    latitude: 1.2779532,
    longitude: 103.8509025
  }
];

const tigerSugarShops = [
  {
    id: "tiger-chinatownpoint",
    logo: tigerSugar,
    name: "Chinatown Point",
    unit: "#B1-42",
    brand: "Tiger Sugar",
    queueTime: 40,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2854009,
    longitude: 103.8439811
  },
  {
    id: "tiger-capitolpiazza",
    logo: tigerSugar,
    name: "Capitol Piazza",
    unit: "#B2-32",
    brand: "Tiger Sugar",
    queueTime: 30,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2930854,
    longitude: 103.85044
  }
];

const tenRenShops = [
  {
    id: "tenren-chinatown",
    logo: tenRen,
    name: "Chinatown Point",
    unit: "#01-07",
    brand: "Ten Ren",
    queueTime: 30,
    openingTime: "10:00",
    closingTime: "21:00",
    latitude: 1.2854009,
    longitude: 103.8439811
  }
];

const shops = [
  ...koiShops,
  ...gongChaShops,
  ...liHoShops,
  ...tigerSugarShops,
  ...tenRenShops
];

export { shops };
