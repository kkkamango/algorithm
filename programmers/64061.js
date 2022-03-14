// https://programmers.co.kr/learn/courses/30/lessons/64061
/**
 * @parma board 게임 화면의 격자의 상태가 담긴 2차원 배열
 *              크기는 5x5 이상 30x30이하
 *              각 칸에는 0 이상 100이하의 정수 (0은 빈칸, 각기 다른 인형 모양)
 * @param moves 인형을 집기 위해 크레인을 작동시킨 위치가 담긴 배열
 *              배열의 크기는 1이상 1,000이하
 *              배열 각 원소의 값은 1이상, board 배열의 가로크기 이하인 자연수
 * @return answer 크레인을 모두 작동 시킨 후 터트려서 사라진 인형의 개수
 */
function solution(board, moves) {
    let answer = 0;
    let basket = []; // 인형을 집어서 담을 배열
    const multiArryLen = board.length;
    
    if (moves.length < 1 || moves.length > 1000){
			console.log(`moves 의 크기는 1이상 1,000이하 입니다.`);
      return basket;
    }
    
		if (! moves.every((mv) => mv >= 1 && mv <= multiArryLen)){
    	console.error(`moves 배열의 크기는 1 이상 ${multiArryLen} 이하입니다.`);
      return basket;
    }    
    
    if(multiArryLen < 5 || multiArryLen > 30) {
    	console.error(`board 크기는 5x5 이상 30x30이하의 2차원 배열입니다. 입력하신 배열의 크기는 ${multiArryLen}입니다.`);
      return basket;
    }
    
    if(!board.every((brd) => brd.length === multiArryLen)){
    	console.error(`board 크기는 NxN 입니다.`);
    	return basket;
    }
    
    if (board.every((brd) => brd >= 0 && brd <= 100)){
    	//board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
      console.error(`board의 각 칸에는 0 이상 100 이하인 정수만 가능합니다.`);
      return basket;
    }    
    
    moves.forEach((move) =>{
      
    	board.find((brd) => {
      	// 뽑기
      	if (brd[move - 1] && brd[move - 1] !== 0){
        	const pick = brd[move - 1];
          //basket.push(brd[move - 1]);
          brd[move - 1] = 0; // 인형 사라짐
          
          // 연속 쌓기 체크
          if (basket.length >= 1 
            && basket[basket.length - 1] === pick) {
    
            basket.pop();// 터질때는 2개씩 사라짐
            //basket.pop();
            
            answer += 2;
          }
          else {
          	basket.push(pick);
          }
          return true;
        } 
      });
      //console.log(`board = ${board}`);
      console.log(`basket = ${basket}`);
    });
    
  	console.log(`answer = ${answer}`);
    return answer;
}
// board
//[0,0,0,0,0],
//[0,0,1,0,3],
//[0,2,5,0,1],
//[4,2,4,4,2],
//[3,5,1,3,1]
//solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3]], [1,5,3,5,1,2,1,4]); // board 유효성 검사 false
solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]); // 4
//solution([[0, 0, 0, 0, 1], [0, 0, 1, 0, 3], [0, 2, 4, 0, 1], [3, 2, 1, 0, 2], [1, 5, 1, 3, 5]], [1, 5, 3, 5, 1, 4, 1, 4, 3, 1]); // 2
