<template>
    <div class="modal" :class="{show: loading}">
        <div>해와달인테리어</div>
        <div>loading...</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
    get loading () {
        return this.$store.getters.loading
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    background-color: rgba($transparent-dark-theme, 0.8);
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in;
    &.show {
        opacity: 1;
        width: 100%;
        height: 100%;
    }
}
</style>