function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`안녕하세요 저는 ${this.gender} ${this.name}입니다.`);
};

function Gender(name, gender) {
  Person.call(this, name);
  this.gender = gender;
}

Gender.prototype = Object.create(Person.prototype);
Gender.prototype.constructor = Gender;

const man = new Person("종원");
man.sayHello(); // 안녕하세요 저는 undefined 종원입니다.

const gender = new Gender("종원", "남자");
gender.sayHello(); // 안녕하세요 저는 남자 종원입니다.
