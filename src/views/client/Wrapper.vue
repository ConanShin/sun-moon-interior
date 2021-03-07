<template>
    <div>
        <nav>
            <div>
                <div @click="redirect('home')" class="logo">해와달</div>
            </div>
            <div class="menu">
                <div @click="redirect('home')">홈</div>
                <div @click="redirect('portfolio')">포트폴리오</div>
                <div @click="redirect('reviews')">후기</div>
                <div @click="redirect('location')">위치</div>
            </div>
        </nav>
        <div class="submenu" :class="{show: $route.path.includes('portfolio')}">
            <div @click="$store.dispatch('findPortfolioList', 20)" :class="{bold: $store.getters.py === 20}">20평</div>
            <div @click="$store.dispatch('findPortfolioList', 30)" :class="{bold: $store.getters.py === 30}">30평</div>
            <div @click="$store.dispatch('findPortfolioList', 40)" :class="{bold: $store.getters.py === 40}">40평</div>
            <div @click="$store.dispatch('findPortfolioList', 50)" :class="{bold: $store.getters.py === 50}">50평</div>
        </div>
        <router-view class="view"/>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    async redirect(name) {
        if (name === 'portfolio') {
            await this.$store.dispatch('findPortfolioList', 20)
            if (this.isDesktop) await this.$store.dispatch('findPortfolio', this.products[0].productId)
        }
        await this.$router.push({name}).catch(() => {})
    }

    get products () {
        return this.$store.getters.products
    }

    get isDesktop () {
        return window.innerWidth > 400
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';

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

.submenu {
    overflow: hidden;
    height: 0;
    width: 80%;
    margin: auto;
    transition: height 0.3s ease-in;
    display: flex;
    div {
        margin-right: 10px;
        cursor: pointer;
        &.bold {
            font-weight: bold;
        }
    }
    @include mobile {
        justify-content: flex-end;
    }
    &.show {
        height: 17px;
    }
}

.view {
    position: relative;
    width: 80%;
    height: 90vh;
    @include mobile {
        height: 100vh;
        width: 100%;
    }
    margin: auto;
}
</style>
