<template>
    <div>
        <Cover v-if="!isDesktop && !$store.getters.coverHidden"/>
        <template v-else>
            <Menu/>
            <transition name="fade" mode="out-in">
                <router-view class="view"/>
            </transition>
            <FooterFixed class="footer"/>
        </template>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import Menu from "@/views/client/Menu";
import Cover from "@/views/Cover";
import Footer from "@/views/client/Footer";
import FooterFixed from "@/views/client/FooterFixed";
@Component({
    components: {FooterFixed, Menu, Cover, Footer}
})
export default class Wrapper extends Vue {
    get products() {
        return this.$store.getters.products
    }

    get isDesktop () {
        return window.innerWidth > 460
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
@import 'src/assets/style/common';

.view {
    max-width: $view-max-width;
    margin: auto;
    position: relative;
    @include desktop {
        min-height: calc(100vh - #{$nav-height-desktop + 139});
        width: 80%;
        padding-top: $nav-height-desktop;
    }
    @include mobile {
        min-height: calc(100vh - #{$nav-height-mobile + 130});
        width: 100%;
        padding-top: $nav-height-mobile;
    }
}
</style>
