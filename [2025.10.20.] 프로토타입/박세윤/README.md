# [JS] prototype과 **proto**의 차이

## 들어가기 전

「모던 자바스크립트 Deep Dive」18징~19장을 읽으면서, 자바스크립트 언어가 프로토타입을 기반으로 상속을 구현하며 작동하는 원리에 대해 알아보았다.

그런데 가장 헷갈렸던 부분이, `prototype` 프로퍼티와 `__proto__` 접근자, 그리고 `[[prototype]]` 내부 슬롯 까지 비슷하면서 헷갈리는 용어들이 많아 이해하기 어려웠다.

이 부분을 하나하나 짚어보면서 정확히 각 용어들의 차이점은 무엇이고, 프로토타입 체인이 어떻게 구성되어 있는지 정리해보고자 한다.

## 프로토타입이란?

우선 **프로토타입**이 무엇인지 알아보자. 아래의 세 줄의 설명으로 프로토타입은 정의된다.

1. 프로토타입은 **객체 간 상속**을 구현하기 위해 사용함
2. 프로토타입은 어떤 객체의 **상위 객체 역할**을 하는 객체로서, 하위 객체에 **공유 프로퍼티를 제공**함
3. 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 사용할 수 있음

다시 말하면, 하위의 공통적인 요소를 상위에 작성하여 효율적으로 사용하기 위한 수단이라고 비유적으로 설명할 수 있겠다.

## [[prototype]] 내부 슬롯

그렇다면 내부 슬롯은 무엇일까?

내부 슬롯은 프로퍼티와 유사하게, 객체의 일부로 구성되어 있다. 하지만 접근성과 목적에서 차이가 존재한다.

내부 슬롯은 개발자가 코드상에서 직접 접근할 수 없는 객체의 숨겨진 내부 상태이고, 프로퍼티는 개발자가 자유롭게 접근하고 조작할 수 있는 외부 상태이다.

참고로, 모든 객체는 `[[prototype]]` 이라는 내부 슬롯을 가진다. 그리고, 이 내부슬롯은 `__proto__`를 통해 접근할 수 있다.

## prototype과 ****proto****의 차이

내부 슬롯은 알겠지만, prototype과 **proto**는 또 무엇일까?

둘 다 본인 객체의 프로토타입(부모 객체)를 가리키는 것 처럼 보이는데, 차이점은 무엇일까? 다음의 표를 통해 차이점을 알아보자.

| 구분   | prototype                                            | **proto**                                                          |
| ------ | ---------------------------------------------------- | ------------------------------------------------------------------ |
| 소유자 | 생성자 함수                                          | 모든 객체                                                          |
| 역할   | 인스턴스들의 부모 역할을 할 프로토타입 객체를 가리킴 | prototype 프로퍼티가 가리키는 프로토타입 객체에 접근하기 위해 사용 |
| 용도   | 인스턴스들의 공유 자원을 정의하기 위해 사용          | 객체의 프로토타입을 확인하거나 탐색하기 위함                       |

정리해보자면, 둘 다 객체의 프로퍼티인 것은 동일하다.

하지만, `prototype`은 **인스턴스의 부모 역할**을 하는 프로토타입 객체이며, `__proto__`는 prototype 프로퍼티가 가리키는 프로토타입 객체에 접근하기 위한 **접근자**인 것이다.

또한 `prototype` 프로퍼티는 생성자 함수 객체만이 가지고 있으며, `__proto__`프로퍼티는 모든 객체가 가지고 있다.(null을 의도적으로 프로토타입으로 설정해놓은 경우 제외)

사용 예시 코드를 통해 보면 더욱 차이를 알 수 있다.

```jsx
// 옳은 예시
function Person(name){
	this.name = name;
}

// 인스턴스들의 공유 자원 정의
Person.prototype.printName = function(){
	console.log(`My name is ${this.name}`};
};

const user = new Person('Seyun');
user.printName(); // My name is Seyun
```

```jsx
// 틀린 예시
function Person(name) {
  this.name = name;
}

Person.__proto__.printName = function () {
  console.log(`My name is ${this.name}`);
};

const user = new Person('Seyun');
user.printName(); // TypeError: user.printName is Not Function
```

- 옳은 예시 설명
  `Person`은 생성자 함수이므로 `prototype` 프로퍼티를 가지며, `Person.prototype` 은 생성될 객체의 부모가 될 객체를 가리킨다. 따라서 `Person.prototype`에 정의한 `printName`을 하위 인스턴스에서 호출할 수 있다.
- 틀린 예시 설명
  `Person`은 생성자 함수이며, 모든 함수는 기본적으로 `Function.prototype`을 프로토타입으로 가진다. 따라서 `Person.__proto__`는 `Function.prototype`을 의미한다.
  따라서 `Function.prototype` 에 `printName`을 정의한다면, `user` 인스턴스에서 호출할 수 없다.

## 프로토타입 체인 도식화

위와 같이 설명을 적어봤지만, 명확하게 이해가 되지 않는다. 위의 예시를 도식화한 그림을 한번 보자.

<div style="display:flex; justify-content:center;"><img src="https://velog.velcdn.com/images/seyun0714/post/f2bbab16-e932-4492-9963-3981ccd1f27f/image.png" width="500"/></div>

위 그림과 같이 Person 생성자 함수를 중심으로 봐보자.

`Person.__proto__`로 접근하는 경우, `Function.prototype`을 가리킨다.

`Person.prototype`으로 접근하는 경우, 내부 슬롯이 아닌, 생성자 함수의 프로퍼티인 prototype 프로퍼티를 의미하며, 이는 생성되는 인스턴스(user)의 부모 요소를 가리킨다.

따라서 user에서 `printName` 함수를 찾고, `__proto__` 경로를 따라가면서 printName을 찾는데, 이때 `Person.prototype`에 해당 함수가 있어 그 함수가 호출되는 것이다.

이게 바로 **프로토타입 체인**이다.

## 결론

1. `prototype`은 자식에게 물려줄 것들을 작성하는데 사용
2. `__proto__`는 부모가 물려준 것을 확인하는 통로
3. 프로토타입 체인은 본인한테 없는 것을 `__proto__`통로를 통해 찾아가는 과정
