function solution(s) {
	let answer = 0;
	let minLength = 1; // MIN 문자열 s를 압축한 길이 중 가장 짧은 길이
    const maxLength = s.length; // MAX 문자열 s를 압축한 길이 중 가장 긴 길이
    //console.log(`maxLength =${maxLength}`);
    let resultArray = []; // 조각별로 압축한 문자열
    
    while ( minLength <= maxLength ){
      
    	// 나머지가 0인 경우만 압축하기
      //if ( maxLength % minLength == 0 ){
        const wordArray = [...s]; // 문자열 charArray
        //const totalRepeat = maxLength / minLength; // 반복횟수
        const totalRepeat = Math.ceil(maxLength / minLength); // 반복횟수
        let repeat = 1;
        let tempArray = [];
        //console.debug(wordArray); // queue
        
        while (repeat <= totalRepeat){
        	console.debug(`start wordArray =${wordArray}`);
          let compare = '';
          
          for (let wordIdx = 0 ; wordIdx < minLength; wordIdx++ ) {
          	//console.log(`undefined check : ${!wordArray[0]}`);
            //if(!!wordArray[0]){	
              compare += wordArray.shift() || '';
              //console.debug(wordArray);
            //}
          }
          console.debug(`compare =${compare}`);
          console.debug(`end wordArray =${wordArray}`);
          
          tempArray.push(compare);
          
        	repeat++;
        }
        
        // 압축할 문자열 배열
        console.debug(`tempArray = ${tempArray}`);
        resultArray.push(compress(tempArray));
      //}
      minLength++;
      
    }
    console.debug(`resultArray =${resultArray}`);
    answer = Math.min(...resultArray.map((result) => result.length));
    //const minLength = Math.min(...resultArray.map((result) => result.length));
    //console.log(`minLength =${minLength}`);
    //answer = resultArray.find((result) => result.length === minLength);
    console.log(`answer = ${answer}`);
    return answer;
}

// 조각별로 자른 문자열(배열)을 압축
function compress(array){
  let resultArray = [];
  let repeatCount = 1; // 중복 갯수

  array.forEach((me, i) => {

    // 중복문자일 경우 건너뛰기
    if (repeatCount > 1){
      repeatCount--;
      return;
    }

    let flag = true; // 진행여부

    array.forEach((value, j) => {

      if (j <= i || !flag){
        return;
      }

      if (me !== value) {
        //console.debug('비교 중지');
        flag = false;
        return;
      }
      repeatCount++;
      //console.debug(`i=${i}, j=${j}, me=${me}, value=${value}`);

    });
    //console.debug(`repeatCount=${repeatCount}`);

    if (repeatCount > 1){
      resultArray.push(repeatCount);
    }
    resultArray.push(me);
    //console.debug(`resultArray=${resultArray}`);
    //console.debug('==============');
  });
	console.debug(`compress result =${resultArray.join('')}`);
	return resultArray.join('');
}


solution("aabbaccc");//	7
solution("ababcdcdababcdcd");//	9
solution("abcabcdede");//	8
solution("abcabcabcabcdededededede");//	14
solution("xababcdcdababcdcd");//	17
