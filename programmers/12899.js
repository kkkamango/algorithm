function solution(n) {
    let answer = calc(n);
    console.log(`n = ${n}, answer =${answer}`);
    return answer;
}

// 3진수 만들기
function calc(n){
	let rest;
  let result = []; // 나머지
  
  while ( n !== 0 ){
    rest = n % 3;
    n = Math.floor(n / 3);

		// -> 나머지가 0일 경우, n의 값을 1개 차감 (10 -> 4)
    if (rest === 0) {
    	rest = 4;
      n--;
    }
    
    result.push(rest);
    //console.log(`n=${n}, rest=${rest}`);    
  }
  return result.reverse().join('');
}

