<template>
    <div class="nav">
        <div @click="redirect('home')" class="logo">해와달인테리어</div>
        <template v-if="isDesktop">
            <div class="menu">
                <div class="item" v-for="(menu, index) in menus" v-if="index !== 0" @click="redirect(menu.uri)" :class="{bold: $route.path.includes(menu.uri)}">{{menu.category_name}}</div>
                <div class="item" @click="redirect('introduction')" :class="{bold: $route.path.includes('introduction')}">소개</div>
                <div class="item" @click="redirect('reviews')" :class="{bold: $route.path.includes('review')}">후기</div>
                <div class="item" @click="redirect('location')" :class="{bold: $route.path.includes('location')}">위치</div>
                <a class="item" :href="'mailto:conan.cheolmin.shin@gmail.com?subject=견적문의&body=' + emailBody">견적문의</a>
            </div>
        </template>
        <template v-else>
            <div class="menu" :class="{show: showMenu}" v-click-outside="clickOutside">
                <div class="hamburger-wrapper" @click.stop.prevent="() => showMenu = !showMenu">
                    <div class="hamburger" :class="{'open': showMenu}">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="item" v-for="(menu, index) in menus" v-if="index !== 0" @click="redirect(menu.uri)" :class="{bold: $route.path.includes(menu.uri)}">{{menu.category_name}}</div>
                <div class="item" @click="redirect('introduction')" :class="{bold: $route.path.includes('introduction')}">소개</div>
                <div class="item" @click="redirect('reviews')" :class="{bold: $route.path.includes('review')}">후기</div>
                <div class="item" @click="redirect('location')" :class="{bold: $route.path.includes('location')}">위치</div>
                <a class="item" :href="'mailto:conan.cheolmin.shin@gmail.com?subject=견적문의&body=' + emailBody">견적문의</a>
            </div>
        </template>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Menu extends Vue {
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
    showMenu = false
    menus = []
    async redirect(name) {
        this.showMenu = false
        if (name === 'portfolio') {
            await this.$store.dispatch('findPortfolioList', 20)
            if (this.isDesktop) await this.$store.dispatch('findPortfolio', this.products[0].product_no)
        }
        await this.$router.push({name}).catch(() => {
        })
    }

    get isDesktop() {
        return window.innerWidth > 400
    }

    clickOutside () {
        this.showMenu = false
    }

    async beforeMount () {
        this.menus = (await this.$store.dispatch('findCategories')).data
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
.nav {
    width: 80%;
    padding: 10px 10% 0 10%;
    position: fixed;
    z-index: 1;
    background-color: #efede1;
    opacity: 0.7;
    @include desktop {
        display: flex;
        justify-content: space-between;
    }
}

.logo {
    font-size: 18px;
    padding: 6px 0;
    @include mobile {
        width: fit-content;
        margin: auto;
    }
    @include desktop {
        font-size: 30px;
        padding: 18px 0;
    }
    text-align: center;
    cursor: pointer;
}

.menu {
    @include desktop {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    @include mobile {
        overflow-y: hidden;
        height: 0;
        transition: height 0.3s ease-in;
        &.show {
            height: 108px;
        }
    }

    .hamburger-wrapper {
        position: absolute;
        height: 15px;
        width: 15px;
        top: 0;
        left: 0;
        padding: 18px;
        -webkit-tap-highlight-color: rgba(0,0,0,0)
    }

    .bold {
        font-weight: bold;
        color: black;
    }
}

.menu > .item {
    cursor: pointer;
    margin: 5px 10px 5px 15px;
    @include mobile {
        margin-right: 0;
        position: relative;
        z-index: 1;
        background: #efede1;
    }
    text-decoration: none;
    color: inherit;
}
</style>