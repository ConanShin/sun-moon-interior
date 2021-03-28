<template>
    <div :class="{show: listShow}">
        <img v-for="product in products" :src="product.list_image" @click="redirect(product)"/>
        <div class="slider-navigation">
            <span v-for="(item, index) in products" class="dot" :class="{colored: index === viewingIndex}"
                  :key="index"></span>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import {productToCategory} from "@/components/common";
import {categories} from "@/cafe24info";

@Component
export default class Home extends Vue {
    listShow = false
    throttle = null
    viewingIndex = 0

    async beforeMount() {
        await this.$store.dispatch('findPortfolioList', categories['home'])
        this.listShow = true
    }

    mounted() {
        window.addEventListener('scroll', this.colorDot)
    }

    destroy() {
        window.removeEventListener('scroll', this.colorDot)
    }

    get isDesktop() {
        return window.innerWidth > 460
    }

    get products() {
        return this.$store.getters.products
    }

    async redirect(product) {
        this.$router.push({name: 'portfolio', query: {product_no: product.product_no}}).then().catch(() => {})
    }

    colorDot() {
        if (this.throttle) return
        this.throttle = setTimeout(() => {
            this.throttle = null
            this.viewingIndex = this.indexByScrollPosition()
            this.$forceUpdate()
        }, 200)
    }

    indexByScrollPosition() {
        const imageCount = this.$el.querySelectorAll('img').length
        const avgHeight = 100 / imageCount
        return Math.min(Math.floor(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100 / avgHeight), imageCount - 1)
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

img {
    width: 100%;
    margin: auto;
    display: block;
}

.scroll {
    overflow: auto;
    opacity: 0;

    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
}

.slider-navigation {
    top: 156px;
    left: calc((100vw - min(80vw, #{$view-max-width})) / 2);
    @include mobile {
        top: 64px;
        left: 0;
    }

    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .dot {
        display: inline-block;
        margin: 5px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: $transparent-dark-theme;

        &.colored {
            background-color: $dark-theme;
            width: 7px;
            height: 7px;
        }
    }
}
</style>
