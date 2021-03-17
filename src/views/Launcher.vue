<template>
    <div class="background">
        <div class="logo" @click="$router.push({name: 'home'})">해와달인테리어</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Launcher extends Vue {
    imageIndex = 0
    beforeMount () {
        const path = this.getParam('path')
        if (path) this.$router.push({name: path})
        // else this.$store.dispatch('findProducts')
    }

    mounted () {
        // setInterval(() => this.imageIndex++, 3000)
    }

    // get productImages() {
    //     return this.$store.getters.products.map(product => product.list_image)
    // }

    getParam (name) {
        let params = location.search.substr(location.search.indexOf("?") + 1)
        params = params.split("&");
        for (let i = 0; i < params.length; i++) {
            let keyValue = params[i].split("=");
            if (keyValue[0] === name) return keyValue[1]
        }
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';

$theme: #655e5e;
.background {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 1500px;
    background-image: url("~@/assets/front-door.jpg");
    @include mobile {
        background-size: 1000px 100%;
        overflow: hidden;
    }
    z-index: 1;
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
    left: 10px;
    font-size: 30px;
    letter-spacing: -3px;
    cursor: pointer;
    text-shadow: 2px 2px 3px #0000002e;
    @include mobile {
        font-size: 20px;
    }

}
</style>
