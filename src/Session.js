const deps = ["a", "c"];

const objects1 = [
  { a: 1, b: 2, c: 3, d: 4, e: 5 },
  { a: 1, b: 32, c: 3, d: 6, e: 15 },
  { a: 1, b: 2, c: 3, d: 8, e: 33 }
];

const objects2 = [
  { a: 1, b: 2, c: 3, d: 4, e: 5 },
  { a: 1, b: 2, c: 3, d: 6, e: 15 },
  { a: 1, b: 2, c: 3, d: 8, e: 33 }
];

const objects3 = [
  { a: 1, b: 2, c: 7, d: 4, e: 5 },
  { a: 1, b: 2, c: 3, d: 6, e: 15 },
  { a: 1, b: 2, c: 3, d: 8, e: 33 }
];

shouldRender(objects1); // false
shouldRender(objects2); // false
shouldRender(objects3); // true

function shouldRender(deps, list) {
  return !deps.every(dep => list.every(elem => elem[dep] === list[0][dep]));
}
