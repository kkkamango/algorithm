function solution(w, h) {
    let answer = 1;
    // 최대공약수
    let result = gcd(w, h);
    //console.log(`최대공약수=${result}`);
    
    answer = w * h - (w + h - result);
    return answer;
}

// 최대공약수 구하기
function gcd(w, h){
	const array = [];
  let max = Math.max(w, h);
  let min = Math.min(w, h);
  
  if (max % min === 0){
  	return min;
  } else {
  	return gcd(min, max % min);
  }
}

const result = solution(8, 12);
console.log(result); // 96 -16 = 80

const result2 = solution(7, 14);
console.log(result2); // 88 -14 = 84

