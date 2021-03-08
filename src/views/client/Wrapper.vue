<template>
    <div>
        <nav>
            <div>
                <div @click="redirect('home')" class="logo">해와달</div>
            </div>
            <div class="menu">
                <div @click="redirect('home')" :class="{bold: $route.path.includes('home')}">홈</div>
                <div @click="redirect('portfolio')" :class="{bold: $route.path.includes('portfolio')}">포트폴리오</div>
                <div @click="redirect('reviews')" :class="{bold: $route.path.includes('review')}">후기</div>
                <div @click="redirect('location')" :class="{bold: $route.path.includes('location')}">위치</div>
            </div>
        </nav>
        <div class="submenu" :class="{show: $route.path.includes('portfolio')}">
            <div @click="redirectSubmenu(20)" :class="{bold: Math.floor($store.getters.py/10) === 2}">20py</div>
            <div @click="redirectSubmenu(30)" :class="{bold: Math.floor($store.getters.py/10) === 3}">30py</div>
            <div @click="redirectSubmenu(40)" :class="{bold: Math.floor($store.getters.py/10) === 4}">40py</div>
            <div @click="redirectSubmenu(50)" :class="{bold: Math.floor($store.getters.py/10) === 5}">50py</div>
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

    async redirectSubmenu(py) {
        await this.$store.dispatch('findPortfolioList', py)
        if (!this.$route.fullPath.endsWith('portfolio')) await this.$router.push({name: 'portfolio'})
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
    padding: 10px 10%;
    position: sticky;
    background-color: #e2d7b959;
}

.menu {
    display: flex;
    align-items: center;
    .bold {
        font-weight: bold;
        color: black;
    }
}

.menu > div, .logo {
    cursor: pointer;
    margin: 5px 10px 5px 0;
    padding: 10px 0;
}

.logo {
    font-size: 18px;
}

.submenu {
    overflow: hidden;
    height: 0;
    width: 80%;
    padding: 0 10%;
    transition: height 0.3s ease-in;
    display: flex;
    background-color: #e2d7b959;
    div {
        margin-right: 10px;
        cursor: pointer;
        &.bold {
            font-weight: bold;
            color: black;
        }
    }
    @include mobile {
        justify-content: flex-end;
    }
    &.show {
        height: 17px;
        padding-bottom: 3px;
    }
}

.view {
    position: relative;
    width: 80%;
    height: 90vh;
    @include mobile {
        height: calc(100vh - 72px);
        width: 100%;
    }
    margin: 0 auto;
    background-color: #e2d7b959;
}
</style>
