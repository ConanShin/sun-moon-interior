<template>
    <div class="portfolio">
        <div>
            <div class="menu-name">포트폴리오</div>
            <div class="submenu" :class="{show: $route.path.includes('portfolio')}">
                <div v-for="(categoryId, categoryName) in portfolioSubmenus" @click="redirectSubmenu(categoryId)" :class="{bold: py === categoryId}">{{categoryName}}</div>
            </div>
            <div v-if="!$route.fullPath.includes('product_no')" class="list" :class="{show: listShow}">
                <template v-for="product in products">
                    <img class="portfolio-image" @click="findProduct(product.product_no)" :src="product.list_image.replace(/sun-mooninterior.com/g,'old.sun-mooninterior.com')" :alt="product.product_name"/>
                </template>
            </div>
        </div>
        <template v-if="$route.fullPath.includes('product_no') && portfolio">
            <div class="product-name">{{portfolio.product_name}}</div>
            <div class="content" v-html="portfolio.description"></div>
        </template>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {productToCategory, productToPy, pyToCategory} from "@/components/common";
import {categories} from '@/cafe24info'

@Component
export default class Portfolio extends Vue {
    @Prop() product_no
    listShow = false
    portfolioSubmenus = categories['portfolio']

    get products () {
        return this.$store.getters.products
    }

    get py () {
        return this.$store.getters.py
    }

    get portfolio () {
        return this.$store.getters.portfolio
    }

    async findProduct (product_no) {
        await this.$store.dispatch('findPortfolio', product_no)
        await this.$store.commit('py', productToCategory(this.portfolio))
        await this.$router.push({name: 'portfolio', query: {product_no}}).then().catch(() => {})
    }

    async redirectSubmenu(categoryId) {
        this.listShow = false
        await this.$router.push({name: 'portfolio', query: {}}).then().catch(() => {})
        this.$store.commit('py', categoryId)
        await this.$store.dispatch('findPortfolioList', categoryId)
        this.listShow = true

    }

    async beforeMount () {
        if (this.product_no) {
            await this.$store.dispatch('findPortfolio', this.product_no)
            await this.$store.dispatch('findPortfolioList', productToCategory(this.portfolio))
        } else {
            await this.$store.dispatch('findPortfolioList', this.py)
        }
        this.listShow = true
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
.portfolio {
    .product-name {
        text-align: center;
        font-size: 14px;
        @include desktop {
            font-size: 24px;
        }
        margin-top: 30px;
    }
}
.list {
    overflow-y: auto;
    height: inherit;
    opacity: 0;

    width: 100%;
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
    img {
        width: 100%;
        @include desktop {
            width: 49%;
            height: 400px;
            margin-right: 10px;
        }
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
    font-size: 20px;
    justify-content: space-around;
    margin: 10px 0;

    div {
        margin-right: 10px;
        cursor: pointer;

        &.bold {
            font-weight: bold;
            color: black;
        }
    }

    @include mobile {
        justify-content: space-evenly;
        padding-top: 25px;
        font-size: 12px;
    }
}
</style>