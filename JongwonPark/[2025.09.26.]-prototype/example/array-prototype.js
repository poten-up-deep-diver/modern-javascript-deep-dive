const array = [];

console.log(array instanceof Array); // true

// Array.prototype
console.log(Object.getPrototypeOf(array));

// Object.prototype
console.log(Object.getOwnPropertyNames(Array.prototype));
