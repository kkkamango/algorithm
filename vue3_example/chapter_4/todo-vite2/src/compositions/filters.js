/*
# 필터
1. 날짜가 지났지만 완료하지 않은 작업
2. 오늘 해야 할 작업
3. 오늘 해야 할 작업 중 완료한 작업
4. 날짜와 상관 없이 모든 작업

# 정렬
1. 최근 날짜 우선
2. 동일한 날짜라면 최근에 입력한 작업 우선
*/
import {inject} from 'vue'

export const useFilter = () => {
    const today = inject('today');
    // 정렬
    const fnSort = (a, b) => {
        const a_date = Date.parse(a.date);
        const b_date = Date.parse(b.date);
        
        if (a_date > b_date) return 1;
        else if (a_date < b_date) return -1;
        else return a.id - b.id; // 숫자
    };

    // 필터 1. 날짜가 지났지만 완료하지 않은 작업
    const getPendingTodos = (todos) => {
        return todos.value.filter((todo) => todo.date < today && !todo.completed)
            .slice()   // 원본은 그대로 두고, 새로운 배열로 만들기 위해
            .sort(fnSort);
    };

    // 필터 2. 오늘 해야 할 작업
    const getActiveTodayTodos = (todos) => {
        return todos.value.filter((todo) => todo.date === today && !todo.completed)
            .slice()
            .sort(fnSort);
    };

    // 필터 3. 오늘 해야 할 작업 중 완료한 작업
    const getCompletedTodayTodos = (todos) => {
        return todos.value.filter((todo) => todo.date === today && todo.completed)
            .slice()
            .sort(fnSort);
    };
    
    // 필터 오늘 모든 작업
    const getAllTodayTodos = (todos) => {
        return getActiveTodayTodos(todos)
            .concat(getCompletedTodayTodos(todos))
            .slice()
            .sort(fnSort);
    };

    // 필터 4. 날짜와 상관 없이 모든 작업
    const getAllTodos = (todos) => {
        return todos.value.slice()
            .sort(fnSort);
    };

    return {
        getPendingTodos,
        getActiveTodayTodos,
        getCompletedTodayTodos,
        getAllTodayTodos,
        getAllTodos
    }
}
