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
@import 'src/assets/style/common';
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
    color: $dark-theme;
    background-color: $bright-theme;
}

html, body {
    overflow-x: hidden;
}

input {
    background: none;
    border: none;
    padding: 0 5px;
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
    -webkit-box-shadow: 0 0 0 30px $bright-theme inset !important;
}

/* Hide scrollbar for Chrome, Safari and Opera */
//::-webkit-scrollbar {
//    display: none;
//    -ms-overflow-style: none;  /* IE and Edge */
//    scrollbar-width: none;  /* Firefox */
//}
//
//::-webkit-scrollbar {
//    width: 0;  /* Remove scrollbar space */
//    background: transparent;  /* Optional: just make scrollbar invisible */
//}

@include mobile {
    .menu-name {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 15px;
    }
}

@include desktop {
    .menu-name {
        display: none !important;
    }
}
</style>