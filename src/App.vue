<script>

import { useTodoStore } from './stores/todostore';
import ToDoItem from './components/ToDoItem.vue';
import Modal from './components/Modal.vue';
import Toast from './components/Toast.vue';


export default {
  components: {
    ToDoItem,
    Modal,
    Toast
  },
  data() {
    let useTodoStore_ = useTodoStore();

    return {
      todoStore: useTodoStore_,
      current_todo: "",
      opening_modal: false,
      index_edit: 0,
      toast_opener: false,
      toast_message: "To do added successfully"
    }
  },
  mounted() {

  },
  methods: {
    add_todo() {
      this.todoStore.addListTodo(this.current_todo);
      this.current_todo = "";
      this.open_toast("New To do added successfully");

    },
    click_todo(index) {
      this.index_edit = index;
      this.opening_modal = !this.opening_modal;
      console.log(this.index_edit);

    },
    
    handle_deleting(index) {
      this.todoStore.removeTodo(index);
    },
    
    open_toast(message){
      this.toast_opener = !this.toast_opener;
      this.toast_message = message;
    }
  }
}

</script>

<template>
  <main>
    <Modal :open_modal="opening_modal" :index="index_edit" :current_todo="{...todoStore.list_todo[index_edit]}" />
    <Toast :toast_opener="toast_opener" :message="toast_message"/>
    
    <div class="header">
      <div class="brandname">To do</div>
      <div class="form">
        <input @keyup.enter="add_todo" type="text" class="form-control" placeholder="Add a new task"
          v-model="current_todo">
        <div class="btn btn-primary" @click="add_todo">Add</div>
      </div>
    </div>

    <div class="d-flex flex-column">
      <div class="nav flex-row nav-pills me-3  justify-content-center gap-5" id="v-pills-tab" role="tablist"
        aria-orientation="vertical">
        <button class="nav-link active position-relative" id="v-todo-tab" data-bs-toggle="pill" data-bs-target="#v-todo" type="button"
          role="tab" aria-controls="v-todo" aria-selected="true">To do list <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ todoStore.list_todo.length }}</span></button>

        <button class="nav-link position-relative" id="v-completedtask-tab" data-bs-toggle="pill" data-bs-target="#v-completedtask"
          type="button" role="tab" aria-controls="v-completedtask" aria-selected="false">
          Completed task
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{{
            todoStore.getCompletedTask().length }}</span>
        </button>
      </div>

      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-todo" role="tabpanel" aria-labelledby="v-todo-tab">

          <div class="list-todo mt-4">
            <ToDoItem v-for="(todo, index) in todoStore.list_todo" :todo_item="todo" :index="index"
              @delete="handle_deleting" @click_todo="click_todo(index)" @todocheck="open_toast('One to do list completed !')"/>
              <div v-if="todoStore.list_todo.length == 0">
                You have no todo list right now
              </div>
          </div>

        </div>

        <div class="tab-pane fade" id="v-completedtask" role="tabpanel" aria-labelledby="v-completedtask-tab">

          <div class="list-todo mt-4">
            <ToDoItem v-for="(todo_, index_) in todoStore.getCompletedTask()" :todo_item="todo_" :index="index_"
              @delete="handle_deleting" @click_todo="click_todo(index)" />
          </div>

        </div>

      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: start;
  align-items: center;
  gap: 50px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;

}

.brandname {
  font-size: 4rem;
}

.form {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 300px;
}

.btn {
  cursor: pointer;

}

.list-todo {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

}

@media (max-width:400px) {
  .list-todo {

    height: 400px;
    overflow-y: scroll;
  }
}
</style>
