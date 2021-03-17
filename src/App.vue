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
$theme: #655e5e;

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
    overflow: hidden;
}
</style>