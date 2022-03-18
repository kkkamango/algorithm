/**
 * @param numbers 순서대로 누를 번호가 담긴 배열
 * @param hand 왼손잡이/오른손잡이 여부 (left/right)
 * @return answer 각 번호(numbers)를 누른 엄지손가락이 왼손/오른손(L/R) 문자열
 */
function solution(numbers, hand) {
    /*
엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 거리로 1에 해당합니다.
왼쪽 열의 3개의 숫자 1, 4, 7을 입력할 때는 왼손 엄지손가락을 사용합니다.
오른쪽 열의 3개의 숫자 3, 6, 9를 입력할 때는 오른손 엄지손가락을 사용합니다.
가운데 열의 4개의 숫자 2, 5, 8, 0을 입력할 때는 두 엄지손가락의 현재 키패드의 위치에서 더 가까운 엄지손가락을 사용합니다.
4-1. 만약 두 엄지손가락의 거리가 같다면, 오른손잡이는 오른손 엄지손가락, 왼손잡이는 왼손 엄지손가락을 사용합니다.

numbers 배열의 크기는 1 이상 1,000 이하입니다.
numbers 배열 원소의 값은 0 이상 9 이하인 정수입니다.

    */
    // 상하좌우 4가지 방향으로만 이동 -> 대각선 이동시 2칸 이동
    let answer = '';
    const HAND = hand.toUpperCase().substring(0, 1);
    let position = { // 현재 손 위치
    	left : [1, 4],
      right : [3, 4]
    };
    
    const leftHand = [1, 4, 7];
    const rightHand = [3, 6, 9];

    const padPosition ={
    	1 : [1,1],
      2 : [2,1],
      3 : [3,1],
      4 : [1,2],
      5 : [2,2],
      6 : [3,2],
      7 : [1,3],
      8 : [2,3],
      9 : [3,3],
      0 : [2,4]
    };
		//console.log(padPosition);
     
    numbers.forEach((number) => {
      
      let moveHand = '';
      //console.log(`number = ${number}`);
      // 움직일 손 위치 결정
      if (leftHand.includes(number)){
        moveHand = 'L';
      } else if (rightHand.includes(number)){
        moveHand = 'R';
      } else {
        moveHand = getHand(position, padPosition[number], HAND);
      }
      
      // 현재 손위치
      if (moveHand === 'L'){
	      position.left = padPosition[number];
      } else {
      	position.right = padPosition[number];
      }
      
      answer += moveHand;
    });
    
    console.log(`answer =${answer}`);
    return answer;
}

function getHand(position, padPosition, HAND){
	let result = '';
	let leftMove = 0;
  let rightMove = 0;

  /* 
     console.log(`before postion`);
     console.log(position); */
  //padPosition[number]// 움직여야할 위치
  position.left.forEach((left, i) =>{
    leftMove += Math.abs(left - padPosition[i])
  });
  position.right.forEach((right, i) =>{
    rightMove += Math.abs(right - padPosition[i])
  });

  if (leftMove < rightMove){
    // 왼손
    result= 'L';

  } else if(leftMove > rightMove) {
    // 오른손
    result= 'R';

  } else {
    result = HAND;
  }
  /* 
     console.log(`after postion`);
     console.log(position);
     console.log('================'); */
  return result;
}

solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5],	"right"); // LRLLLRLLRRL
solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2],	"left"); // LRLLRRLLLRR
solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0],	"right"); // LLRLLRLLRL
