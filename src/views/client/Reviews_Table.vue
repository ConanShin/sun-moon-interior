<template>
    <div class="reviews">
        <div class="review" v-for="review in reviews" @click="$router.push({name: 'review', query: {articleNumber: review.article_no, subject: review.title}})">
            <span class="title reply" v-if="review.parent_article_no">re: {{review.title}}</span>
            <span class="title" v-else>{{review.title}}</span>
            <span class="writer">{{review.writer}}</span>
        </div>
        <div class="paging">
            <span @click="search(-1)">prev</span>
            <span @click="search(+1)">next</span>
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

    async search(offset) {
        if (Number(this.page) === 1 && offset === -1) return
        const redirectPage = Number(this.page) + offset
        const length = await this.$store.dispatch('findReviews', {board: 5, page: redirectPage})
        if (length === 0) this.page = redirectPage - offset
        else await this.$router.push({name: 'reviews', query: {page: redirectPage}})

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
    }
}

</style>
