<template>
    <div>
        <nav>
            <div @click="redirect('home')" class="logo">해와달인테리어</div>
            <div class="menu">
                <div @click="redirect('introduction')" :class="{bold: $route.path.includes('introduction')}">소개</div>
                <div @click="redirect('portfolio')" :class="{bold: $route.path.includes('portfolio')}">포트폴리오</div>
                <div @click="redirect('reviews')" :class="{bold: $route.path.includes('review')}">후기</div>
                <div @click="redirect('location')" :class="{bold: $route.path.includes('location')}">위치</div>
                <a :href="'mailto:conan.cheolmin.shin@gmail.com?subject=견적문의&body=' + emailBody">견적문의</a>
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
    emailBody = `
성함:%0d%0a%0d%0a
휴대폰번호:%0d%0a%0d%0a
공사할곳 주소:%0d%0a%0d%0a
평수:%0d%0a%0d%0a
부분공사or전체공사(한가지선택):%0d%0a%0d%0a
예산금액:%0d%0a%0d%0a
공사희망일:%0d%0a%0d%0a
이메일:%0d%0a%0d%0a
기타문의사항:
    `
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
    width: 80%;
    padding: 10px 10% 0 10%;
    position: sticky;
}

.menu {
    display: flex;
    align-items: center;
    justify-content: center;
    .bold {
        font-weight: bold;
        color: black;
    }
}

.menu > div, .menu > a {
    cursor: pointer;
    margin: 5px 10px 5px 0;
    text-decoration: none;
    color: inherit;
}

.logo {
    font-size: 18px;
    text-align: center;
    padding: 10px 0;
}

.submenu {
    overflow: hidden;
    height: 0;
    width: 80%;
    padding: 0 10%;
    transition: height 0.3s ease-in;
    display: flex;
    div {
        margin-right: 10px;
        cursor: pointer;
        &.bold {
            font-weight: bold;
            color: black;
        }
    }
    @include mobile {
        justify-content: center;
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
        height: calc(100vh - 77px);
        width: 100%;
    }
    margin: 0 auto;
}
</style>
