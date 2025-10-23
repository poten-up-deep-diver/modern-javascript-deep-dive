# 함수를 매게변수로 전달하면 벌어지는 일

## 이번 LXP1 프로젝트를 진행하면서

페이지네이션 기능을 개발했다.
이전과 다음 버튼을 누를 시, `pageNumber`의 숫자를 증감하거나 숫자 버튼을 클릭하면 해당 값을 재할당하는 이벤트 핸들러를 등록했다. 또한, 현재의 `pageNumber`를 기준으로 숫자 버튼을 렌더링을 진행하는 로직을 짰다. 이 작업들은 하나의 생성자 함수 `Pagination`에서 수행이 가능하다.

하지만, 강의 탐색 페이지에서는 페이지네이션 전역 변수만 존재하는 것이 아니다. 내가 선택한 정렬옵션값, 카테고리값, 태그값 등 상태 변경 상황을 알려줘야 한다.

## 콜백함수 실전 사례

```js
// 부모 코드 (index.js 역할)
const updateView = () => {
  console.log("리스트 재정렬 + 페이지네이션 갱신");
};

const sortSelect = new SortSelect({
  onSortChange: (newSortOption) => {
    console.log("정렬 상태 업데이트:", newSortOption);
    updateView();
  },
});

sortSelect.init(); // DOM 붙이고 이벤트 연결
```

```js
// 컴포넌트 코드 (SortSelect 역할)
function SortSelect({ onSortChange }) {
  this.sortOption = "최신순";

  this.init = () => {
    bindEvents();
  };

  const bindEvents = () => {
    document
      .querySelector("#sort-select")
      .addEventListener("change", (event) => {
        this.sortOption = event.target.value;
        onSortChange(this.sortOption);
      });
  };
}
```

강의 탐색 목록을 구현하면서, `index.js`에서 `sortSelect` `categorySelect` `pagination` 각 컴포넌트가 내부에서 사용자 이벤트(페이지 이동, 정렬 변경, 필터 변경, 검색 입력)을 감지했을 때 호출하도록 저장해둔다.

페이지 상태를 외부 `index.js`에서 관리하기 위해, 컴포넌트가 바깥으로 신호를 보낼 때 어떤 일을 해야 하는지 미리 정의하는 것! 이런 구조를 흔히 콜백 패턴이라고 한다. 엄마가 아들한테 "너 누가 때리면, 이렇게 해" 라고 특정 상황에 대한 행동을 미리 알려주는 것이다.

## 🤔 자식이 부모의 전역 변수를 어떻게 바꾸는건가?

값을 전달하는게 아니라 함수 그 자체를 주는 것.

```js
// 부모
let sortOption = "최신순";

const sortSelect = new SortSelect({
  onSortChange: (nextValue) => {
    sortOption = nextValue; // 부모 상태 갱신
    console.log("새 정렬 옵션:", sortOption);
  },
});

sortSelect.triggerChange("인기순"); // 자식이 이벤트 발생을 흉내냄
```

```js
// 자식
function SortSelect({ onSortChange }) {
  this.triggerChange = (value) => {
    if (typeof onSortChange === "function") {
      onSortChange(value); // 부모가 준 콜백 실행
    }
  };
}
```

## 🤔🤔🤔 클로저는 뭘까?

“함수를 전달했다”는 건 일회성 값을 주는 게 아니라, 나중에 호출할 수 있는 작업 지침을 자식에게 맡겼다는 뜻이다. 마치, 수학여행 비용에 대한 입금 지침을 가정통신문을 학교에서 배부하면 바로 돈을 보내는게 아니듯이 말이다.

`sortOption`, `pageNumber` 같은 변수들을 닫아두고 있는(closure) 상태이며, SortSelect 내부에서 어떤 이벤트가 발생해 onSortChange(...)를 불러주면, 그 순간 부모 스코프에 있는 변수들을 그대로 수정할 수 있는 것이다. 단순히 자식 요소에게 변수를 내려주고 있는 것이다!

다음은 클로저에 대한 내용을 배워보도록 하겠다.
