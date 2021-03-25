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

@Component
export default class Home extends Vue {
    listShow = false
    throttle = null
    viewingIndex = 0

    async beforeMount() {
        const HOME_CATEGORY_ID = 23
        await this.$store.dispatch('findPortfolioList', HOME_CATEGORY_ID)
        this.listShow = true
    }

    mounted () {
        if (this.isDesktop) return document.body.addEventListener('scroll', this.colorDot)
        window.addEventListener('scroll', this.colorDot)
    }
    destroy() {
        if (this.isDesktop) return document.body.removeEventListener('scroll', this.colorDot)
        window.removeEventListener('scroll', this.colorDot)
    }

    get isDesktop() {
        return window.innerWidth > 400
    }

    get products() {
        return this.$store.getters.products
    }

    async redirect (product) {
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
        const pivotHeight = this.isDesktop ? document.body.scrollHeight : window.innerHeight
        const scrollHeight = this.isDesktop ? document.body.scrollTop : window.scrollY
        const avgHeight = pivotHeight / this.$el.querySelectorAll('img').length
        return Math.ceil(scrollHeight / avgHeight)
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
    top: 95px;
    left: 10%;
    @include mobile {
        top: 57px;
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
