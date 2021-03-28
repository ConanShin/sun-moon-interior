<template>
    <div class="board">
        <div class="list">
            <div class="header item">
                <span class="reply">답변</span>
                <span class="title">제목</span>
                <span class="writer">작성자</span>
            </div>
            <div class="item" v-for="item in list" @click="toArticle(item)">
                <span class="reply replied" v-if="item.is_replied">yes</span>
                <span class="reply not-replied" v-else>no</span>
                <span class="title">{{ item.title }}</span>
                <span class="writer">{{ item.writer }}</span>
            </div>
        </div>
        <div class="paging">
            <span @click="searchPage(Number(page) - 1)"><</span>
            <span v-for="index in pageLength" :class="{bold: index === Number(page)}"
                  @click="searchPage(index)">{{ index }}</span>
            <span @click="searchPage(Number(page) + 1)">></span>
        </div>
        <password-form v-if="showPasswordForm" @confirm="toSecretArticle" @cancel="showPasswordForm = false"/>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {freeBoards} from '@/cafe24info'
import PasswordForm from "@/views/client/components/PasswordForm";
@Component({
    components: {PasswordForm}
})
export default class Board extends Vue {
    @Prop() list
    @Prop() pageLength
    @Prop() page
    selectedArticle = null
    showPasswordForm = false

    async searchPage(pageNumber) {
        if (pageNumber === 0) return
        if (pageNumber === this.pageLength + 1) return

        this.$emit('search', pageNumber)
    }

    toArticle (item) {
        this.selectedArticle = item
        if (this.$route.path.includes('review')) {
            this.$router.push({name: 'article', query: {boardNo: freeBoards['review'], articleNo: this.selectedArticle.article_no, from: 'review'}})
        } else {
            this.showPasswordForm = true
        }
    }

    toSecretArticle (password) {
        this.$router.push({name: 'article', query: {boardNo: freeBoards['qna'], articleNo: this.selectedArticle.article_no, from: 'qna', password}})
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.item {
    &:first-of-type {
        font-size: 12px;
        padding: 7px 27px;
        border-top: 1px solid $transparent-dark-theme;
        background-color: $transparent-bright-theme;
        @include mobile {
            padding: 7px 15px;
        }
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

.reply {
    width: 30px;
    height: 16px;
    min-width: 30px;
    padding: 2px;
    display: inline-block;
    text-align: center;
    margin-right: 5px;
}

.replied {
    background-color: #655e5e;
    color: $bright-theme;
}
.not-replied {
    background-color: $transparent-dark-theme;
    color: $bright-theme;
}

.title {
    cursor: pointer;
    line-height: 20px;
}

.writer {
    min-width: 70px;
    width: 70px;
    line-height: 20px;
    margin-left: 5px;
    text-align: right;
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
