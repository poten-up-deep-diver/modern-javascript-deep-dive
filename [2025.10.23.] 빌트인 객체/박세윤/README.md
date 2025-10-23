# [JS] 브라우저의 전역 객체, window

## 🤚🏻 들어가기 전…

지금까지는, `parseInt` 등의 함수가 `Number.parseInt` 의 앞 부분을 생략해서 사용한다고만 생각했지, 전역 객체의 프로퍼티이기 때문에 생략해서 사용할 수 있다는 점을 알지 못했었다.

「모던 자바스크립트 Deep Dive」21장~22장을 읽고 이러한 부분에 대해서 알게 되었고, 나도 모르는 새에 window 전역 객체를 어떻게 사용하고 있었는지 조금 더 파고들고 싶어졌다.

그래서, window 객체를 직접 뜯어보면서 무엇을 자주 사용해왔는지 공부해보고자 한다.

## 🤔 window의 프로퍼티

기본적으로 `window`는 `Object`, `String` `Number`, `Boolean`, `Function`, `Array`, `RegExp`, `Date`, `Math`, `Promise` 같은 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.

이게 무슨 소리냐면, 우리가 자연스럽게 사용하던 생성자 함수들을 import하지 않고 바로 사용할 수 있었던 이유가 바로 window의 프로퍼티이기 때문이다.

아래 예시를 통해 확인해보자.

```jsx
// Array가 어디있길래 바로 사용할 수 있는걸까?
const a = new Array(1, 2, 3, 4);

// 바로 window의 프로퍼티이기 때문에 아래의 코드를 생략해서 사용한 것!
const a = new window.Array(1, 2, 3,로
```

마찬가지로, 생성자 함수의 정적 메소드를 바로 사용할 수 있는 이유도 동일하다.

```jsx
// Object가 어디 있길래 바로 사용할 수 있는걸까?
const obj = { name: "seyun", age: 25 };
console.log(Object.keys(obj)); // [ name, age ]
```

위와 같이, 정의한 적도 없는데 우리가 아무렇지도 않게 사용해왔던 것들이 전역 객체의 프로퍼티였던 것이다.

## 🤔 parseInt가 왜 window 안에…?

`parseInt` 함수가 `window`의 프로퍼티(메소드)이기 때문에 생략해서 바로 쓴다는 것은 위에 언급했었다.

하지만 도대체 왜 `window`가 `parseInt` 함수를 가지는 것일까? 이에 대해 파고들어보자.

처음에는 위에서 언급했듯이, “표준 빌트인 객체들을 모두 프로퍼티로 갖고 있기 때문에 가능하다”라고 생각했는데, 이는 잘못된 생각이었다.

현재 `parseInt` 함수는 Number의 정적 메소드인 것은 맞다.

하지만, `parseInt` 함수는 원래 전역 함수였다.

다시 말해서 `parseInt`는 원래 전역함수였으며, ES6 이후 코드를 더 체계적으로 관리하기 위해서 `Number` 객체 안으로 소속을 옮겨 `Number.parseInt`라는 정적 메서드를 만든 것이다.

하지만, 기존에 있었던 전역 함수를 없애버리면 기존에 작성된 코드는 모두 작동하지 않게 되므로 이를 막기 위해 남아 있는 것이다.

위와 동일하게 호환성의 이유로 전역 함수로 남아있는 함수는 다음과 같다.

```jsx
parseInt(string, radix); // 문자열을 정수로 변환 / Number.parseInt()와 동일한 기능
parseFloat(string); // 문자열을 부동소수점 숫자로 변환 / Number.parseFloat()와 동일한 기능
isNaN(value); // 값이 NaN이면 true, 아니라면 false 반환 / Number.isNaN()과 유사
isFinite(value); // 값이 유한한 숫자면 true, 아니라면 false 반환 / Number.isFinite()과 유사

// 유사한 경우, 기능적으로 같으나 강제 타입 변환이라는 차이가 있음.
```

## 🤔 global과 globalThis?

앞에서 말했던 `window` 객체는, 브라우저의 전역 객체로 사용된다.

하지만, Node.js 환경에서는 `window`를 사용할 수 없다. 따라서 `window`와 유사하게 `global`이라는 전역 객체를 사용하고 있다.

### window vs global

**표준 빌트인 객체를 포함**한다는 점에서 유사하지만, 가지고 있는 주요 프로퍼티가 조금씩 다르다.

`window`의 주요 프로퍼티에는 DOM을 제어하기위한 **`document` 프로퍼티**나, 현재 URL 정보를 담는 **`location` 프로퍼티** 등이 있다.

`global`의 주요 프로퍼티는 현재 실행 중인 프로세스 정보를 담는 **`process` 프로퍼티** 등이 있다.

### globalThis

이렇게 환경마다 전역 객체의 이름이 다르기 때문에 코드를 작성할 때 번거로움이 있었다.

따라서 하나의 이름으로 통일한 것이 **`globalThis`**이다.

개발자는 환경을 신경 쓸 필요 없이 `globalThis`를 사용하면 알아서 각 환경에 맞는 전역 객체를 가리킨다.

## 🤔 전역 함수의 종류?

전역 함수는 생각보다 그렇게 많지 않다. 위에서 언급한 함수를 포함해서, 한 번 정리해보자.

```jsx
// 자주 사용할 것 같은 것 * 표시!
// 숫자 변환/검사
* parseInt(string[, radix]); // 문자열 정수로 변환, 두 번째 인수로 진수 지정
* parseFloat(string); // 문자열 부동소수점 숫자(실수)로 변환
* isNaN(value); // 주어진 값이 NaN인지 확인
isFinite(value); // 주어진 값이 유한한 숫자인지 확인

// URL 인코딩/디코딩
encodeURI(uri); // 전체 URI 인코딩 / 특수문자 변환 x
decodeURI(encodedURI); // 전체 URI 디코딩 / 특수문자 변환 x
encodeURIComponent(uriComponent); // URI 구성 요소 인코딩 / 특수문자 변환 o
decodeURIComponent(encodedURIComponent); // URI 구성 요소 디코딩 / 특수문자 변환 o

// 스크립트 실행
eval(string); // 문자열로 된 자바스크립트 코드 실행 / 사용 비권장

// 타이밍 함수
* setTimeout(callback, delay); // 지정된 시간 후에 콜백 함수 한 번 실행
* setInterval(callback, delay); // 지정된 시간 마다 콜백 함수 반복 실행
* clearTimeout(timeoutID); // setTimeout 취소
* clearInterval(intervalID); // setInterval 취소

* alert(message); // 경고창 띄우기
* confirm(message); // 확인/취소 창 띄우고, 확인 시 true, 취소 시 false 반환
prompt(message[, defaultValue]); // 사용자에게 텍스트를 입력받는 창 띄우기
```

## 🤔 window의 주요 프로퍼티

전역 함수(메소드) 말고도, 자주 사용하는 window의 프로퍼티도 정리해보자.

```jsx
// 문서 및 DOM 제어
document; // 현재 웹 페이지의 HTML 문서 자체를 가리킴
console; // 개발자 도구의 콘솔에 로그나 에러를 출력하는 객체

// 브라우저 창 및 화면 정보
location; // 현재 페이지의 URL 정보
navigator; // 사용자의 브라우저 정보와 운영체제 정보
innerHeight; // 브라우저 창의 뷰포트 높이
innerWidth; // 브라우저 창의 뷰포트 너비

// 데이터 저장
localStorage;
sesseionStorage;

// 이벤트
addEventListener; // window 객체에 이벤트 리스너 추가 시 사용(resize, scroll, load 등)
```

## 🧑🏻‍⚖️ 결론

1. 자바스크립트의 기본 함수/객체는 `window`에 속해 있어, `window.` 없이 바로 쓸 수 있다.
2. `parseInt` 같은 함수는 원래부터 있던 전역 함수이며, 하위 호환성을 위해 남아있다.
3. `globalThis`를 사용하면 브라우저, Node.js 등 어떤 환경에서든 전역 객체를 같은 이름으로 사용할 수 있다.
