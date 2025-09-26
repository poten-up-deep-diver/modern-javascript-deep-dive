function Person(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

const person1 = new Person("종원", 29, "서울시 금천구");

console.log(
  "person1은 Person 프로토타입의 상속? ",
  person1.__proto__ === Person.prototype
); // true
console.log(
  "person1의 프로토타입은 Object 프로토타입의 상속?",
  Person.prototype.__proto__ === Object.prototype
); // true
console.log("person1은 null?", Object.prototype.__proto__ === null); // true

console.log();

console.log("person1의 프로토타입 체인: ");
// person1 -> Person.prototype -> Object.prototype -> null
console.log(person1);
console.log(person1.__proto__); // Person.prototype
console.log(person1.__proto__.__proto__); // Object.prototype
console.log(person1.__proto__.__proto__.__proto__); // null

console.log(Object.prototype.toString.call(person1));
