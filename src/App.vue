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
body {
    font-family: system-ui,monospace;
    font-size: 12px;
    margin: 0;
    color: darkgray;
}
</style>