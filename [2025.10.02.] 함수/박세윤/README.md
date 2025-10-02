# [JS] 즉시 실행 함수 어디에 사용할까?

## 🤚🏻 들어가기 전..

사실 즉시 실행 함수에 대한 개념을 안지는 얼마 되지 않았다. 그만큼 사용할 경우가 거의 없었다는 뜻이다.

그렇기 때문에, 즉시 실행 함수를 왜 사용하는지, 어디에 활용할 수 있을지 정리해보고자 한다.

## 🤔 즉시 실행 함수(IIFE)란?

즉시 실행 함수(Immediately Invoked Function Expression)란, **함수 정의와 동시에 즉시 호출되는 함수**를 말한다.

## 🤔 즉시 실행 함수의 특징

1. 단 한 번만 호출되며, 다시 호출할 수 없다.
2. 일반적으로 익명 함수를 사용한다.
3. 반드시 그룹 연산자 ( … ) 로 감싸야 한다.

## 🤔 ES6 이전 즉시 실행 함수의 사용

즉시 실행 함수의 가장 큰 의의로는 전역 스코프의 오염을 방지할 수 있다는 것이다. 이게 무슨 소리인지 예시를 통해 알아보자.

```html
<div>
  <button id="btn">클릭</button>
</div>
<script>
  var a = 10;
  function printA() {
    console.log(a);
  }
  // 클릭 결과 100 출력
  document.querySelector("#btn").addEventListener("click", printA);
</script>
<script>
  var a = 100;
  function increaseA() {
    a++;
  }
</script>
```

위에서부터 아래의 순서로 순차적으로 실행했다고 가정하자. 위의 예시는, `a` 변수가 전역 스코프로 중복되어 사용되었다. 예시와 같이, 여러 스크립트 파일을 사용할 경우에는 변수명이 중복되는 경우가 흔하다.

스크립트 실행 이후에 버튼이 클릭되어 `printA()`가 실행되면, `10`이 출력되어야 할 결과가 오염되어 `100`이 출력되는 것을 확인할 수 있다.

이렇게 동일한 이름의 변수는 전역변수이기 때문에, 의도치 않게 덮어쓰게 되는 것을 **전역 스코프의 오염**이라고 부른다.

이러한 문제를 즉시실행 함수를 도입하면 방지할 수 있다.

```html
<div>
  <button id="btn">클릭</button>
</div>
<script>
  (function () {
    var a = 10;
    function printA() {
      console.log(a);
    }
    // 클릭 결과 10 출력
    document.querySelector("#btn").addEventListener("click", printA);
  })();
</script>
<script>
  (function () {
    var a = 100;
    function increaseA() {
      a++;
    }
  })();
</script>
```

위와 같이 즉시 실행 함수로 감싸게 되면, 외부에서 접근할 수 없는 자체적인 스코프를 가지게 되어, 동일한 변수 이름 `a`를 사용한다고 해도, 서로 다른 변수로 취급된다.

하지만 ES6 이후, `let`, `const`, `import`, `export` 의 등장으로 위와 같이 스코프 문제로 즉시 실행 함수를 사용하는 경우는 거의 존재하지 않는다.

## 🤔 ES6 이후 즉시 실행 함수의 사용

그렇다면 지금의 상황, ES6 이후에는 어떤 경우에 즉시 실행 함수를 사용할 수 있을까?

### 1. async/await를 최상위 레벨에서 사용할 때

※ async/await는 자바스크립트에서 비동기 코드(순서x)를 동기 코드(순서o)처럼 작성할 수 있게 하는 문법임

`await` 키워드는 `async` 함수 안에서만 사용할 수 있기 때문에, 최상위 레벨에서는 바로 `await`를 사용할 수 없다. 따라서 `async` IIFE로 전체 코드를 감싸면 `await`를 사용할 수 있게 된다.

```jsx
// 바로 await 키워드 사용 불가
// const response = await fetch('https://api.example.com/data');

// async IIFE를 사용해 즉시 비동기 작업 실행
(async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("데이터를 가져오는 데 실패했습니다.", error);
  }
})();
```

※ ES2022에 **Top Level Await** 기능이 추가되어 모듈의 최상위 스코프에서도 `await`를 사용할 수 있다고 한다. 따라서 해당 케이스로 사용하는 경우도 점점 사라질 것 같다.

### 2. 초기화 로직을 실행하고, 그 결과를 변수에 담을 때

※ **캡슐화**는 **서로 관련된 속성과 메서드를 하나로 묶고, 내부 데이터는 은닉**하는 것을 의미한다.

복잡한 계산이나 여러 단계를 거쳐 설정 값을 만들어야 할 때, IIFE를 사용하면 초기화 과정은 캡슐화하고, 최종 결과만 변수에 담을 수 있다.

```jsx
// IIFE를 사용하지 않았을 때
let settings; // 최종 결과를 담을 변수
const os = navigator.platform; // 임시 변수 1
const browser = getBrowserName(); // 임시 변수 2

if (os.startsWith("Mac")) {
  settings = { theme: "aqua", hotkey: "Cmd+S" };
} else if (os.startsWith("Win")) {
  settings = { theme: "aero", hotkey: "Ctrl+S" };
} else {
  settings = { theme: "default", hotkey: "Ctrl+S" };
}

// IIFE를 사용했을 때
const settings = (() => {
  const os = navigator.platform;
  const browser = getBrowserName();

  if (os.startsWith("Mac")) {
    return { theme: "aqua", hotkey: "Cmd+S" };
  }
  if (os.startsWith("Win")) {
    return { theme: "aero", hotkey: "Ctrl+S" };
  }
  return { theme: "default", hotkey: "Ctrl+S" };
})();
```

위의 예시처럼

IIFE를 사용하지 않는다면, `os`, `browser` 등의 임시 변수들이 스코프에 그대로 남아 있지만

IIFE를 사용하면, 실행 즉시 `os`, `browser` 변수는 메모리에서 사라지게 된다. 추가적으로 `const`와 함께 사용해서, 불변성을 확보하여 신뢰성을 올릴 수 있다.

## 🧑🏻‍⚖️ 결론

과거에는 **전역 스코프 분리**를 주된 목적으로 IIFE를 사용하였지만, 최신의 자바스크립트에서는 **캡슐화**를 주된 목적으로 사용한다.
