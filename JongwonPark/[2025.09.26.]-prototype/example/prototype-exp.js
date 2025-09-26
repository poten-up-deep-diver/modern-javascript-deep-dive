function Person(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

Person.prototype.getInfo = function () {
  return `Name: ${this.name}, Age: ${this.age}, Address: ${this.address}`;
};

const person1 = new Person("종원", 29, "서울시 금천구");

console.log(person1.getInfo());
