<template>
    <div class="nav">
        <div @click="redirect('home')" class="logo">
                <span v-if="isDesktop">
                    <div class="big">해와달인테리어</div>
                    <div class="small">Convenient, Consistent and Cozy</div>
                </span>
            <span v-else>해와달인테리어</span>
        </div>
        <template v-if="isDesktop">
            <div class="menu">
<!--                <div class="item" v-for="menu in menus" @click="redirect(menu.path)" :class="{bold: $route.path.includes(menu.path)}">{{ menu.name }}</div>-->
                <a class="item" v-for="menu in menus" :href="'/' + menu.path" :class="{bold: $route.path.includes(menu.path)}">{{ menu.name }}</a>
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
<!--                <div class="item" v-for="menu in menus" @click="redirect(menu.path)" :class="{bold: $route.path.includes(menu.path)}">{{ menu.name }}</div>-->
                <a class="item" v-for="menu in menus" :href="'/' + menu.path" :class="{bold: $route.path.includes(menu.path)}">{{ menu.name }}</a>
            </div>
        </template>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Menu extends Vue {
    showMenu = false
    menus = [
        {name: '소개', path: 'about'},
        {name: '포트폴리오', path: 'portfolio'},
        {name: '견적의뢰', path: 'contact'},
        {name: '시공후기', path: 'review'},
        {name: '문의하기', path: 'qna'},
    ]

    async redirect(name) {
        this.showMenu = false
        await this.$router.push({name}).catch(() => {})
    }

    get isDesktop() {
        return window.innerWidth > 460
    }

    clickOutside() {
        this.showMenu = false
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

.nav {
    width: 80%;
    min-height: $nav-height-mobile;
    position: fixed;
    z-index: 1;
    background-color: $bright-theme;
    border-bottom: 1px solid #655e5e14;
    @include desktop {
        //padding: 0 calc((100vw - min(80vw, #{$view-max-width})) / 2); IE min지원 안함
        padding: 0 calc((100vw - #{$view-max-width}) / 2);
        max-width: $view-max-width;
        min-height: $nav-height-desktop;
        opacity: 0.7;
        display: flex;
        justify-content: space-between;
    }
    @include mobile {
        padding: 0 10%;
    }
}

.logo {
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    @include mobile {
        width: fit-content;
        margin: 20px auto;
    }
    @include desktop {
        font-size: 30px;
        padding: 18px 0;
    }

    .big {
        font-size: 40px;
        letter-spacing: 18px;
    }

    .small {
        font-size: 18px;
        letter-spacing: 2px;
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
            height: 130px;
        }
    }

    .hamburger-wrapper {
        position: absolute;
        height: 15px;
        width: 15px;
        top: 0;
        left: 0;
        padding: 24px 18px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    .bold {
        font-weight: bold;
        color: black;
    }
}

.menu > .item {
    cursor: pointer;
    padding: 5px;
    text-align: center;
    display: block;
    @include mobile {
        margin-right: 0;
        position: relative;
        z-index: 1;
        background: $bright-theme;
    }
    text-decoration: none;
    color: inherit;
}
</style>
