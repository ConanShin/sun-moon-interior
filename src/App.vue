<template>
    <router-view/>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class App extends Vue {
}
</script>

<style lang="scss">
@import 'src/assets/style/media-query';
$theme: #655e5e;
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

@font-face {
    font-family: 'MapoFlowerIsland';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
    font-family: 'MapoFlowerIsland';
    font-size: 12px;
    margin: 0;
    color: $theme;
    background-color: #efede1;
}

html, body {
}

input {
    background: none;
    border: none;
}
input:focus {
    background: transparent;
    border: 0;
    outline: none;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
{
    -webkit-box-shadow: 0 0 0 30px #efede1 inset !important;
}

@include mobile {
    .menu-name {
        display: block;
        position: absolute;
        width: 100%;
        text-align: center;
    }
}

@include desktop {
    .menu-name {
        display: none;
    }
}
</style>