function Person(name, age) {
  this.name = name;

  var _age = age;

  this.getAge = function () {
    return _age;
  };
}

var person = new Person("종원", 29);
console.log(person.name); // 종원
console.log(person.getAge()); // 29
console.log(person._age); // undefined
