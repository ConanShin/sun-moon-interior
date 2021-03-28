<template>
    <div class="modal gray">
        <div class="background">
            <slot></slot>
            <div>비밀번호</div>
            <input v-model="password"/>
            <div class="control">
                <div @click="$emit('confirm', password)">확인</div>
                <div @click="close">취소</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class PasswordForm extends Vue {
    password = ''

    close () {
        this.password = ''
        this.$emit('cancel')
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($transparent-dark-theme, 0.5);
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.control {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    div {
        padding: 2px 5px;
        margin-left: 5px;
        border: 1px solid $transparent-dark-theme;
        cursor: pointer;
    }
}

.background {
    color: $dark-theme;
    background-color: $bright-theme;
    padding: 10px;
    line-height: 22px;

    input {
        color: $dark-theme;
        width: 200px;
        height: 22px;
        border: 1px solid $transparent-dark-theme;
        margin-bottom: 5px;
    }

    @include desktop {
        padding: 20px 40px 0;
        & > input {
            margin-bottom: 20px;
        }
        margin-bottom: 20%;
    }
}
</style>