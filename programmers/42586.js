/**
 * @progresses 먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열
 * @speeds 각 작업의 개발 속도가 적힌 정수 배열
 */
function solution(progresses, speeds) {
    
    const workDays = getWorkDays(progresses, speeds);
    
    return getWorkTimes(workDays);
}
function getWorkDays(progresses, speeds){
	return progresses.map((progress, i) => Math.ceil((100 - progress) / speeds[i]));
}

function getWorkTimes(workDays){
  const answer = [];//각 배포마다 몇 개의 기능이 배포
  
  let workDay = workDays[0];
  let count = 1; // 배포건수
  for(let i = 1; i < workDays.length; i++){
  	let next = workDays[i];
    if(workDay >= next){
      // 소요일수0(이전) 보다 소요일수1가 작거나 같으면 -> 완료
      count ++;
    } else {
      answer.push(count);
      count = 1; // 초기화
    	workDay = next; // 초기화
    }
  }
  //console.log(`workDay =${workDay}, count=${count}`);
  answer.push(count); // 마지막 건수 저장
  console.log(`answer =${answer}`);
  return answer;
}
//solution([70, 81, 41, 38], [10, 2, 8, 18]);

//solution([93, 30, 55], [1, 30, 5]); // [2, 1]
solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]); // [1, 3, 2]
