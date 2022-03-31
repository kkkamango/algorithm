// 2진수 만들기
function calc(n){
	let rest;
  let result = []; // 나머지
  
  while ( n !== 0 ){
    rest = n % 2;
    n = Math.floor(n / 2);
    result.push(rest);
    //console.log(`n=${n}, rest=${rest}`);    
  }
  return result.reverse().join('');
}



console.log(calc(13)); // 1101
console.log(calc(88)); // 1011000 
