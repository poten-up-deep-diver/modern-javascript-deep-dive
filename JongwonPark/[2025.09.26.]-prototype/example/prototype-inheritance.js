function Person(name) {
  this.name = name;
}

Person.prototype.walk = function () {
  console.log(`${this.name}이(가) 걷고 있습니다.`);
};

function Man(name, age) {
  Person.call(this, name); // Person 생성자를 Man의 컨텍스트에서 실행
  this.age = age;
}

Man.prototype = Object.create(Person.prototype);

const man = new Man("종원", 29);
man.walk(); // 종원이(가) 걷고 있습니다.
