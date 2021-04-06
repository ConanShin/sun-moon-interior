<template>
    <router-view/>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class App extends Vue {
    async beforeMount () {
        const param = this.getParam()
        if (param.path) {
            const path = param.path
            delete param['path']
            await this.$router.push({name: path, query: param}).catch(() => {})
        }
    }

    getParam () {
        const search = location.search.substring(1);
        if (search.length === 0) return {}
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }
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

.logo-icon {
    background-image: url("~@/assets/logo.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
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

input, textarea, input::placeholder {
    font-family: 'MapoFlowerIsland';
    font-size: 12px;
}

input {
    background: none;
    border: none;
    padding: 0 5px;
    border-radius: 0;
    -webkit-border-radius: 0;
}

input[type='text'] {
    appearance: none;
    border-radius: 0;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
}

input[type='checkbox'] {
    border-radius: 0;
    -webkit-border-radius: 0;
    border: 1px solid $dark-theme;
    width: 20px;
    height: 20px;
}

input[type='checkbox']:checked {
}

input:disabled {
    background: $bright-theme-100;
}

input:focus {
    background: transparent;
    border: 0;
    outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px $bright-theme inset !important;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}

@include mobile {
    .menu-name {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 15px;
        margin-top: 20px;
    }
}

@include desktop {
    .menu-name {
        display: none !important;
    }
}

.button {
    cursor: pointer;
}
</style>
