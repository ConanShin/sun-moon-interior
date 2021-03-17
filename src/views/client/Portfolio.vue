<template>
    <div class="portfolio">
        <div v-if="isDesktop || !$route.fullPath.includes('productId')" class="list">
            <img v-for="product in products" @click="findProduct(product.productId)" :class="{bold: product.productId === (portfolio && portfolio.product_no)}" :src="product.image"/>
        </div>
        <div v-if="$route.fullPath.includes('productId')" class="content" v-html="portfolio && portfolio.description"></div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {titleToPy} from "@/components/common";

@Component
export default class Portfolio extends Vue {
    @Prop() productId

    get products () {
        return this.$store.getters.products
    }

    get py () {
        return this.$store.getters.py
    }

    get portfolio () {
        return this.$store.getters.portfolio
    }

    get isDesktop () {
        return window.innerWidth > 400
    }

    async findProduct (productId) {
        await this.$store.dispatch('findPortfolio', productId)
        await this.$router.push({name: 'portfolio', query: {productId: productId}})
    }

    async beforeMount () {
        if (this.productId) {
            await this.$store.dispatch('findPortfolio', this.productId)
            await this.$store.dispatch('findPortfolioList', titleToPy(this.portfolio.product_name))
        } else {
          await this.$store.dispatch('findPortfolioList', this.py)
          if (this.isDesktop) await this.$store.dispatch('findPortfolio', this.products[0].productId)
        }
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
        width: 100%;
        padding-bottom: 3px;
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
    ::v-deep p {
    }

    ::v-deep img {
        width: 100%;
        max-width: 1999px;
    }
}
</style>