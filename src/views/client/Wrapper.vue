<template>
    <div>
        <nav>
            <div>
                <div @click="redirect('home')" class="logo">sun & moon</div>
            </div>
            <div class="menu">
                <div @click="redirect('home')">home</div>
                <div @click="redirect('about')">about</div>
                <div @click="redirect('residence')">residence</div>
                <div @click="redirect('review')">review</div>
            </div>
        </nav>
        <router-view class="view"/>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    redirect(name) {
        this.$router.push({name}).catch(() => {
        })
    }
}
</script>

<style scoped lang="scss">
nav {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 10px auto;
}

.menu {
    display: flex;
}

.menu > div, .logo {
    cursor: pointer;
    margin: 5px 10px 5px 0;
    padding: 5px 0;
}

.view {
    width: 80%;
    height: 88vh;
    margin: auto;
}
</style>