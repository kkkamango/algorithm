/**
 * @numbers 사용할 수 있는 숫자가 담긴 배열 
 * @target 타겟 넘버
 * @answer 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수
 * 깊이 너비 우선탐색
 */
function solution(numbers, target) {
    let answer = 0;
    const depthFirstSearch = (depth, sum) => {
    	if (numbers.length === depth){
      	if (target === sum){
        	answer++;
        }
        return false;
      }
      depthFirstSearch(depth +1, sum + numbers[depth]);
      depthFirstSearch(depth +1, sum - numbers[depth]);
    }
    depthFirstSearch(0, 0);
    
    console.log(answer);
    return answer;
}
solution([1, 1, 1, 1, 1], 3); //5
solution([4, 1, 2, 1], 4); //2
