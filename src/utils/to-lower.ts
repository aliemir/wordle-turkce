const letters = [
  ["İ", "i"],
  ["I", "ı"],
  ["Ş", "ş"],
  ["Ç", "ç"],
  ["Ö", "ö"],
  ["Ü", "ü"],
  ["Ğ", "ğ"],
];

export const toLower = (word: string) => {
  let replaced = word;
  letters.forEach(([l1, l2]) => {
    replaced = replaced.replace(new RegExp(`${l1}`, "g"), l2);
  });
  return replaced.toLowerCase();
};

export const toUpper = (word: string) => {
  let replaced = word;
  letters.forEach(([l1, l2]) => {
    replaced = replaced.replace(new RegExp(`${l2}`, "g"), l1);
  });
  return replaced.toUpperCase();
};
