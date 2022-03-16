
function solution(s) {
    // 제한 시간 -> 정확성 테스트 : 10초
    /*
    1 ≤ s의 길이 ≤ 50
    s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
    return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다
    */
    let answer = 0;
    const words = ['zero','one','two','three','four','five','six','seven','eight','nine'];
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    if (!s || typeof s !== 'string' || s.length > 50){
    	console.error('문자열(s)의 길이는 1보다 크고 50보다 작은 문자열입니다.');
      return answer;
    }
    
    words.forEach((word, i) => {
    	const regexp = new RegExp(word, 'g');
      s = s.replace(regexp, numbers[i]);
      //s = s.replace(/zero/g, numbers[i]);
      //console.log(s);
    });
    answer = Number(s) || 0;
    console.log(`answer = ${answer}`);
    return answer;
}

solution('one4seveneight'); // 1478 
solution('23four5six7'); // 234567 
solution('1zerotwozero3'); // 10203 
