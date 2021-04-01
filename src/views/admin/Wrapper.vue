<template>
    <div>
        <div class="menu">해와달 인테리어 관리자 페이지</div>
        <transition name="fade" mode="out-in">
            <router-view class="view"/>
        </transition>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Wrapper extends Vue {
    async beforeMount () {
        const param = this.getParam()
        if (param.path) {
            await this.$router.push({name: param.path, query: param}).catch(() => {})
        }
    }

    getParam () {
        const search = location.search.substring(1);
        if (search.length === 0) return {}
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';
@import 'src/assets/style/media-query';
.menu {
    text-align: center;
    font-size: 34px;
    margin: 20px 0;
}
.view {
    margin: auto;
    width: 80%;
    height: calc(100vh - 76px);
    color: $dark-theme;
}
</style>
<style lang="scss">
@import 'src/assets/style/common';
@import 'src/assets/style/media-query';
.button {
    padding: 3px;
    border: 1px solid $transparent-dark-theme;
}
</style>