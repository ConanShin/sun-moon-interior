<template>
    <div class="board">
        <div class="list">
            <div class="item" v-for="item in list" @click="toArticle(item)">
                <span class="title reply" v-if="item.is_reply">re: {{ item.title }}</span>
                <span class="title" v-else>{{ item.title }}</span>
                <span class="writer">{{ item.writer }}</span>
            </div>
        </div>
        <div class="paging">
            <span @click="searchPage(Number(page) - 1)"><</span>
            <span v-for="index in pageLength" :class="{bold: index === Number(page)}"
                  @click="searchPage(index)">{{ index }}</span>
            <span @click="searchPage(Number(page) + 1)">></span>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Board extends Vue {
    @Prop() list
    @Prop() pageLength
    @Prop() page

    async searchPage(pageNumber) {
        if (pageNumber === 0) return
        if (pageNumber === this.pageLength + 1) return

        this.$emit('search', pageNumber)
    }

    toArticle (item) {
        let from = 'qna'
        if(this.$route.path.includes('review')) from = 'review'

        this.$router.push({name: 'article', query: {link: encodeURIComponent(item.link), from}}).catch(() => {})
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.item {
    &:first-of-type {
        border-top: 1px solid $transparent-dark-theme;
    }
    border-bottom: 1px solid $transparent-dark-theme;
    padding: 18px 27px;
    font-size: 15px;
    @include mobile {
        font-size: 13px;
        padding: 18px 15px;
    }
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
    justify-content: center;
    margin: 20px;
    span {
        padding: 5px;
        margin: 5px;
        cursor: pointer;
        font-weight: lighter;
        &.bold {
            font-weight: bolder;
            text-shadow: 1px 2px 3px #000000c4;
        }
    }
}
</style>
