<template>
    <div class="scroll" @scroll="colorDot" :class="{show: listShow}">
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

    get products() {
        return this.$store.getters.products
    }

    async redirect (product) {
        this.$router.push({name: encodeURIComponent('포트폴리오'), query: {product_no: product.product_no}}).then().catch(() => {})
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
        const index = Array.from(this.$el.querySelectorAll('img')).findIndex(element => {
            const hiddenArea = element.getBoundingClientRect().y
            const elementHeight = element.height
            if (elementHeight * 3 / 4 < hiddenArea) return true
        })

        return index === -1 ? this.products.length - 1 : index - 1
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';

$theme: #655e5e;

img {
    width: 100%;
    cursor: pointer;
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
    @include mobile {
        display: none;
    }
    top: 80px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -20px;

    .dot {
        display: inline-block;
        margin: 5px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: darkgray;

        &.colored {
            background-color: $theme;
            width: 7px;
            height: 7px;
        }
    }
}
</style>
