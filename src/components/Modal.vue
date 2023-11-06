<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import { useTodoStore } from '../stores/todostore';



export default {
    props: {
        index: {
            type: Number
        },
        current_todo: {
            type: Object
        },
        open_modal: {
            type: Boolean
        }
    },

    data() {
        let todoStore = useTodoStore();
        return {
            todoStore,
            modal: null,


        }
    },
    
    methods: {
        save_change() {
            this.todoStore.modifyTodo(this.index, this.current_todo);
        }

    },

    watch: {
        open_modal() {
            let modal = new bootstrap.Modal(document.getElementById('todoModal'), { keyboard: false });
            modal.toggle();
        },


    }
}
</script>

<template>
    <div class="modal fade" id="todoModal" tabindex="-1" aria-labelledby="todoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="todoModalLabel">Modify</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="" v-model="current_todo.todo"
                        @keyup.enter="save_change">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="save_change" data-bs-dismiss="modal">Save
                        changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-content,
.modal-body {

    background-color: var(--color-background-soft);
    color: var(--color-text);
}</style>