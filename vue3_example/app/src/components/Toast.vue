<template>
  <div style="position: absoulte; top: 60px; right: 10px">
    <div v-for="t in toasts.data" :key="t.id" role="alert"
      class="toast show text-white bg-danger">
      <div class="toast-header">
        <img src="../assets/logo.png" alt="app" class="rounded me-2" width="15" height="15" />
        <strong class="me-auto">Warning</strong>
        <button class="btn-close" @click="onClose(t.id)"></button>
      </div>

      <div class="toast-body">{{t.message}}</div>
    </div>
  </div>
</template>

<script>
import {inject, reactive, watch, onMounted} from 'vue'

export default {
  setup(props) {
    const toast = inject('toast', '');
    const toasts = reactive({
      data : [],
    });
    let id = 0;

    // 새로운 값이 들어오면 객체 생성
    watch(
      () => toast,
      (n,o) => {
        if (n.value.length > 0){
          const new_id = id++;
          toasts.data.unshift({
            id : new_id,
            message : n.value,
            start : new Date().getTime(),
          })

          toast.value = ''
        }
      },
      { deep : true }
    );
    
    const onClose = (close_id) => {
      toasts.data = toasts.data.filter(t => t.id !== close_id);
    }
    
    onMounted(() => {
      setInterval(() => {
        const now = new Date().getTime();
        toasts.data.forEach(t => {
          if (now - t.start > 5000){
            toasts.data = toasts.data.filter(j => j.id != t.id);
          }
        });
      })
    });

    return {
      toasts,
      onClose,
    }
  }
}
</script>
