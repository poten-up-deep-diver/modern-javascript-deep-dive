function add(x, y) {
  return x + y;
}

// 함수도 객체처럼 프로퍼티를 가질 수 있음
add.description = "두 수를 더하는 함수입니다.";
add.author = "성훈";

console.log(typeof add); // "function"
console.log(add.name); // "add" (프로퍼티)
console.log(add.description); // "두 수를 더하는 함수입니다." (추가 프로퍼티)
