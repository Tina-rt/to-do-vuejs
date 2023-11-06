<script>
import { useTodoStore } from '../stores/todostore';
import {watch} from 'vue';

export default {
  props: {
    todo_item: {
      type: Object,
      default: () => { }
    },
    index:{
      type: Number,
    }
  },

  data() {
    let todo_store = useTodoStore();

    return {
      todoStore: todo_store,
      
    };
  },
  methods:{
    handle_check(){
      

    }
  },
  setup(props){

    watch(
      () => props.todo_item.completed, (checked, oldVal) => {
        if (checked){
          let todoStore = useTodoStore();
          todoStore.setTodoCompleted(props.index);
          
        }
      } 
    )
  }
}

</script>

<template>
  <div class="todo-item">
    <div class="row w-100">
      <div class="todo-check col-1 w-auto"><input type="checkbox" class="form-check-input" v-model="todo_item.completed">
      </div>
      <div class="todo-text col w-100" @click="$emit('click_todo')">
        {{ todo_item.todo }}
      </div>
    </div>
    <div class="todo-item-action">

      <div class="edit" @click="$emit('click_todo')"><fa-icon icon="fas fa-pen" ></fa-icon></div>
      <div class="delete" @click="this.$emit('delete', index)"><fa-icon icon="fas fa-trash" color="firebrick" /></div>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: 200px;
  width: 300px;
  justify-content: space-between;
  padding: 10px;
  /* background-color: rgb(78, 78, 78); */
  background-color: var(--color-background-soft);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--color-text);
  animation: fadein 0.3s;
}

.todo-item:hover {
  background-color: var(--color-background-mute);
}

.todo-text {
  /* width: auto; */
  max-width: 80%;
  /* text-wrap: wrap; */
  word-wrap: break-word;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.todo-item-action {
  display: flex;
  gap: 20px;
  width: fit-content;
  justify-content: end;
}

.todo-item-action * {
  cursor: pointer;

}

.todo-check input {
  cursor: pointer;
}
</style>