
/**
 * @record 채팅방에 들어오고 나가거나, 닉네임을 변경한 기록이 담긴 문자열 배열
 *         enter userId nickname
 *         leave userId nickname
 *         change userId nickname
 */
function solution(record) {
    let answer = []; // 방을 개설한 사람이 보게 되는 메시지
    let userMap = {};
    const description = {
    	'Enter' : '님이 들어왔습니다.',
      'Leave' : '님이 나갔습니다.'
    }
    
    if (record.length ){
    	record.forEach((d) =>{
      	const [action, id, nickname]= d.split(' ');

        userMap[id] = nickname;
        
        if (action === 'Enter' || action === 'Leave'){
        	answer.push({
            action : action,
            id : id,
            nickname : nickname || '',
        	});
        }
      });
      
    }
    return answer.map(d => `${userMap[d.id]}${description[d.action]}`);
}

// ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
const result = solution(["Enter uid1234 Muzi"
, "Enter uid4567 Prodo"
,"Leave uid1234"
,"Enter uid1234 Prodo"
,"Change uid4567 Ryan"]);

console.log(result);
