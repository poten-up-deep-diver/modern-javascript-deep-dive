const obj = new Object();

console.log(Object.getOwnPropertyNames(obj.__proto__)); // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]

console.log();

const date = new Date();
console.log(date.toString());

const array = new Array(1, 2, 3);
console.log(array.constructor.name);

const number = new Number("12345");
console.log(number.toLocaleString());

console.log();

function Person(name, age) {
  this.name = name;
  this.age = age;
  // toString() Override
  // this.toString = function() {
  // 	return `이름: ${this.name}, 나이: ${this.age}`;
  //
}

const person1 = new Person("종원", 29);
console.log(person1.toString()); // [object Object]

console.log();

Person.prototype.toString = function () {
  return `이름: ${this.name}, 나이: ${this.age}`;
};

const person2 = new Person("철수", 30);
const person3 = new Person("영희", 25);

console.log(person1.toString());
console.log(person2.toString());
console.log(person3.toString());
