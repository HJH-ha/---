const gameboard = document.querySelector("#gameboard");
const info = document.querySelector("#info");
const startCells = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

//처음순서
let go = "circle";
info.textContent = "Circle 먼저 시작!";

function createBoard() {
  startCells.forEach((_cell, index) => {
    //각각의 셀(9)에 div(구역)태그 만들어서 클래스 square 추가, id 추가, 클릭 이벤트 추가해서
    // 게임보드에 자식으로 붙임(append)
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameboard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
  console.log(e.target);
  // 선택한 셀에 div태그 클래스 circle또는 cross를  붙임
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";

  info.textContent = go + " 턴 입니다.";
  e.target.removeEventListener("click", addGo); // 클릭이벤트제거

  //승리체크
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  //이길수 있는 3개의 연속좌표(가로,세로,대각선)
  const winningCombos = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  winningCombos.forEach((array) => {
    // every 는 array에 있는 모든게 참일때 참
    const circleWins = array.every((cell) =>
      //자바스크립트 문법 : null일떄 ?가있으면 종료
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.textContent = "Circle 승리!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
    const crossWins = array.every((cell) =>
      //자바스크립트 문법 : null일떄 ?가있으면 종료
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      info.textContent = "Cross 승리!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}
