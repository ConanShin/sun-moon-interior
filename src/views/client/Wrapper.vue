<template>
    <div>
        <nav>
            <div @click="redirect('Main')" class="logo">sun & moon</div>
            <div @click="redirect('Main')">home</div>
            <div @click="redirect('About')">about</div>
            <div @click="redirect('Residence')">residence</div>
            <div @click="redirect('Review')">review</div>
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