<template>
    <div class="background" :style="{backgroundImage: 'url(\'' + productImages[imageIndex % productImages.length] + '\')'}">
        <div class="logo">sun & moon</div>
        <div class="button" @click="$router.push({name: 'home'})">ENTER</div>
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

        this.$store.dispatch('findProducts')
    }

    mounted () {
        setInterval(() => this.imageIndex++, 3000)
    }

    get productImages() {
        return this.$store.getters.products.map(product => product.list_image)
    }

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

$theme: #6b6a6a;
.background {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center;
    transition: background-image 0.2s ease-in-out;
    background-size: 100% 1500px;
    @include mobile {
        background-size: 1000px 100%;
    }
}

.logo {
    position: relative;
    top: 0;
}

.button {
    position: relative;
    top: 1%;
    padding: 10px;
    color: $theme;
    border: 2px solid $theme;
    cursor: pointer;
    transition: all ease-in 0.3s;
    &:hover {
        background-color: $theme;
        color: white;
    }
}
</style>