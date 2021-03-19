<template>
    <div>
        <div class="nav">
            <div @click="redirect('home')" class="logo">해와달인테리어</div>
            <template v-if="isDesktop">
                <div class="menu">
                    <div @click="redirect('introduction')" :class="{bold: $route.path.includes('introduction')}">소개
                    </div>
                    <div @click="redirect('portfolio')" :class="{bold: $route.path.includes('portfolio')}">포트폴리오</div>
                    <div @click="redirect('reviews')" :class="{bold: $route.path.includes('review')}">후기</div>
                    <div @click="redirect('location')" :class="{bold: $route.path.includes('location')}">위치</div>
                    <a :href="'mailto:conan.cheolmin.shin@gmail.com?subject=견적문의&body=' + emailBody">견적문의</a>
                </div>
            </template>
            <template v-else>
                <div class="menu" :class="{show: showMenu}" v-click-outside="clickOutside">
                    <div class="hamburger" :class="{'open': showMenu}" @click.stop.prevent="() => showMenu = !showMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div @click="redirect('introduction')" :class="{bold: $route.path.includes('introduction')}">소개
                    </div>
                    <div @click="redirect('portfolio')" :class="{bold: $route.path.includes('portfolio')}">포트폴리오</div>
                    <div @click="redirect('reviews')" :class="{bold: $route.path.includes('review')}">후기</div>
                    <div @click="redirect('location')" :class="{bold: $route.path.includes('location')}">위치</div>
                    <a :href="'mailto:conan.cheolmin.shin@gmail.com?subject=견적문의&body=' + emailBody">견적문의</a>
                </div>
            </template>
        </div>
        <transition name="fade" mode="out-in">
            <router-view class="view"/>
        </transition>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Wrapper extends Vue {
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

    clickOutside () {
        this.showMenu = false
    }

    async redirect(name) {
        this.showMenu = false
        if (name === 'portfolio') {
            await this.$store.dispatch('findPortfolioList', 20)
            if (this.isDesktop) await this.$store.dispatch('findPortfolio', this.products[0].productId)
        }
        await this.$router.push({name}).catch(() => {
        })
    }

    get products() {
        return this.$store.getters.products
    }

    get isDesktop() {
        return window.innerWidth > 400
    }

    beforeMount () {
        const param = this.getParam()
        if (param.path) {
            this.$router.push({name: param.path, query: param})
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
@import "src/assets/style/hamburgers.scss";
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
<style scoped lang="scss">
@import 'src/assets/style/media-query';

.hamburger {
    position: absolute;
    height: 16px;
    top: 17px;
    left: 4px
}

.nav {
    width: 80%;
    padding: 10px 10% 0 10%;
    position: fixed;
    z-index: 1;
    background-color: #efede1;
    @include desktop {
        display: flex;
        justify-content: space-between;
    }
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

    .bold {
        font-weight: bold;
        color: black;
    }
}

.menu > div, .menu > a {
    cursor: pointer;
    margin: 5px 10px 5px 15px;
    @include mobile {
        margin-right: 0;
    }
    text-decoration: none;
    color: inherit;
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

.view {
    padding-top: 50px;
    position: relative;
    width: 80%;
    @include desktop {
        height: 90vh;
        padding-top: 85px;
    }
    @include mobile {
        width: 100%;
    }
    margin: auto;
}
</style>
