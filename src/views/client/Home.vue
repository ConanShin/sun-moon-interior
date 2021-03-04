<template>
    <div class="scroll" @scroll="colorDot">
        <img v-for="product in products" :src="product.list_image"/>
        <div class="slider-navigation">
            <span v-for="(item, index) in products" class="dot" :class="{colored: index === viewingIndex}"
                  :key="index"></span>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    throttle = null
    viewingIndex = 0

    beforeMount() {
        this.$store.dispatch('findProducts')
    }

    get products() {
        return this.$store.getters.products
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

$theme: #6b6a6a;

img {
    width: 100%;
}

.scroll {
    overflow: auto;
}

.slider-navigation {
    @include mobile {
        display: none;
    }
    top: 60px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 4px;

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
