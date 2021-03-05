<template>
    <div class="reviews">
        <div class="slide desktop" @wheel="replaceVerticalScrollByHorizontal">
            <img v-if="review.images[0]" class="review" v-for="review in reviews" :src="review.images[0]"/>
        </div>
        <div class="slide mobile" @scroll="loadMoreOnEdgeVertical">
            <img v-if="review.images[0]" class="review" v-for="review in reviews" :src="review.images[0]"/>
        </div>
        <div class="loading" :class="{show: loading}">
            <div>loading</div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Review extends Vue {
    loading = false
    page = 1

    get reviews() {
        return this.$store.getters.reviews
    }

    get loadingFinished() {
        return this.$store.getters.reviewsFinishedLoading
    }

    get images() {
        return this.$store.getters.reviews.map(review => {
            return {
                thumb: review.images[0],
                src: review.images[0],
                caption: review.title
            }
        })
    }

    async right() {
        this.page = this.page + 1
        await this.$store.dispatch('findReviews', {board: 5, page: this.page})
    }

    loadMoreOnEdgeHorizontal() {
        if (this.loadingFinished) return

        const slide = this.$el.querySelector('.slide.desktop')
        if (this.throttle) return
        this.throttle = setTimeout(async () => {
            this.throttle = null

            if (slide.scrollLeft + slide.clientWidth >= slide.scrollWidth - 50) {
                this.loading = true
                await this.right()
                setTimeout(() => {
                    this.loading = false
                }, 1000)
            }

            this.$forceUpdate()
        }, 100)
    }

    loadMoreOnEdgeVertical() {
        if (this.loadingFinished) return

        const slide = this.$el.querySelector('.slide.mobile')
        if (this.throttle) return
        this.throttle = setTimeout(async () => {
            this.throttle = null
            if (slide.scrollTop + slide.clientHeight >= slide.scrollHeight) {
                this.loading = true
                await this.right()
                setTimeout(() => {
                    this.loading = false
                }, 1000)
            }

            this.$forceUpdate()
        }, 200)
    }

    replaceVerticalScrollByHorizontal(event) {
        const slide = this.$el.querySelector('.slide')
        if (event.deltaY !== 0) {
            slide.scroll(slide.scrollLeft + event.deltaY, 0)
            this.loadMoreOnEdgeHorizontal()
            event.preventDefault()
        }
    }

    beforeMount() {
        this.$store.dispatch('findReviews', {board: 5, page: this.page})
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';

$theme: #6b6a6a;

.reviews {
    width: 100%;

    .desktop {
        @include mobile {
            display: none;
        }
    }
    .mobile {
        @include desktop {
            display: none;
        }
    }
}

.slide {
    height: 100%;
    overflow: auto;
    @include mobile {
        width: 80%;
        margin: auto;
    }
    @include desktop {
        display: flex;
    }
}

.loading {
    position: absolute;
    transition: all 0.3s ease-in;
    @include desktop {
        right: -50px;
        bottom: 50%;
        background: black;
        padding: 4px;
        opacity: 0.5;
        color: white;
        &.show {
            right: 10px;
        }
    }
    @include mobile {
        text-align: center;
        bottom: -50px;
        &.show {
            bottom: 40px;
        }
        width: 100%;
        & > div {
            display: inline-block;
            background: black;
            opacity: 0.5;
            color: white;
            padding: 7px;
        }
    }
}

.review {
    @include desktop {
        margin-right: 10px;
        margin-top: 5%;
        height: 40vw;
    }
    @include mobile {
        text-align: center;
        width: 100%;
        height: auto;
    }
    height: fit-content;
}
</style>
