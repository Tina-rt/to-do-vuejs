import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore('todostore', () => {
    const list_todo = ref([]);
    

    let list_temp = localStorage.getItem('todo');
    if (list_temp) {
        list_todo.value = JSON.parse(list_temp);
        
    }
    else {
        list_todo.value = [];
        localStorage.setItem('todo', JSON.stringify(list_todo.value));
    }

    function update_storage(new_val) {
        localStorage.setItem('todo', JSON.stringify(new_val))
    }

    function getCompletedTask(){
        let list_completed_todo = [];
        list_todo.value.forEach(todo => {
            if (todo.completed){
                list_completed_todo.push(todo);
            }
        });
        return list_completed_todo;
    }

    function addListTodo(todo) {
        list_todo.value.push({ todo, completed: false });
        update_storage(list_todo.value);
    }
    function setTodoCompleted(index) {
        list_todo.value[index].completed = true
        update_storage(list_todo.value);
    }
    function removeTodo(index_todo) {
        // let index_todo = list_todo.value.indexOf(todo);
        list_todo.value.splice(index_todo, 1);
        update_storage(list_todo.value);
    }

    function modifyTodo(index_todo, new_todo){
        list_todo.value[index_todo] = new_todo;
        update_storage(list_todo.value);
    }



    return { list_todo, addListTodo, removeTodo, setTodoCompleted, getCompletedTask, modifyTodo }
})