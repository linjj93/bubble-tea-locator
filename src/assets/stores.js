const stores = ["Gong Cha", "Koi", "LiHo", "Ten Ren", "Tiger Sugar"];

let checkboxState = { "Any Store": false };

for (let store of stores) {
  checkboxState[store] = false;
}

export { stores, checkboxState };
