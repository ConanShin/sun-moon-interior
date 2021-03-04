<template>
    <div class="reviews">
        <div class="slide desktop" @wheel="replaceVerticalScrollByHorizontal">
            <div class="review" v-for="review in reviews">
                <img :src="review.images[0]"/>
            </div>
            <div class="loading" v-if="loading">loading</div>
        </div>
        <div class="slide mobile" @wheel="loadMoreOnEdgeVertical">
            <div class="review" v-for="review in reviews">
                <img :src="review.images[0]"/>
            </div>
            <div class="loading" v-if="loading">loading</div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Review extends Vue {
    loading = true
    page = 1

    get reviews() {
        return this.$store.getters.reviews
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
        const slide = this.$el.querySelector('.slide.desktop')
        if (this.throttle) return
        this.throttle = setTimeout(async () => {
            this.throttle = null

            if (slide.scrollLeft + slide.clientWidth >= slide.scrollWidth - 50) {
                this.loading = true
                await this.right()
                this.loading = false
                slide.scroll(slide.scrollLeft + 100, 0)
            }

            this.$forceUpdate()
        }, 200)
    }

    loadMoreOnEdgeVertical() {
        const slide = this.$el.querySelector('.slide.mobile')
        if (this.throttle) return
        this.throttle = setTimeout(async () => {
            this.throttle = null

            if (slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 50) {
                console.log('reach end')
                this.loading = true
                await this.right()
                this.loading = false
                slide.scroll(0, slide.scrollTop + 100)
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
    height: 100vw;
    overflow-x: auto;
    @include desktop {
        display: flex;
    }
}

.loading {
    position: absolute;
    right: 10px;
    top: 50%;
}

.review {
    @include desktop {
        margin-right: 10px;
    }
    @include mobile {
        text-align: center;
    }
    height: fit-content;

    img {
        @include desktop {
            height: 40vw;
        }
        @include mobile {
            width: 80%;
        }
    }
}
</style>
