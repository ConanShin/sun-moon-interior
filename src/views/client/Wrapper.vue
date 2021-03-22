<template>
    <div>
        <Cover v-if="!isDesktop && !$store.getters.coverHidden"/>
        <template v-else>
            <Menu/>
            <transition name="fade" mode="out-in">
                <router-view class="view"/>
            </transition>
            <Footer class="footer"/>
        </template>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import Menu from "@/views/client/Menu";
import Cover from "@/views/Cover";
import Footer from "@/views/client/Footer";
@Component({
    components: {Menu, Cover, Footer}
})
export default class Wrapper extends Vue {
    get products() {
        return this.$store.getters.products
    }

    get isDesktop () {
        return window.innerWidth > 400
    }

    async beforeMount () {
        const param = this.getParam()
        if (param.path) {
            await this.$router.push({name: param.path, query: param}).catch(() => {})
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

.menu-name {
    position: absolute;
    top: 65px;
    left: 39vw;
}

.view {
    min-height: calc(100vh - 44px);
    padding-top: 50px;
    position: relative;
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
