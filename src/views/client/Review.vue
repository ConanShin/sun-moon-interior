<template>
    <div class="reviews" :class="{show: reviews}">
        <div class="header">
            <div class="even"></div>
            <div class="even menu-name">시공후기</div>
            <div class="even write button" @click="$router.push({name: 'writeArticle', query: {from: 'review'}}).catch(() => {})">작성하기</div>
        </div>
        <board :list="reviews" :page="page" :page-length="pageLength" @search="searchPage"></board>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {freeBoards} from '@/cafe24info'
import Board from "@/views/client/components/Board";
@Component({
    components: {Board}
})
export default class Review extends Vue {
    @Prop() page
    reviews = null
    pageLength = 0

    get isDesktop () {
        return window.innerWidth > 460
    }

    async searchPage(pageNumber) {
        const {data: {articles, pageLength}} = await this.$store.dispatch('findArticles', {board: freeBoards['review'], page: pageNumber})
        this.reviews = articles
        this.pageLength = pageLength
        await this.$router.push({name: 'review', query: {page: pageNumber}}).catch(() => {})
    }

    async beforeMount() {
        const {data: {articles, pageLength}} = await this.$store.dispatch('findArticles', {board: freeBoards['review'], page: this.page})
        this.reviews = articles
        this.pageLength = pageLength
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;

    .menu-name {
        width: 100px !important;
        margin-top: 0;
    }

    .even {
        display: inline-flex;
        width: 50px;
        height: 25px;
        @include desktop {
            width: 80px;
            height: 30px;
        }
        align-items: center;
        justify-content: center;
    }
}

.write.button {
    position: relative;
    border: 1px solid $dark-theme;
    background-color:$dark-theme;
    color: $bright-theme;
    font-size: 10px;
    @include desktop {
        margin-left: auto;
        text-align: right;
        font-size: 15px;
    }
    @include mobile {
    }
}

.reviews {
    opacity: 0;
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
}
</style>
