<template>
    <div :class="{show: listShow}">
        <transition-group name="fade">
            <img v-for="(product, index) in imageList" :src="product.list_image" @click="redirect(product)" :key="product.product_no" :alt="product.product_name"/>
        </transition-group>
        <div v-if="!isIE" class="slider-navigation">
            <span v-for="(item, index) in products" class="dot" :class="{colored: index === viewingIndex}" :key="index"></span>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import {categories} from "@/cafe24info";

@Component
export default class Home extends Vue {
    listShow = false
    throttle = null
    viewingIndex = 0
    imageList = []

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

    get isIE() {
        return /*@cc_on!@*/false || !!document.documentMode
    }

    get isDesktop() {
        return window.innerWidth > 460
    }

    get products() {
        return this.$store.getters.products
    }

    @Watch('products')
    productsChanged(products) {
        products.forEach((product, index) => {
            setTimeout(() => {
                this.imageList.push(product)
            }, index * 300)
        })
    }

    async redirect(product) {
        // this.$router.push({name: 'portfolio', query: {product_no: product.product_no}}).then().catch(() => {})
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
        return Math.max(0, Math.min(Math.floor(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100 / avgHeight), imageCount - 1))
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

img {
    width: 80%;
    max-height: 800px;
    margin: 0 auto 7px auto;
    &:last-of-type {
      margin-bottom: 0;
    }
    display: block;
    @include mobile {
        width: 100%;
    }
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
    left: calc((100vw - min(64vw, #{$view-max-width * 0.8})) / 2); // 80 * 80% = 64
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
