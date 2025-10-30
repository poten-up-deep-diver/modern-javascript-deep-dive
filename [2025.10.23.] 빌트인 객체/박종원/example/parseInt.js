console.log(parseInt("3.14abc")); // 3
console.log(parseInt("  -0.123xyz")); // -0
console.log(parseInt("42 is the answer")); // 42
console.log(parseInt("abc123")); // NaN
console.log(parseInt("4ab2.5")); // 4

console.log(parseInt("0xF")); // 15
console.log(parseInt("F", 16)); // 15
console.log(parseInt("111", 2)); // 7
console.log(parseInt("77", 8)); // 63
console.log(parseInt("Z", 36)); // 35
