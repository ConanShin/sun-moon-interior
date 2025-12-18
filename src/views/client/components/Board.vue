<template>
    <div class="board">
        <div class="list">
            <div class="header item">
                <span class="title">제목</span>
                <div>
                    <span class="writer">작성자</span>
                    <span class="reply">답변</span>
                </div>
            </div>
            <div class="item" v-for="item in list" @click="toArticle(item)">
                <span class="title">
                    {{ item.title }}
                    <lock-icon class="private" v-if="isSecretBoard"/>
                </span>
                <div class="flex">
                    <span class="writer">{{ item.writer }}</span>
                    <span class="reply replied" v-if="item.is_replied">yes</span>
                    <span class="reply not-replied" v-else>no</span>
                </div>
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
import LockIcon from '@/views/client/icons/Lock'
@Component({
    components: {PasswordForm, LockIcon}
})
export default class Board extends Vue {
    @Prop() list
    @Prop() pageLength
    @Prop() page
    selectedArticle = null
    showPasswordForm = false
    isSecretBoard = false

    async searchPage(pageNumber) {
        if (pageNumber === 0) return
        if (pageNumber === this.pageLength + 1) return

        this.$emit('search', pageNumber)
    }

    toArticle (item) {
        this.selectedArticle = item
        if (this.$route.path.includes('review')) {
            this.$store.commit('loading', true)
            this.$router.push({name: 'article', query: {boardNo: freeBoards['review'], articleNo: this.selectedArticle.article_no, from: this.$router.currentRoute.name}}).catch(() => {
                this.$store.commit('loading', false)
            })
        } else {
            this.showPasswordForm = true
        }
    }

    toSecretArticle (password) {
        this.$store.commit('loading', true)
        this.$router.push({name: 'article', query: {boardNo: freeBoards['qna'], articleNo: this.selectedArticle.article_no, from: this.$router.currentRoute.name, password}}).catch(() => {
            this.$store.commit('loading', false)
        })
    }

    beforeMount () {
        if (this.$router.currentRoute.name === 'qna') this.isSecretBoard = true
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
    padding: 2px 2px 4px 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.writer {
    max-width: 70px;
    width: 70px;
    @include desktop {
        max-width: 90px;
        width: 90px;
    }
    line-height: 20px;
    margin: 0 20px;
    text-align: right;
}

.flex {
    display: flex;
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
