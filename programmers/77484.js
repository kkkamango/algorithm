/**
 * @param lottos 구매한 로또 번호를 담은 배열
 *        lottos.length = 6
 *        lottos의 모든 원소는 0 이상 45 이하인 정수
 *        0은 알아볼 수 없는 숫자
 * @param win_nums 당첨 번호를 담은 배열
 *        win_nums.length = 6
 *        win_nums의 모든 원소는 1 이상 45 이하 정수
 * @return answer 당첨 가능한 최고 순위와 최저 순위
 */
function solution(lottos, win_nums) {
    let answer = [];
    let maxWinNum = 6; // 당첨 가능한 최고 순위
    let minWinNum = 0; // 최저 순위
    
    if (!Array.isArray(lottos) || !Array.isArray(win_nums) 
    	|| lottos.length != 6 || win_nums.length != 6){
    	
      console.error('lottos와 win_nums는 길이 6인 정수 배열입니다.');
      return answer;
    }
    
    // lottos와 win_nums가 같은 갯수
    const equals = lottos.filter((lotto) => {
    	return win_nums.some((win_num) => win_num === lotto );
    });
    
    // lottos 의 0의 갯수
    const zeros = lottos.filter((lotto) => lotto === 0);
    
    console.debug(`동일한 숫자 =${equals}`);
    minWinNum = equals.length;
    console.debug(`불확실한 숫자(0) =  ${zeros}`);
    maxWinNum = zeros.length;
    
    try {
      answer.push(getRank(maxWinNum + minWinNum));
      answer.push(getRank(minWinNum));
      //getRank(9); // 예외발생
    } catch (e) {
    	console.error(e);
      answer = [];
      //return [];
    }
    console.info(`answer is ${answer}.`);
    return answer;
}

/**
 * @description 로또번호가 일치하는 갯수에 따라 순위를 반환
 */
function getRank(equalNum){
  // lottos 와 win_nums의 일치하는 갯수 
  // ( 6 -> 1등, 5 -> 2등, 4 -> 3등
  // , 3 -> 4등, 2 -> 5등, 1,0개 -> 6등)
	//let rank;
  if ( equalNum >= 0 && equalNum <=6 ){
  	//console.log(`equalNum=${equalNum}, rank =${Math.min(7 - equalNum, 1)}`);
    //console.log(`equalNum=${equalNum}, rank =${equalNum === 0 ? 6 : 7 - equalNum }`);
  	return equalNum === 0 ? 6 : 7 - equalNum;
  
  } else {
  	throw `알수 없는 값입니다.(${equalNum})`;
  }
}

console.info('solution test case 1');
solution([44, 1, 0, 0, 31, 25],	[31, 10, 45, 1, 6, 19]); // [3, 5]

console.info('solution test case 2');
solution([0, 0, 0, 0, 0, 0],	[38, 19, 20, 40, 15, 25]); // [1, 6]

console.info('solution test case 3');
solution([45, 4, 35, 20, 3, 9],	[20, 9, 3, 45, 4, 35]); // [1, 1]

console.info('solution test case 4');
solution();

console.info('solution test case 5');
solution([45, 4, 35, 20, 3, 9, 11],	[20, 9, 3, 45, 4, 35]);
//console.info('getRank test case');
//console.log(getRank(2)); // 5
//console.log(getRank(1)); // 6
//console.log(getRank(0)); // 6
//console.log(getRank(9)); // Uncaught 알수 없는 값입니다.(9)
