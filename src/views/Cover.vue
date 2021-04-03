<template>
    <div class="background" :class="{show: listShow}" :style="{'background-image': products[0] && 'url(' + products[0].list_image + ')'}">
        <div class="logo">해와달인테리어</div>
        <div class="enter" @click="$store.commit('coverHidden', true)">들어가기</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import {categories} from "@/cafe24info";

@Component
export default class Launcher extends Vue {
    listShow = false
    mounted() {
        setTimeout(() => this.listShow = true, 100)
    }

    get products () {
        return this.$store.getters.products
    }

    async beforeMount() {
        await this.$store.dispatch('findPortfolioList', categories['cover'])
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 1500px;
    //background-image: url("~@/assets/front-door.jpg");
    background-color: $bright-theme;
    @include mobile {
        background-size: 1000px 100%;
        overflow: hidden;
    }
    z-index: 2;

    opacity: 0;
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
}
//.background::before {
//    content: '';
//    opacity: 0.4;
//    position: absolute;
//    top: 0;
//    left: 0;
//    background-color: white;
//    width: 100%;
//    height: 100%;
//}

.logo {
    position: relative;
    top: -10%;
    font-size: 30px;
    letter-spacing: -3px;
    cursor: pointer;
    text-shadow: 2px 2px 3px #0000002e;
    @include mobile {
        font-size: 20px;
    }
}

.enter {
    cursor: pointer;
    color: $dark-theme;
    border: 1px solid $dark-theme;
    padding: 8px;
    margin-top: -40px;
}
</style>
