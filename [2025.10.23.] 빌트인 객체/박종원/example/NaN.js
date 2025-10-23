console.log(globalThis.NaN); // NaN
console.log(typeof NaN); // number

console.log(0 / 0); // NaN

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(10)); // false

console.log(isNaN(NaN)); // true
console.log(isNaN("Hello")); // true
console.log(Number.isNaN("Hello")); // false

console.log(Infinity === NaN); // false
