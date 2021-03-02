<template>
    <div class="scroll" @scroll="colorDot">
        <img v-for="product in products" :src="product.list_image"/>
        <div class="slider-navigation">
            <span v-for="(item, index) in products" class="dot" :class="{colored: index === viewingIndex}" :key="index"></span>
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

        colorDot () {
            if (this.throttle) return
            this.throttle = setTimeout(() => {
                this.throttle = null
                this.viewingIndex = this.indexByScrollPosition(document.querySelector('.scroll'))
                this.$forceUpdate()
            }, 200)
        }

        indexByScrollPosition (slider) {
            const height = slider.offsetHeight
            const yPosition = slider.scrollTop
            return Math.round(yPosition / height)
        }
    }
</script>

<style scoped lang="scss">
    @import 'src/assets/style/media-query';

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
            background-color: lightgray;

            &.colored {
                width: 7px;
                height: 7px;
            }
        }
    }
</style>
