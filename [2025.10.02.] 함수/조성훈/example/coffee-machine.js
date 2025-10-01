// 추출 방식별 기본 설정 (물 온도, 추출량) 정의
const stylePresets = {
  에스프레소: { waterTemp: 92, amount: "40ml" },
  룽고: { waterTemp: 90, amount: "110ml" },
  아이스아메리카노: { waterTemp: 85, amount: "120ml" },
};

// 캡슐 종류별 추가 설정 (산미, 로스팅 강도 등)
const capsuleDetails = {
  콜롬비아: { acidity: "강", roast: "중강" },
  인도네시아: { acidity: "약", roast: "강" },
  디카페인: { acidity: "중", roast: "중" },
};

function makeCoffee(capsuleType, extractStyle) {
  // 1. 추출 방식에 따른 기본 설정 확인
  const style = stylePresets[extractStyle];
  // 2. 캡슐 종류에 따른 추가 정보 확인
  const details = capsuleDetails[capsuleType];

  // 3. 유효성 검사 (매개변수 체크)
  if (!style || !details) {
    console.log(
      `❌ 입력 오류: 캡슐 (${capsuleType}) 또는 방식 (${extractStyle})을 인식할 수 없습니다.`
    );
    return "캡슐을 다시 넣어주세요.";
  }

  // 4. 로직 실행: 두 매개변수를 조합하여 동작 설정
  const { waterTemp, amount } = style; // 방식에 따른 온도/추출량
  const { acidity, roast } = details; // 캡슐에 따른 정보

  console.log(`✅ ${capsuleType} 캡슐로 ${extractStyle}를 추출합니다.`);
  console.log(`- 추출 방식 설정: 물 온도 ${waterTemp}°C, 추출량 ${amount}`);
  console.log(`- 캡슐 정보 반영: 산미 ${acidity}, 로스팅 ${roast}`);

  // 5. 추출 과정 실행
  console.log("... 최적의 설정으로 추출 중...");

  // 6. 결과 반환
  return `${capsuleType} + ${extractStyle} 조합 커피 완성! ☕`;
}

// ----------------------------------------------------
// 📌 함수 호출 (두 매개변수를 전달)
console.log(makeCoffee("콜롬비아", "에스프레소"));
console.log("---");
console.log(makeCoffee("디카페인", "룽고"));

// 📌 커피 머신에 'A/S 번호'라는 메모를 붙이는 행위
makeCoffee.noticeMemo = "캡슐 소진으로 추석 이후에 커피를 드실 수 있습니다.";
console.log(makeCoffee.noticeMemo);
