class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`안녕하세요 저는 ${this.gender} ${this.name}입니다.`);
  }
}

class Gender extends Person {
  constructor(name, gender) {
    super(name);
    this.gender = gender;
  }
}

const man = new Person("종원");
man.sayHello(); // 안녕하세요 저는 undefined 종원입니다.

const gender = new Gender("종원", "남자");
gender.sayHello(); // 안녕하세요 저는 남자 종원입니다.
