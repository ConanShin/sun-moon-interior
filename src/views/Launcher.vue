<template>
    <div class="background">
        {{'<화질 좋은 사진 필요>'}}
        <image-loader
            class="image-loader"
            src="http://sun-mooninterior.com/web/upload/NNEditor/20210224/%EC%A3%BC%EB%B0%A94_shop1_163321.jpg"
            width="1000px" height="700px"
        />
        <div class="logo">sun & moon</div>
        <div class="button" @click="$router.push({name: 'Home'})">ENTER</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Launcher extends Vue {

}
</script>

<style scoped lang="scss">
.background {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    position: relative;
    top: -11%;
}

.button {
    position: relative;
    top: -10%;
    padding: 10px;
    color: darkgray;
    border: 2px solid darkgray;
    cursor: pointer;
    transition: all ease-in 0.3s;
    &:hover {
        background-color: darkgray;
        color: white;
    }
}

.image-loader {
}
</style>