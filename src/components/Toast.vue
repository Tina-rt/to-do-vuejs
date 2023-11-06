<script>
import { watch } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';


export default {
    props: {
        toast_opener: {
            type: Boolean
        },
        message: {
            type: String,
            default: "Todo Notification"
        }
    },
    setup(props) {

        watch(
            () => props.toast_opener, (old, new_) => {
                let toastMessage = document.getElementById('toastMessage');
                let toast = new bootstrap.Toast(toastMessage);
                console.log('toast opening')
                toast.show();
            }
        )
    }
}
</script>
<template>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="toastMessage" class=" toast align-items-center text-white bg-primary border-0" role="alert"
            aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ message }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>