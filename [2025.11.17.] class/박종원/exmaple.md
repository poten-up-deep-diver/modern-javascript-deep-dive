### 자바스크립트의 class란?

자바스크립트는 prototype 기반 언어로, 모든 객체들은 prototype으로 이루어져 있습니다.

그래서 class 키워드가 생기기 이전에는 추상화 같은 작업을 하기 위해서는 prototype과 function을 이용해 개발을 했지만, 가독성과 직관성에서 깔끔하지 않은 문제가 있었습니다.

그래서 ES6에서 처음 class 문법이 도입되었습니다.

class가 도입됨으로 prototype에서는 메서드가 어디에 정의되었는지에 대한 탐색 시간을 없애고, 다른 언어와 유사한 문법을 가지게 되어 개발편의성과 유지보수, 가독성이 증가되었습니다.

---

### 그럼 자바스크립트도 객체지향 언어인가?

자바스크립트는 다음과 같은 객체지향적 스타일의 문법을 작성할 수 있지만 객체지향적 언어는 아닙니다.

#### 자바스크립트의 '객체지향 프로그래밍' 특징

- 객체 단위로 구성할 수 있다.
- 캡슐화를 할 수 있다.
- 상속이 가능하다
- class 문법이 있다.

#### 자바스크립트의 '함수형 프로그래밍' 특징

- 함수가 1급 객체다.
- 고차 함수가 자연스럽다.
- 클로저로 상태를 캡슐화 할 수 있다.
- 객체는 프로토타입 기반으로 확장된다.

#### 자바스크립트의 '절차지향 프로그래밍' 특징

- 함수 호출 중심의 절차적 흐름이 기본 구조다.
- 데이터와 기능의 분리가 자연스럽다.
- 상태를 직접 변경하면서 흐름을 만든다.

따라서 자바스크립트는 여러 프로그래밍적 특징을 가지고 있는 '**멀티 패러다임 언어**'라고 부릅니다.

---

### class와 prototype의 문법적 차이

#### 문법

```js
// Prototype
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`안녕하세요 저는 ${this.name}입니다.`);
};

const man = new Person("종원");
jongwon.sayHello(); // 안녕하세요 저는 종원입니다.
```

```js
// Class
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`안녕하세요 저는 ${this.name}입니다.`);
  }
}

const man = new Person("종원");
man.sayHello();
```

class는 prototype의 설탕적 문법(syntax sugar)이기 때문에 기존 prototype으로 작성되던 문법을 class로 조금 더 직관적이게 작성할 수 있게 만들어준 문법입니다.

#### 상속

```js
// Prototype
function Gender(name, gender) {
  Person.call(this, name);
  this.gender = gender;
}

Gender.prototype = Object.create(Person.prototype);
Gender.prototype.constructor = Gender;

const gender = new Gender("종원", "남자");
maleJongwon.sayHello(); // 안녕하세요 저는 남자 종원입니다.
```

```js
class Gender extends Person {
  constructor(name, gender) {
    super(name);
    this.gender = gender;
  }
}

const gender = new Gender("종원", "남자");
gender.sayHello(); // 안녕하세요 저는 남자 종원입니다.
```

class에서 extends와 super 덕분에 문법적으로 더 간결하고, 가독성 높게 상속을 구현할 수 있게 되었습니다.

---

### class와 prototype 기술적 관점으로 바라보기

#### class는 prototype 기반

class는 prototype 기반으로 구현되어 있어 **내부적으로도 prototype 기반으로 동작**합니다.

따라서 **class에서 메서드를 생성하더라도 Object.prototype에 저장**되고, **인스턴스 필드(this.name)를 만들더라도 각 객체의 자체 속성에 저장**됩니다.

#### private의 구현

class가 나오기 이전인 ES5 까지는 prototype로 private를 만들기 어려워 중첩 함수(nested function)로 클로저를 활용 해만들었습니다.

함수 내에 변수를 선언하게 되면 변수의 스코프가 함수 스코프로 잡히기 때문에 외부에서 접근하지 못하게되어 private를 중첩 함수로 만들었습니다.

```js
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
```
