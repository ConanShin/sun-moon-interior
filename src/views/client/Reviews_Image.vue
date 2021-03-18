<template>
    <div class="reviews">
        <div class="slide desktop" @wheel="replaceVerticalScrollByHorizontal">
            <div v-if="review.attach_file_urls.length > 0" class="review" v-for="review in reviews">
                <img @click="$router.push({name: 'review', query: {articleNumber: review.article_no, subject: review.title}})" :src="review.attach_file_urls[0].url"/>
                <div class="writer">{{review.writer}}님 후기</div>
            </div>
        </div>
        <div class="slide mobile">
            <div v-if="review.attach_file_urls.length > 0" class="review" v-for="review in reviews">
                <img @click="$router.push({name: 'review', query: {articleNumber: review.article_no, subject: review.title}})" :src="review.attach_file_urls[0].url"/>
                <div class="writer">{{review.writer}}님 후기</div>
            </div>
        </div>
        <div class="loading" :class="{show: loading}">
            <div>loading</div>
        </div>
        <div class="new-review" @click="newTab">+<span>후기작성</span></div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Reviews extends Vue {
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

    get isDesktop() {
        return window.innerWidth > 400
    }

    async right() {
        this.page = this.page + 1
        return this.$store.dispatch('findReviews', {board: 5, page: this.page})
    }

    newTab() {
        window.open('http://sun-mooninterior.com/board/free/list.html?board_no=5')
    }

    mounted () {
        if (!this.isDesktop) document.addEventListener('scroll', this.loadMoreOnEdgeVertical)
    }

    loadMoreOnEdgeHorizontal() {
        if (this.loadingFinished) return

        const slide = document.querySelector('html')
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

        const slide = document.querySelector('html')
        if (this.throttle) return
        this.throttle = setTimeout(async () => {
            this.throttle = null
            if (slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 150) {
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
        const slide = document.querySelector('html')
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

$theme: #655e5e;

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
    @include mobile {
        margin: auto;
    }
    @include desktop {
        display: flex;
    }
}

.loading {
    position: fixed;
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
            bottom: 10%;
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
    cursor: pointer;
    position: relative;
    @include desktop {
        margin-right: 10px;
        margin-top: 3%;
        img {
            height: 40vw;
        }
    }
    @include mobile {
        img {
            text-align: center;
            width: 100%;
            height: auto;
        }
    }
    .writer {
        writing-mode: vertical-rl;
        text-orientation: upright;
        position: absolute;
        color: wheat;
        right: 10px;
        top: 10px;
        text-shadow: 0px 0px 10px black;
    }
    height: fit-content;
}

.new-review {
    position: fixed;
    right: 10%;
    bottom: 15%;
    color: wheat;
    font-size: 20px;
    text-shadow: 0 0 10px black;
    display: flex;
    align-items: center;
    cursor: pointer;;
    span {
        font-size: 10px;
        margin-top: 4px;
        margin-left: 4px;
    }

    @include mobile {
        left: 15%;
        bottom: 10%;
    }
}
</style>
