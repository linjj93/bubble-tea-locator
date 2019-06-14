const stores = ["Gong Cha", "Koi", "LiHo", "Ten Ren", "Tiger Sugar"];

let storesCheckState = {};

for (let store of stores) {
  storesCheckState[store] = false;
}

export { stores, storesCheckState };
