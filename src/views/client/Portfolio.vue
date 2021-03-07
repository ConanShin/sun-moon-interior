<template>
    <div class="portfolio">
        <div v-if="isDesktop || !portfolio.description" class="list">
            <img v-for="product in products" @click="findProduct(product.productId)" :class="{bold: product.productId === portfolio.product_no}" :src="product.image"/>
        </div>
        <div class="content" v-html="portfolio.description"></div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Portfolio extends Vue {
    get products () {
        return this.$store.getters.products
    }

    get portfolio () {
        // if (!this.isDesktop)
        return this.$store.getters.portfolio
    }

    get isDesktop () {
        return window.innerWidth > 400
    }

    async findProduct (productId) {
        await this.$store.dispatch('findPortfolio', productId)
    }

    async beforeMount () {
        await this.$store.dispatch('findPortfolioList', 20)
        if (this.isDesktop) await this.$store.dispatch('findPortfolio', this.products[0].productId)
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
.portfolio {
    @include desktop {
        display: flex;
    }
}
.list {
    overflow-y: auto;
    display: inline-flex;
    flex-direction: column;
    height: inherit;
    @include mobile {
        width: 100%;
    }
    @include desktop {
        width: 400px;
        margin-right: 20px;
    }
    img {
        padding: 6px 0;
        cursor: pointer;
    }
    .bold {
        font-weight: bold;
    }
}
.content {
    overflow-y: auto;
    overflow-x: hidden;
    width: -webkit-fill-available;
    height: inherit;
    ::v-deep img {
        width: 100%;
        max-width: 1999px;
    }
}
</style>