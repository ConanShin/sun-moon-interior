<template>
    <div class="portfolio">
        <div>
            <div class="submenu" :class="{show: $route.path.includes('portfolio')}">
                <div @click="redirectSubmenu(20)" :class="{bold: Math.floor($store.getters.py/10) === 2}">20py</div>
                <div @click="redirectSubmenu(30)" :class="{bold: Math.floor($store.getters.py/10) === 3}">30py</div>
                <div @click="redirectSubmenu(40)" :class="{bold: Math.floor($store.getters.py/10) === 4}">40py</div>
                <div @click="redirectSubmenu(50)" :class="{bold: Math.floor($store.getters.py/10) === 5}">50py</div>
            </div>
            <div v-if="isDesktop || !$route.fullPath.includes('productId')" class="list" :class="{show: listShow}">
                <img v-for="product in products" @click="findProduct(product.productId)" :class="{bold: product.productId === (portfolio && portfolio.product_no)}" :src="product.image"/>
            </div>
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
    listShow = false

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
        await this.$router.push({name: 'portfolio', query: {productId: productId}}).then().catch(() => {})
    }

    async redirectSubmenu(py) {
        this.listShow = false
        if (!this.isDesktop) await this.$router.push({name: 'portfolio', query: {}}).then().catch(() => {})
        await this.$store.dispatch('findPortfolioList', py)
        this.listShow = true

    }

    async beforeMount () {
        if (this.productId) {
            await this.$store.dispatch('findPortfolio', this.productId)
            await this.$store.dispatch('findPortfolioList', titleToPy(this.portfolio.product_name))
        } else {
            await this.$store.dispatch('findPortfolioList', this.py)
            if (this.isDesktop) await this.findProduct(this.products[0].productId)
        }
        this.listShow = true
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
    opacity: 0;

    @include mobile {
        width: 100%;
    }
    @include desktop {
        width: 400px;
        margin-right: 20px;
    }
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
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

.submenu {
    display: flex;
    padding-bottom: 3px;

    div {
        margin-right: 10px;
        cursor: pointer;

        &.bold {
            font-weight: bold;
            color: black;
        }
    }

    @include mobile {
        justify-content: center;
    }
}
</style>