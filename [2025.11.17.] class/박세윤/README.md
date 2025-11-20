# [JS] 클래스와 상속

## ✋🏻들어가기 전

자바스크립트를 깊게 공부해보기 전에는, 클래스의 개념을 자바 등의 다른 언어와 비슷하게 생각하고 사용해왔던 것 같다.

그러다가 자바스크립트를 공부하면서, 생성자 함수를 알게 되었고 클래스는 이를 쉽게 작성하기 위해서 추가된 **문법적 설탕**이라는 부분이 놀라왔다.

오늘은, 「모던 자바스크립트 Deep Dive」25장을 읽으며 공부했던 클래스에 대해서 정리해보고자 한다.

## 🤔 JS에서의 클래스

자바스크립트는 프로토타입 기반 언어라는 큰 특징을 가지고 있는데,

자바스크립트에서의 클래스는 기존의 생성자 함수 + 프로토타입을 사용해서 구현하던 **인스턴스 생성 및 상속을 보다 구조화된 방식으로 표현**하기 위해서 만들어진 문법적 설탕이다.

클래스 기반 언어(자바)에서의 클래스에 대해서 살짝 알아보자면,

클래스를 통해 만들어진 인스턴스는 생성된 순간 클래스에 정의된 프로퍼티와 메서드가 복사된다. 이 후에는 인스턴스와 클래스는 독립적이다.

다시 말해서, 둘 다 부모 클래스의 기능을 갖다 쓰는건 동일하지만, **자바스크립트는 프로토타입 체인을 따라 올라가며 갖다 쓰고 , 자바는 생성될 때 그 기능을 복사해서 자체적으로 갖고 있다**는 뜻이다.

## 🤔 클래스의 구성 요소

클래스 몸체에서 정의할 수 있는 메서드는 총 3가지로 구성된다.

- **constructor(생성자)**
- **프로토타입 메서드**
- **정적 메서드**

이에 대해서 하나씩 살펴보자.

### 1. constructor(생성자)

constructor는 **인스턴스를 생성하고 초기화하기 위한 메서드**이다.

constructor는 생략할 수 있으며, 생략한 경우 다음과 같이 빈 constructor가 암묵적으로 정의 된다.

```jsx
// 아래와 같이 생략한 경우, 빈 constructor가 암묵적으로 정의됨
class Potenup {
  // constructor() {}
}
```

이렇게 암묵적으로 정의되지 않는다면, 클래스의 근본적인 사용 이유인 인스턴스 생성에 문제가 생긴다. `new Potenup()` 코드를 통해 인스턴스를 만든다고 가정했을 때, 자동적으로 `Potenup` 클래스 내의 생성자 함수를 찾아 실행하기 때문이다.

또한 constructor 함수 내부에서는 생성된 인스턴스와 연결된 `this`를 암묵적으로 반환한다. 따라서 constructor 내에서 따로 return문을 작성하는 것은 지양해야 한다.

```jsx
class Potenup {
  constructor() {
    // return this;
  }
}
```

### 2. 프로토타입 메서드

클래스 몸체에 작성되는 메서드는 **자동적으로 프로토타입 메서드에 추가**된다.

```jsx
class Potenup {
	sayHi(){
		console.log("Hi Deep Diver!"};
	}
}

const seyun = new Potenup();
seyun.sayHi(); // Hi Deep Diver!
```

위의 예시에서 `sayHi()` 메서드는, 인스턴스(`seyun`) 내부에 선언된 것이 아닌, `Potenup.prototype` 내부에 위치한다.

따라서 먼저 `seyun`에 `sayHi`를 찾아보고 없으니 프로토타입 체인을 따라 올라가서 `Potenup.prototype` 내의 `sayHi`를 실행한다.

### 3. 정적 메서드(static)

정적 메서드란 **인스턴스를 생성하지 않아도 호출할 수 있는 메서드**이다. 정적 메서드를 생성하기 위해서는, 메서드 앞에 **`static` 키워드**를 붙인다.

```jsx
class Potenup {
  static sayHi() {
    console.log('Hi Deep Diver!');
  }
}

Potenup.sayHi(); // Hi Deep Diver!
```

따라서 정적 메서드는, `Potenup.prototype` 내부에 위치하는 것이 아닌, `Potenup` 클래스(생성자 함수)에 위치한다. (그렇기 때문에 인스턴스 생성 없이 호출이 가능한 것이다.)

프로토타입 메서드와 정적 메서드의 가장 큰 차이점은 **`this` 바인딩이 다르다**는 것이다. **프로토타입 메서드 내부의 this는 인스턴스**를 가리키며, **정적 메서드 내부의 this는 클래스**를 가리킨다. 따라서 **정적 메서드는 인스턴스의 프로퍼티에 접근할 수 없다**.

2번과 3번 모두 같은 예시 코드를 가지고 작성해보았는데, `sayHi` 메서드 내에서 인스턴스의 프로퍼티를 참조하지 않기 때문에, 3번이 더 적절하게 작성되었다고 볼 수 있다.

다시 말해, **인스턴스의 프로퍼티를 참조하지 않는다면 프로토타입 메서드로 작성할 필요가 없다**는 뜻이다.

2번의 예시 코드를 더 적절하게 바꿔보자면 다음과 같다.

```jsx
class Potenup {
	constructor(name){
		this.name = name;
	}
	// 여기서 sayHi() 메소드는 인스턴스 프로퍼티를 참조한다.
	sayHi(){
		console.log(`Hi Deep Diver!, My name is ${this.name}.`};
	}
}

const seyun = new Potenup("Seyun");
seyun.sayHi(); // Hi Deep Diver!, My name is Seyun.
```

### 추가: 클래스 필드

책의 내용에서는 클래스 필드 정의 제안이라는 내용으로 21년 기준으로 작성되어 있지만, 현재 기준으로는 클래스 몸체에 클래스 필드를 작성하는 것이 표준 사양으로 정의되어 있다.

따라서 **클래스 몸체에서 인스턴스의 프로퍼티를 작성**할 수 있다.

```jsx
class Potenup {
  // 클래스 필드
  name = 'Default';
}

const seyun = new Potenup();
console.log(seyun.name); // Default
```

위와 같이 클래스 필드를 작성하면, `new` 키워드를 통해 인스턴스를 생성할 때, constructor가 실행되기 전에 클래스 필드들이 `this` 객체에 프로퍼티로 추가된다.

클래스 필드를 사용하면 프라이빗 필드를 지원하는데, **프로퍼티 앞에 `#` 접두사를 붙이면 클래스 내부에서만 접근 가능한 `private` 필드**가 된다.

```jsx
class Potenup {
  // 클래스 내부에서만 접근 가능한 private 필드
  #name = 'Default';
}

const seyun = new Potenup();
console.log(seyun.name); // 접근 불가
```

## 🤔 클래스 확장(extends)과 super 키워드

클래스 확장(extends)이란 지금까지 말했던 프로토타입 체이닝과는 다른 개념인데, 예시를 통해 조금 더 자세히 알아보자.

```jsx
class Animal {
  // 2. 생성자 실행 전, 빈 객체(인스턴스) 생성, this 바인딩
  constructor(name, weight) {
    // 3. 생성자 실행하여 초기 값 할당 후 생성한 인스턴스 반환
    this.name = name;
    this.weight = weight;
  }
}

class Dog extends Animal {
  // 0. extends가 있으므로 다른 클래스를 상속받고 있음
  constructor(name, weight, type) {
    super(name, weight); // 1. 부모 클래스의 생성자 호출
    this.type = type; // 4. 부모 클래스에서 반환해준 인스턴스와 this 바인딩
  }
}

const bori = new Dog('Bori', 5, 'Maltipoo');
```

위의 예시에서 `new` 키워드를 통해 인스턴스를 생성할 때 어떤 순서로 실행되는지 확인해보자.

1. `Dog` 클래스가 다른 클래스를 상속받고 있으므로, 빈 객체(인스턴스)를 생성하지 않은 채로 `Dog` constructor 내부의 `super`를 초기값과 함께 호출한다. (super가 없으면 인스턴스가 생성되지 않아 오류가 발생한다.)
2. `Animal` 클래스의 contructor가 실행되기 전 빈 객체(인스턴스)가 생성되며, this가 바인딩된다. 이 때, **생성되는 인스턴스는 `Animal`이 아닌 `Dog` 가 생성한 것으로 처리한다. (근본적으로 인스턴스의 정체성은 Dog 이기 때문)**
3. `Animal` 클래스의 constructor가 실행되어 초기값을 할당하고, `Dog` 클래스로 생성한 인스턴스를 반환해준다.
4. `Dog` 클래스는 부모 클래스에서 반환해주는 인스턴스를 this와 바인딩하여 사용한다.

## 🧑🏻‍⚖️ 결론

1. 자바스크립트의 클래스는 **생성자 함수와 프로토타입의 문법적 설탕**임
2. 클래스 몸체에는 **생성자 함수, 프로토타입 메서드, 정적 메서드, 클래스 필드가 정의**될 수 있음
3. `extends`로 클래스를 확장하여 정의한 경우, **`super()`을 통해 부모 생성자를 호출**해야 함
