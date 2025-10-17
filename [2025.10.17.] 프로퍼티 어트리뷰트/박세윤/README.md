# [JS] 객체 변경 방지 메소드와 불변 객체

## 들어가기 전…

`const`를 사용해서 데이터를 선언하는 경우, 원시 타입의 값은 바꿀 수 없었지만, 객체 타입의 값은 객체 자체를 바꾸진 못하지만, 내부적인 프로퍼티를 변경할 수 있었다.

그리고,「모던 자바스크립트 Deep Dive」16장의 객체 변경 방지 부분을 읽으면서, 객체 타입의 값을 완전히 불변하게 만들 수 있겠구나! 라는 생각이 들었다. (그리고 완전 불변 객체를 보면서, 얕은 복사, 깊은 복사가 떠올랐다)

그래서, 객체의 변경을 방지하는 메소드를 정리하고, 불변 객체를 만드는 방법, 그리고 불변 객체를 사용했을 경우의 장점을 정리해보고자 한다.

## 객체 변경 방지 메소드?

객체의 변경을 방지하는 메소드는 총 3가지가 있으며, 각각 객체의 변경을 금지하는 강도가 다르다.

| 구분           | 메서드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리부트 재정의 |
| -------------- | ------------------------ | ------------- | ------------- | ---------------- | ---------------- | -------------------------- |
| 객체 확장 금지 | Object.preventExtentions | X             | O             | O                | O                | O                          |
| 객체 밀봉      | Object.seal              | X             | X             | O                | O                | X                          |
| 객체 동결      | Object.freeze            | X             | X             | O                | X                | X                          |

### 1. 객체 확장 금지 `Object.preventExtentions`

`Object.preventExtentions`를 사용하면, 객체의 프로퍼티를 추가할 수 없다.

삭제, 읽기,수정(쓰기)는 가능하다.

예시는 다음과 같다.

```jsx
const dog = { name: "bori" };
Object.preventExtentions(dog);
dog.weight = 5; // 추가 불가! 무시됨
dog.name = "boricha"; // 수정 가능!
console.log(dog); // { name: "boricha" } 읽기 가능!
```

### 2. 객체 밀봉 `Object.seal`

`Object.seal` 을 사용하면, 객체의 프로퍼티를 추가하거나 삭제할 수 없으며, 어트리뷰트를 재정의할 수 없게된다.

수정(쓰기), 읽기는 가능하다.

예시는 다음과 같다.

```jsx
const dog = { name: "bori" };
Object.seal(dog);
dog.weight = 5; // 추가 불가! 무시됨
dog.name = "boricha"; // 수정 가능!
delete dog.name; // 삭제 불가! 무시됨
console.log(dog); // { name: "boricha" } 읽기 가능!
```

### 3. 객체 동결 `Object.freeze`

`Object.freeze`를 사용하면, 객체의 프로퍼티 읽기를 제외하고 모두 금지된다.

예시는 다음과 같다.

```jsx
const dog = { name: "bori" };
Object.freeze(dog);
dog.weight = 5; // 추가 불가! 무시됨
dog.name = "boricha"; // 수정 불가! 무시됨
delete dog.name; // 삭제 불가! 무시됨
console.log(dog); // { name: "bori" } 읽기 가능!
```

## 불변 객체를 만드는 방법

그렇다면 `Object.freeze`를 객체에 적용하기만 하면, 완전한 불변 객체를 만든 것일까?

그것은 아니다.

얕은 복사와 비슷하게, `Object.freeze`는 가장 바깥쪽의 프로퍼티에만 동결이 적용되어서, 중첩객체의 경우 안쪽의 객체 프로퍼티에는 적용되지 않는 문제가 있다.

다음의 예시를 통해 확인해보자.

```jsx
const dog = {
	name: "bori,
	like: {
		food: "소고기";
	}
};

Object.freeze(dog);
dog.like.food = "닭고기"; // 수정 가능!
console.log(dog.like.food); // 닭고기 출력
```

다음과 같이, 중첩된 객체의 프로퍼티는 수정이 가능한 것을 확인할 수 있다.

그렇게 때문에 완전한 불변 객체를 만들기 위해서는, 모든 프로퍼티를 순회하면서 재귀적으로 동결해주어야 한다.

```jsx
function deepFreeze(target){
	// target이 존재하면서, 객체 값이면서, 동결되지 않았을 때, 동결
	if(target && typeof target === 'object' && !Object.isFrozen(target)){
		Object.freeze(target);
		// target 객체의 프로퍼티를 target으로 순회하며, 재귀적으로 동결
		Object.keys(target).forEach((key) => deepFreeze(target[key]));
	}
	return target;
}

const dog = {
	name: "bori,
	like: {
		food: "소고기";
	}
};

deepFreeze(dog);
dog.like.food = "닭고기"; // 수정 불가! 무시됨
console.log(dog.like.food); // 소고기 출력
```

## 불변 객체 사용 이유

이렇게 불변 객체를 만드는 방법을 알아보았는데, 불변 객체를 사용하면 무슨 장점이 있길래 사용하는 것일까?

### 예측 가능성 증가 및 버그 감소

데이터가 변하지 않는다는 것이 보장되면,

코드의 흐름을 추적하기가 매우 쉬워지고,

의도치 않은 부수 효과로 인한 버그를 원천적으로 차단할 수 있다.

### 성능 최적화 용이

React, Vue 같은 현대 UI 프레임워크에서 성능을 최적화하는데 유리하다.

이러한 프레임워크에서는, 상태가 변경이 되면 화면을 다시 그릴지 결정해야하는데,

객체가 불변하다면, “데이터가 변경이 되었다 = 새로운 객체가 만들어졌다” 이므로, 객체의 참조값만 비교하면 되기 때문에 빠르다.

이와 반대로 객체가 불변하지 않다면, 데이터가 변경이 되었다고 해서 객체가 새로 만들어 졌는지 아니면 기존의 객체의 프로퍼티만 변경된 것인지 알 수 없기 때문에 재귀적으로 모든 값들을 탐색하며 변경된 값을 찾아야한다.

## 결론

1. 객체의 변경을 방지하는 메소드로 `Object.preventExtentions()`, `Object.seal()`, `Object.freeze()`가 존재한다.
2. `Object.freeze()`는 중첩 객체까지 동결하지 못하므로, 완전한 불변 객체를 만들려면 모든 프로퍼티를 재귀적으로 동결시켜야 한다.
3. 불변 객체를 사용하면 코드의 예측 가능성을 높일 수 있고, 성능 최적화에 유리하기 때문에 사용한다.
