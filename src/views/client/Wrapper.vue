<template>
    <div>
        <nav>
            <div @click="redirect('home')" class="logo">sun & moon</div>
            <div @click="redirect('home')">home</div>
            <div @click="redirect('about')">about</div>
            <div @click="redirect('residence')">residence</div>
            <div @click="redirect('review')">review</div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    redirect (name) {
        this.$router.push({name}).catch(() => {})
    }
}
</script>

<style scoped lang="scss">
.logo {
    margin-right: 50px;
}
nav {
    display: flex;
    width: 80%;
    margin: 10px auto;
}
nav > div {
    cursor: pointer;
    padding: 5px;
    margin: 5px;
}
</style>