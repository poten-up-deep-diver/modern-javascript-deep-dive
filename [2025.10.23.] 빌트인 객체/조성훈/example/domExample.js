// 1. DOM Node의 '청사진' 역할을 하는 가상 클래스
class DOMElement {
  // 내부적으로 HTML 속성 값을 저장하는 '사설' 변수 (데이터)
  #attributes = {
    id: "",
    class: "",
    content: "",
  };

  // ----------------------------------------------------
  // 2. 접근자 프로퍼티 (Accessor Property): 데이터/상태 관리
  // ----------------------------------------------------

  // 'className' 속성: HTML 'class' 속성과의 동기화를 위한 접근자
  get className() {
    console.log("-> [Getter 호출]: #attributes.class 값을 읽어옵니다.");
    return this.#attributes.class;
  }

  set className(newValue) {
    console.log(
      `-> [Setter 호출]: #attributes.class를 '${newValue}'로 업데이트합니다.`
    );
    // 실제로 브라우저는 여기서 화면을 갱신하는 렌더링 작업을 트리거합니다.
    this.#attributes.class = newValue;
  }

  // 'innerHTML' 속성: 요소 내부의 콘텐츠를 관리하는 접근자
  get innerHTML() {
    console.log("-> [Getter 호출]: 내부 HTML(텍스트) 콘텐츠를 읽어옵니다.");
    return this.#attributes.content;
  }

  set innerHTML(newContent) {
    console.log(
      `-> [Setter 호출]: 내부 콘텐츠를 '${newContent}'로 파싱하여 설정합니다.`
    );
    // 실제로 브라우저는 여기서 HTML 파싱 로직을 실행합니다.
    this.#attributes.content = newContent;
  }

  // ----------------------------------------------------
  // 3. 메서드 (Method): 구조/기능 관리
  // ----------------------------------------------------

  // 'remove' 메서드: DOM 트리에서 자신을 제거하는 기능
  remove() {
    console.log(
      "-> [메서드 호출]: 부모 노드에게 자신을 트리의 구조에서 제거하도록 요청합니다."
    );
    // 실제 DOM은 여기서 부모 노드의 자식 목록에서 자신을 제거합니다.
    return true;
  }

  // 'appendChild' 메서드: 자식 노드를 추가하는 기능
  appendChild(childNode) {
    console.log(
      `-> [메서드 호출]: 자식 노드 (${childNode.className})를 현재 요소의 구조에 추가합니다.`
    );
    // 실제 DOM은 여기서 트리의 구조를 업데이트합니다.
    // (이 예시에서는 간단히 로그만 출력)
  }

  // ----------------------------------------------------
  // 4. 생성자 (초기 구조 데이터 설정)
  // ----------------------------------------------------
  constructor(id, classNames, content) {
    this.#attributes.id = id;
    this.#attributes.class = classNames;
    this.#attributes.content = content;
    console.log(`✅ DOMElement 객체 생성 완료: ID=${id}`);
  }
}

// ----------------------------------------------------
// 가상 DOM 객체 활용 예시
// ----------------------------------------------------

// 1. 객체 생성 (HTML 파싱 과정)
const myDivElement = new DOMElement("myDiv", "box", "안녕하세요");

console.log("\n--- 1. 속성 (className) 값 읽기 (Getter 실행) ---");
const currentClass = myDivElement.className;
console.log(`현재 클래스: ${currentClass}`); // Getter 호출

console.log("\n--- 2. 속성 (className) 값 변경 (Setter 실행) ---");
myDivElement.className = "active-box"; // Setter 호출
console.log(`변경된 클래스: ${myDivElement.className}`); // Getter 호출

console.log("\n--- 3. 메서드 (remove) 실행 ---");
myDivElement.remove(); // 메서드 호출
