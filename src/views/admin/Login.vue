<template>
    <div class="login">
        <div class="row">
            <label>ID</label>
            <input v-model="userId"/>
        </div>
        <div class="row">
            <label>Password</label>
            <input v-model="password"/>
        </div>
        <div class="row button" @click="login">로그인</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class Login extends Vue {
    userId = ''
    password = ''

    async login () {
        try {
            axios.defaults.headers['auth-key'] = 'conan'
            const token = await axios.post(process.env.VUE_APP_BACKEND + '/cafe-twentyfour/account/admin', {id: this.userId, password: this.password})
            axios.defaults.headers['Authorization'] = token.data
            await this.$router.push({name: 'adminWriteArticle'})
        } catch (error) {
            alert('비밀번호가 틀렸습니다.')
        }
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';
@import 'src/assets/style/media-query';

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .row {
        margin: 5px 0;
    }
    label {
        display: inline-block;
        width: 70px;
    }
    input {
        border: 1px solid $transparent-dark-theme;
    }
}
</style>