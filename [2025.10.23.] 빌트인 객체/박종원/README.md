## 자바스크립트 객체란 무엇일까?

자바스크립트에서 객체는 **원시값을 제외한 모든 것이 객체**입니다.

원시값은 **단일 데이터 조각**인 반면, 원시값을 제외한 나머지 모든 것들은 **속성과 메서드를 가질 수 있는 객체**이기 때문입니다.

### 표준 빌트인 객체 (Standard Built-in Objects)

표준 빌트인 객체는 **ECMAScript 사양에 정의**된 객체로 말 그대로 '표준'이 되는 빌트인 객체라는 뜻 입니다.

표준이라는 말 그대로 가장 기본적으로 지원되는 객체의 집합체로 어떤 실행 환경에 제한 없이 지원을 보장합니다.

즉, 자바스크립트에서 가장 기초되는 객체의 집합체를 '표준 빌트인 객체'라고 합니다.

#### 원시값과 래퍼 객체 (Wrapper Objects)

원시값은 객체가 아니고 **값 자체**이기 때문에 속성이나 프로토타입을 가질 수 없습니다.

그래서 원시값도 객체 같이 다루기 위해 만들어진 객체가 '래퍼 객체' 입니다.

그래서 원시값을 객체같이 다루기 위해 `String`, `Number`, `Boolean` 등 원시 타입과 같은 이름으로 되어있습니다.

자바스크립트 엔진이 원시값을 발견하고, 원시값에서 `.toString()` 같은 **객체 내장 메서드를 호출할 때 마다 임시 객체의 생성과 파괴를 반복**합니다.

```js
let num = 10;
let numObj = new Number(10);

console.log("value :", typeof num); // value : number
console.log("object value :", typeof numObj); // object value : object
console.log(typeof num === typeof numObj); // false

console.log(num.toString()); // new Object(num) 생성
console.log(typeof num); // number
```

숫자 원시값에 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 Number 생성자 **함수의 인스턴스가 생성**되고, 숫자는 Number 래퍼 객체의 \[\[NumberData\]\] 내부 슬롯에 할당하게 되고, 래퍼 객체에 임시로 할당받게 되어 Number.prototype 메서드를 상속받아 사용할 수 있게 됩니다.

그 후 래퍼 객체의 처리가 종료되면 래퍼 객체의 \[\[NumberData\]\] 내부 슬롯에 할당된 값은 다시 원시값으로 돌려놓고, 래퍼 객체는 가비지 컬렉션 대상이 되어 제거됩니다.

이외 나머지 원시값도 똑같은 원리로 동작하게 됩니다.

정리하면 **래퍼 객체는 원시값을 객체같이 사용할 수 있게 해주는 역할**을 합니다.

---

### 전역 객체

전역 객체는 코드가 실행되기 이전 단계에서 **자바스크립트 엔진에 의해 제일 먼저 생성**되고 **어떠한 객체에도 속하지 않는 특수한 최상위 객체**입니다.

전역 객체는 환경에 따라서 지칭이 달라집니다.
**브라우저 환경에서는 window**로 지칭되고, **NodeJS에서는 global로 지칭**됩니다.

```
💡 ECMAScript2020(ES11)에서 `globalThis`로 통일되어 ECMAScript 표준을 준수하는 모든 환경에서 사용할 수 있게 되었습니다.
```

전역 객체는 모든 표준 빌트인 객체를 프로퍼티로 가지고 있습니다.

표준 빌트인 객체와는 다르게 실행 환경에 따라 고유한 API를 호스트 객체로 제공합니다.

```
💡 호스트 객체는 ECMAScript 사양에 정의되지 않은 비표준 객체입니다.
따라서 브라우저나 런타임 환경에서 표준 객체 외 객체를 추가적으로 제공합니다.
```

#### 빌트인 전역 프로퍼티

#### Infinity

```js
const infinity = 3 / 0;
const min_infinity = -3 / 0;

console.log("Infinity:", infinity);
console.log("Minus Infinity:", min_infinity);

console.log(typeof Infinity === "number"); // true
```

Infinity 프로퍼티는 무한대를 나타내는 숫자값 Infinity를 갖습니다.
숫자값을 갖다보니 Infinity의 타입은 number입니다.

#### NaN

```js
console.log(globalThis.NaN); // NaN
console.log(typeof NaN); // number

console.log(0 / 0); // NaN

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(10)); // false

console.log(isNaN(NaN)); // true
console.log(isNaN("Hello")); // true
console.log(Number.isNaN("Hello")); // false
```

NaN 프로퍼티는 숫자형인데, 그 값이 유효하지 않은 값을 말합니다.
숫자가 아님을 나타내는 숫자값 NaN을 갖습니다.

하지만 NaN은 이상한 특징을 가지고 있습니다.

첫 번째로 **자기 자신과 비교 연산자를 하더라도 false**가 나옵니다.
이유는 '결과를 정의할 수 없는 수'이므로, 그 어떠한 다른 NaN이 와도 같을 수 없기 때문입니다.
즉, **정의되지 않은 값들끼리 같다고 판단할 수 없기 때문**입니다.

그래서 비교 대신 전용 판별 함수 `isNaN`을 사용해야 합니다.

하지만 isNaN 함수에도 함정이 숨어있습니다.

Infinity 프로퍼티와 NaN의 비교값은 false 입니다.
이유는 Infinity는 **수학적으로 너무 큰 수**이기 때문에 수학적으로 말이 안되는 값은 아니기 때문에 isNaN의 값은 false 입니다.

그리고 `isNaN`과 `Number.isNaN` 이 있는데, 두 함수의 차이는 '형 변환'을 하냐 안하냐의 차이입니다.

`isNaN()`은 형 변환을 한번 하고 NaN인지 확인하기 때문에 느슨한 판별을 합니다.
작동 방식은 다음과 같게 됩니다.

1. 먼저 인자를 Number()로 강제 형변환
2. 변환된 값이 NaN이면 true, 아니면 false

`Number.isNaN()`은 값이 이미 number 타입인 상태에서 NaN인지만 검사하기 때문에 숫자가 아니면 무조건 false를 반환합니다.
즉, 값 자체가 NaN일 때만 true를 반환합니다.
그래서 **Number.isNaN() 은 엄격한 판별**을 합니다.

### 빌트인 전역 함수

빌트인 전역 함수는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드입니다.

#### parseFloat

전달받은 문자열 인수를 **부동 소수점 숫자**로 해석하여 반환합니다.

```js
console.log(parseFloat("3.14abc")); // 3.14
console.log(parseFloat(" -0.123xyz")); // -0.123
console.log(parseFloat("42 is the answer")); // 42
console.log(parseFloat("abc123")); // NaN
console.log(parseFloat("4ab2.5")); // 4
```

#### parseInt

전달받은 문자열 인수를 **정수**로 해석하여 반환합니다.

```js
console.log(parseInt("3.14abc")); // 3
console.log(parseInt(" -0.123xyz")); // -0
console.log(parseInt("42 is the answer")); // 42
console.log(parseInt("abc123")); // NaN
console.log(parseInt("4ab2.5")); // 4

console.log(parseInt("0xF")); // 15
console.log(parseInt("F", 16)); // 15
console.log(parseInt("111", 2)); // 7
console.log(parseInt("77", 8)); // 63
console.log(parseInt("Z", 36)); // 35
```

parseInt의 경우 **기본적으로 10진수로 반환**하지만, 두 번째 인수로 진법을 나타내는 기수(2~36)를 전달할 수 있어 첫 번째 인수로 전달된 문자열을 해당 기수의 숫자로 해석하여 반환할 수 있습니다.

```
💡 숫자와 문자열이 같이 있는데 NaN이 나오지 않고, 숫자가 나오는 경우는 왜 그럴까?

이것은 옛날 HTML 폼 입력 처리의 잔재입니다.
브라우저가 "123px" 같은 걸 숫자로 바꿔야 할 때 편하게 숫자만 받기 위해 만든 함수라서, 우선 앞부분에 숫자가 있으면 숫자, 없으면 NaN으로 나옵니다.
```

#### encodeURI / decodeURI

완전한 URI(Uniform Resource Indentifier)를 문자열로 전달받아 이스케이프 처리를 위해 인코딩 / 디코딩합니다.
여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미합니다.
이스케이프 처리는 네트워크를 통해 정보를 공유할 때어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것입니다.

```js
const uri = "https://example.com/path/to page?name=John Doe&age=25#section 1";
const encodedURI = encodeURI(uri);
const decodedURI = decodeURI(encodedURI);

console.log("Encoded URI:", encodedURI); // Encoded URI: https://example.com/path/to%20page?name=John%20Doe&age=25#section%201
console.log("Decoded URI:", decodedURI); // Decoded URI: https://example.com/path/to page?name=John Doe&age=25#section 1
```

encodeURI는 문자열을 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하여 반환합니다.
decodeURI는 utf-8로 인코딩된 문자열을 다시 이스케이프 처리 이전(utf-16)으로 변환하여 반환합니다.

#### encodeURIComponent / decodeURIComponent

URI 구성 요소(URI에서 URL을 제외한 문자열)를 인수로 전달받아 인코딩 / 디코딩합니다.

```js
const component = "name=John Doe&age=25";
const encodedComponent = encodeURIComponent(component);
const decodedComponent = decodeURIComponent(encodedComponent);

console.log("Encoded Component:", encodedComponent); // Encoded Component: name%3DJohn%20Doe%26age%3D25
console.log("Decoded Component:", decodedComponent); // Decoded Component: name=John Doe&age=25
```

```
💡 URI, URL, URN이 뭘까?

URI : https://example.com:80/path/to page?name=John Doe&age=25#section 1
URL : http://example.com/
URN : example.com/path/to page?name=John Doe&age=25#section 1

Scheme(protocol) : https://
Host(Domain) : example.com
Port : :80
Path : /path/to page
Query(Query String) : ?name=John Doe&age=25
Fragment : #section 1
```
