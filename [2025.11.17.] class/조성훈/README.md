# 클래스, JS의 새로운 객체 생성 매커니즘

## 들어가기 전

우선, 나는 클래스 기반의 프로그래밍 언어를 공부한 적이 없다. 프로토타입 기반의 JS가 나의 첫 언어이기 때문에 25장에서 이야기 한 문법적 설탕에 관한 내용에는 깊이 공감하지는 못했다. 다만 개발자들끼리 협업을 진행할 때, 자신의 코드 의도를 명확히 하고 구조를 명료하게 통합하는 이점에 대해 이해하고 나니 JS의 클래스 문법이 무섭지 않아졌다!

이번 글에서는, 기존 ES5 생성자 함수와의 차이점을 중심으로 Class 사용의 주된 이유에 대해서 정리해보고자 한다.

## ES5 생성자 함수와 ES6 클래스의 공통점

같은 객체를 생성하는 두 가지 방식을 보자.
생성자 함수와 클래스의 constructor는 인스턴스의 속성을 초기화한다는 목적이 같다. 리액트UI의 클래스 문법을 활용한 컴포넌트 생성 방식을 배웠을 때 만난 constructor와 extend를 이제서야 알게 된다.

```js
// 1. ES5 생성자 함수 (Function Constructor)
function PersonES5(name) {
  // 이 함수 자체가 인스턴스를 생성하고 초기화하는 역할을 함
  this.name = name;
}

// 2. 메서드는 prototype에 별도로 정의해야 함
PersonES5.prototype.sayHi = function () {
  console.log("Hi! My name is " + this.name);
};

var me5 = new PersonES5("Lee");
me5.sayHi(); // Hi! My name is Lee
```

```js
// 1. ES6 클래스
class PersonES6 {
  // constructor는 클래스 내부의 특별한 메서드임
  constructor(name) {
    // 인스턴스의 속성을 초기화하는 역할만 담당
    this.name = name;
  }

  // 2. 메서드는 클래스 블록 안에 깔끔하게 정의
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

var me6 = new PersonES6("Kim");
me6.sayHi(); // Hi! My name is Kim
```

## ES5 생성자 함수와 ES6 클래스의 차이점

1. 호출 방식

ES5 생성자 함수는 일반 함수와 구분되지 않기 때문에 `new`를 빼먹고 호출하면 코드가 오작동할 위험이 있다. 반면, ES6 클래스는 `new` 연산자 없이는 호출 자체를 허용하지 않음으로써 객체 생성을 위한 규격화된 안전 장치를 제공한다.

2. prototype 메서드 정의 방식 (문법적 설탕)

ES6 클래스는 `constructor`를 초기화 전담으로, 나머지 일반 메서드들을 prototype에 자동 연결하는 방식으로 역할을 분리하여 코드를 훨씬 읽기 쉽게 만든다.

3. 호이스팅

ES6 클래스는 선언문 이전에 참조하면 에러가 발생합니다. 즉, 클래스는 반드시 먼저 정의된 후에 인스턴스를 생성할 수 있습니다. 이는 개발자가 코드를 작성하는 순서(정의 후 사용)를 강제하여 더 예측 가능하고 안정적인 코드를 만들 수 있도록 한다.

4. Enumerable false 강제

객체의 특정 프로퍼티가 반복문이나 관련 메서드를 통해 열거(Iteration)될 수 있는지 여부를 결정하는 내부 속성이다 (우리가 공부한 프로퍼티 어트리뷰트!)

왜 false로 강제했을까? 이 부분에 대해서 더 찾아보니, OOP 관습에 따라 `데이터(속성)`과 `동작(메서드)`를 구분하기 때문이라고 한다. 객체가 어떤 동작을 하는지 나열하는 것은 객체 구조를 파악하는데 방해가 되며, ES5 생성자 함수를 더 안전하고 직관적인 문법 class로 대체하는 과정에서, 기존 혼재된 방식을 교통정리 하기 위해 모든 메서드는 false로 통일하여 일관성을 높였다고 한다.

## 그럼 왜 쓰는걸까

문법적 설탕을 넘어, 그 설탕이 제공하는 이점이 개발 과정에서 매우 중요하게 작용하기 때문이다!

### 1. 의도를 명확히 하기 위해

객체의 설계도 역할을 하는 생성자 함수가 일반 함수와 문법적으로 구분이 되지 않았다 (파스칼 케이스를 사용하지만 결국 문법적 구분은 아닌 것)

new 연산자 없이 호출할 위험도 있지만, class 키워드를 사용하면 누구나 이 코드가 객체 생성을 위한 설계도임을 즉시 알 수 있다.

### 2. 높은 가독성, 통합된 구조

ES5 생성자 함수는 객체의 속성 초기화와 메서드 정의가 분리되어 있었다.

- 속성 초기화: 함수 본체 (function Person(...) { this.name = name; })
- 메서드 정의: 함수 외부, prototype에 명시적으로 연결 (Person.prototype.sayHi = function() { ... })

ES6 클래스는 이 두 가지를 하나의 블록으로 통합하여 구조적으로 객체 지향 언어의 클래스 형태와 매우 유사하게 만들어 준다.

```js
class Person { // 시작!
  constructor(name) { ... } // 1. 속성 초기화 담당
  sayHi() { ... }           // 2. 메서드 정의 담당
} // 끝!
```

이런 응집성은 코드를 처음 읽는 개발자가 객체 구조를 한 눈에 파악할 수 있게 해준다.

### 3. 객체 지향 패턴과의 일관성

나에게는 해당하지 않지만, 다른 언어에 익숙한 개발자들이 JS를 더 쉽게 배울 수 있도록 문법적 장벽을 낮춰준다. 웹 브라우저 언어를 넘어서, 노드제이에스 등 다양한 분야에서 사용되며 이 필요성은 더욱 대두 되었다.

### 4. 상속의 용이성

ES5에서 상속을 구현하려면 call()이나 apply()를 사용하고 prototype 체인을 수동으로 연결하는 복잡한 과정이 필요했다.

```js
// 1. 상위(부모) 생성자 함수
function Person(name, age) {
  this.name = name; // 부모가 정의하는 속성
  this.age = age;
}

// 2. 하위(자식) 생성자 함수
function Student(name, age, school) {
  // A. 부모 생성자(Person)를 호출하고, this를 Student 인스턴스로 바인딩
  // 이렇게 하면 Person 내부의 'this.name'과 'this.age'가 Student 인스턴스에 정의됨
  Person.call(this, name, age);

  this.school = school; // 자식이 추가로 정의하는 속성
}
```

```js
// B. 프로토타입 체인을 수동으로 연결
// Object.create(상위_프로토타입)를 사용하여 하위 프로토타입을 만듦
Student.prototype = Object.create(Person.prototype);

// 주의: Student.prototype의 constructor 속성을 다시 Student로 복원.
// Object.create()로 인해 constructor가 Person으로 바뀌었기 때문.
Student.prototype.constructor = Student;

// 이제 Student만의 메서드를 추가.
Student.prototype.study = function () {
  console.log(`${this.name} is studying.`);
};
```

ES6 클래스에서는 상속이 extends와 super() 키워드를 사용하여 매우 직관적으로 이루어진다.

```js
// ES6 상속: 직관적
class Student extends Person {
  constructor(name, school) {
    super(name); // 부모 클래스의 constructor 호출
    this.school = school;
  }
}
```

## 결론

클래스는 문법적 설탕을 넘어, 새로운 객체 생성 방법론이다.
기존 개발자의 이해를 돕기 위해 만들어졌지만, 평소 JS 생성자 함수에서 불편했던 점을 겸사겸사 개선하고 인테리어 한 느낌이랄까.

1. 메서드 정의 방식 통일과 Enumerable 강제
2. new 연산자 호출 강제
3. 엄격해진 this 바인딩 (자동 strict mode)
