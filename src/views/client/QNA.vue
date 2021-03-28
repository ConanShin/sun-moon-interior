<template>
    <div class="qna":class="{show: articles}">
        <div class="header">
            <div class="even"></div>
            <div class="even menu-name">문의하기</div>
            <div class="even write button" @click="$router.push({name: 'writeArticle', query: {from: 'qna'}})">작성하기</div>
        </div>
        <board :list="articles" :page="page" :page-length="pageLength" @search="searchPage"></board>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {freeBoards} from "@/cafe24info";
import Board from "@/views/client/components/Board";
@Component({
    components: {Board}
})
export default class QNA extends Vue {
    @Prop() page
    articles = null
    pageLength = 0

    async searchPage(pageNumber) {
        const {data: {articles, pageLength}} = await this.$store.dispatch('findArticles', {board: freeBoards['qna'], page: pageNumber})
        this.articles = articles
        this.pageLength = pageLength
        await this.$router.push({name: 'qna', query: {page: pageNumber}}).catch(() => {})
    }

    async beforeMount() {
        const {data: {articles, pageLength}} =  await this.$store.dispatch('findArticles', {board: freeBoards['qna'], page: this.page})
        this.articles = articles
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
    }
    @include mobile {
    }
}

.qna {
    opacity: 0;
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
}
</style>
