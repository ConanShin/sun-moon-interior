<template>
    <div class="reviews">
        <div class="review" v-for="review in reviews" @click="$router.push({name: 'review', query: {link: review.link}})">
            <span class="title reply" v-if="review.is_reply">re: {{review.title}}</span>
            <span class="title" v-else>{{review.title}}</span>
            <span class="writer">{{review.writer}}</span>
        </div>
        <div class="paging">
            <span @click="search(-1)"><</span>
            <span v-for="index in pageLength" :class="{bold: index == page}" @click="searchPage(index)">{{index}}</span>
            <span @click="search(+1)">></span>
            <span @click="write">write</span>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Reviews extends Vue {
    @Prop() page

    get reviews() {
        return this.$store.getters.reviews
    }

    get pageLength() {
        return this.$store.getters.pageLength
    }

    async searchPage(pageNumber) {
        await this.$store.dispatch('findReviews', {board: 5, page: pageNumber})
        await this.$router.push({name: 'reviews', query: {page: pageNumber}})
    }

    async search(offset) {
        if (Number(this.page) === 1 && offset === -1) return
        if (Number(this.page) === this.pageLength && offset === 1) return
        const redirectPage = Number(this.page) + offset
        await this.searchPage(redirectPage)
    }

    write() {
        this.$router.push({name: 'writeReview'})
    }

    beforeMount() {
        this.$store.dispatch('findReviews', {board: 5, page: this.page})
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
$theme: #655e5e;

.review {
    width: 90%;
    border: 1px solid $theme;
    margin: 2px auto;
    padding: 2px;
    display: flex;
    justify-content: space-between;
}

.title {
    cursor: pointer;
    width: 500px;

    @include mobile {
        width: 200px;
    }
    &.reply {
        padding-left: 10px;
    }
}
.paging {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    span {
        cursor: pointer;
        font-weight: lighter;
        &.bold {
            font-weight: bolder;
            text-shadow: 1px 2px 3px #000000c4;
        }
    }
}

</style>
