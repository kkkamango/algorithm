import { reactive, computed } from "vue";

export const useApplications = () => {
  const state = reactive({ applications : [] });
  const SET_DATA = (data) => {
    console.log(data)
    state.applications = data;
  }
  
  // getters 변경
  const applications_count = computed(() => state.applications.length);
  const applications = (filter = null) => {
    if (filter){
      return computed(() => state.applications.filter(i => i.name == filter));
    }
    return computed(() => state.applications);
  }

  // actions 변경
  const setApplications = (data) => {
    if (data.length > 0){
      SET_DATA(data);
    }
  }

  return {
    applications_count,
    applications,
    setApplications,
  }
}
