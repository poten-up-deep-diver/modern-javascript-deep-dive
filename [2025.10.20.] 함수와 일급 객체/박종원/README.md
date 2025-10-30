### 일급 객체(First-Class Object)란?

일급 객체는 콜백 함수, 고차 함수, 함수형 프로그래밍(map, filter, reduce 등)과 같이 **값 처럼 다룰 수 있는 객체**를 말합니다.

```
💡 왜 '일급 객체' 라고 불리게 됐을까요?
그 이유는 '일급 시민(First-Class Citizen)'이 어원이기 때문입니다.

일급 시민은 **사회에서 투표권, 계약, 재산을 가질 권리 등 모든 권리를 가진 사람** 을 뜻하는데, **다른 값들과 동등한  권리를 가졌고 기본 연산에 참여할 수 있는 객체**라는 뜻에서 일급 객체라고 부릅니다.
```

하지만, 일급 시민도 그렇듯 일급 객체에도 조건이 필요합니다.

1. 무명의 리터럴로 생성할 수 있다. (런타임에 생성이 가능하다)
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다
3. 함수의 매개변수에 전달할 수 있다
4. 함수의 반환값으로 사용할 수 있다.

위 조건이 만족되지 않으면 일급 객체라고 부를 수 없습니다.

```js
// 변수에 함수 할당
const sayHello = function () {
  console.log("Hello");
};

// 함수의 인자로 전달
function talk(action) {
  action(); // 전달 받은 함수 실행
}
talk(sayHello);

// 함수의 반환값으로 사용
function sum(x) {
  return function (y) {
    return x + y;
  };
}

const _sum = sum(5);
console.log(_sum(10)); // 15
```

이처럼 '변수'에 저장이 가능하고, '다른 함수'에 전달 가능하고, '다른 함수로부터 반환' 되기 때문에 **자바스크립트의 '함수'는 일급 객체** 입니다.

---

### 함수 객체의 프로퍼티

자바스크립트에서 **원시 값을 제외한 모든 것은 객체** 입니다.
따라서 함수도 객체이기 때문에 프로퍼티를 가지게 되는데, `Object.getOwnPropertyDescriptors(objectName)`메소드로 객체에 어떤 프로퍼티가 있는지 살펴볼 수 있습니다.

함수에 기본적으로 포함되는 프로퍼티에 대해서 알아보겠습니다.

#### arguments 프로퍼티

함수 객체의 `arguments` 프로퍼티 값은 **arguments 객체**입니다.

argument 객체는 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회(literable) 가능한 유사 배열 객체(array-like object) 입니다.

```js
function getArgument(a, b, c) {
  console.log(arguments);
}

getArgument(1, 2, 3); // Arguments [1, 2, 3]
```

arguments 프로퍼티는 **유사 배열 객체**이기 때문에 length이 있고, 인덱스로 접근이 가능하지만 배열(Array)는 아니기 때문에 map, forEach 함수를 사용할 수 없습니다.

#### length 프로퍼티

arguments 객체의 length 프로퍼티와 함수 객체의 length는 서로 다릅니다.

- arguments 객체의 length는 인자(argument)의 개수
- 함수 객체의 length는 매개 변수(parameter)의 개수

```js
function sum(x, y, z) {
  console.log("arguments.length", arguments.length);
}

sum(1, 2, 3); // arguments.length 3
sum(1, 2); // arguments.length 2
```

즉, function.length는 **함수 선언 시 정의된 매개변수 수**, arguments.length는 **함수 호출 시 실제로 전달된 인자 수** 입니다.

#### name 프로퍼티

함수 객체의 name 프로퍼티는 말 그대로 함수의 이름을 나타냅니다.

하지만 ES5와 ES6 이상에서 name 프로퍼티는 서로 다른 동작을 하므로 주의해야 합니다.
익명 함수 표현식의 경우 ES5에서 name 프로퍼티는 **빈 문자열**을 값으로 갖지만, ES6에서는 함수 객체를 가리키는 식별자(변수)를 값으로 갖습니다.

```js
let namedFunc = function foo() {};
console.log(namedFunc.name); // foo

let anonymousFunc = function () {};
// ES5 : ""
// ES6 : anonymousFunc
console.log(anonymousFunc.name); // anonymousFunc

function bar() {}
console.log(bar.name); // bar
```

#### \_\_proto\_\_ 접근자 프로퍼티

모든 객체는 \[\[Prototype]\] 이라는 내부 슬롯을 갖는데, 내부 슬롯은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체(array의 forEach같은 구현체의 모음)를 가리킵니다.

\_\_proto\_\_ 프로퍼티는 \[\[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티 입니다.
내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근할 수 있습니다.

\[\[Prototype\]\] 내부 슬롯에도 직접 접근할 수 없으며 \_\_proto\_\_ 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있습니다.

#### prototype 프로퍼티

prototype 프로퍼티는 생성자(constructor) 함수로 호출할 수 있는 함수 객체입니다.

일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없습니다.

```js
(function () {}).hasOwnProperty("prototype"); // true
({}).hasOwnProperty("prototype"); // false
```

prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킵니다.
