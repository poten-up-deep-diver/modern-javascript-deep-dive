function syncTask() {
  console.log("작업 시작");
  console.log("작업 1 완료");
  console.log("작업 2 완료");

  try {
    for (let i = 0; i < 1000000000; i++) {} // 우주 작업
  } catch {
  } finally {
    console.log("우주 작업 완료");
  }

  console.log("작업 n 완료");
  console.log("작업 종료");
}

function asyncTask() {
  console.log("작업 시작");
  console.log("작업 1 완료");
  console.log("작업 2 완료");

  setTimeout(() => {
    for (let i = 0; i < 1000000000; i++) {} // 우주 작업

    console.log("우주 작업 완료");
  }, 0);

  console.log("작업 n 완료");
  console.log("작업 종료");
}

// syncTask();
asyncTask();
