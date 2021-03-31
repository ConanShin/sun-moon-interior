<template>
    <div class="article" :class="{show: listShow}">
        <h3>작성자: {{ article.writer }}</h3>
        <h3>제목: {{ article.title }}</h3>
        <div class="content" v-html="article.content"></div>
        <div class="gallery">
            <img @click="clickedIndex = index" v-for="(url, index) in images" :src="url"/>
        </div>
        <div class="margin-bottom space-between">
            <div>
                <div @click="back" class="button">목록</div>
            </div>
            <div>
                <div @click="edit" class="button">수정</div>
                <div @click="showPasswordForm = true" class="button">삭제</div>
            </div>
        </div>

        <div v-if="clickedIndex !== ''" class="gray">
            <img :src="images[clickedIndex]"/>
            <div class="control">
                <div class="left" @click="clickedIndex > 0 && --clickedIndex"><</div>
                <div class="close" @click="clickedIndex = ''">X</div>
                <div class="right" @click="clickedIndex < images.length-1 && ++clickedIndex">></div>
            </div>
        </div>

        <div class="comments">
            <div>Comments</div>
            <div class="line" v-for="comment in article.comments">
                <div class="writer">{{ comment.writer }}</div>
                <div v-if="!comment.editable" class="comment">{{ comment.content }}</div>
                <div v-if="!comment.editable" class="button" @click="selectComment(comment, 'edit')">수정</div>
                <div v-if="!comment.editable" class="button" @click="selectComment(comment, 'delete')">삭제</div>
                <textarea v-if="comment.editable" v-model="comment.content"/>
                <div v-if="comment.editable" class="button" @click="editComment(comment)">저장</div>
                <div v-if="comment.editable" class="button" @click="findArticle">취소</div>
            </div>
            <div class="new line">
                <input v-model="newComment.writer" placeholder="작성자"/>
                <input v-model="newComment.password" placeholder="비밀번호"/>
                <textarea v-model="newComment.content"></textarea>
                <div class="button" @click="saveComment">저장</div>
            </div>
        </div>

        <password-form v-if="showPasswordForm" @confirm="deleteArticle" @cancel="showPasswordForm = false"/>
        <password-form v-if="showPasswordEditComment" @confirm="confirmPassword"
                       @cancel="showPasswordEditComment = false">
            <div class="no-margin">Comment 수정</div>
        </password-form>
        <password-form v-if="showPasswordDeleteComment" @confirm="deleteComment"
                       @cancel="showPasswordDeleteComment = false">
            <div class="no-margin">Comment 삭제</div>
        </password-form>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import PasswordForm from "@/views/client/components/PasswordForm";

@Component({
    components: {PasswordForm}
})
export default class Article extends Vue {
    @Prop() link
    @Prop() from
    @Prop() boardNo
    @Prop() articleNo
    @Prop() password

    listShow = false
    showPasswordForm = false
    showPasswordEditComment = false
    showPasswordDeleteComment = false
    newComment = {
        writer: '',
        password: '',
        content: ''
    }
    selectedComment = null
    article = {
        attach_file_urls: []
    }
    clickedIndex = ''

    get images() {
        return this.article.attach_file_urls.map(file => file.url).filter(url => {
            const urlTokens = url.split('.')
            return ['jpeg', 'jpg', 'png'].includes(urlTokens[urlTokens.length - 1])
        })
    }

    back() {
        this.$router.push({name: this.from}).catch(() => {
        })
    }

    async confirmPassword(password) {
        try {
            await this.$store.dispatch('checkPassword', {
                articleNo: this.article.article_no,
                commentNo: this.selectedComment.id,
                password
            })
            this.selectedComment.password = password
            this.selectedComment.editable = true
            this.showPasswordEditComment = false
        } catch (error) {
            alert('비밀번호가 틀렸습니다.')
        }
    }

    edit() {
        this.$router.push({
            name: 'writeArticle',
            query: {from: this.from},
            params: {editContent: this.article}
        }).catch(() => {
        })
    }

    async deleteArticle(password) {
        try {
            await this.$store.dispatch('deleteArticle', {boardNo: this.boardNo, articleNo: this.articleNo, password})
            this.back()
        } catch (error) {
            alert('비밀번호가 틀렸습니다.')
        }
    }

    selectComment(comment, type) {
        this.selectedComment = comment
        if (type === 'edit') this.showPasswordEditComment = true
        else this.showPasswordDeleteComment = true
    }

    invalidComment(comment) {
        return comment.writer.trim() === '' || comment.content.trim() === '' || comment.password.trim() === ''
    }

    async saveComment() {
        if (this.invalidComment(this.newComment)) return alert('작성자, 비밀번호, 내용을 입력해주세요.')
        await this.$store.dispatch('saveComment', {articleNo: this.article.article_no, comment: this.newComment})
        await this.findArticle()
    }

    async editComment(comment) {
        if (this.invalidComment(comment)) return alert('작성자, 비밀번호, 내용을 입력해주세요.')
        await this.$store.dispatch('editComment', {articleNo: this.article.article_no, comment})
        await this.findArticle()
    }

    async deleteComment(password) {
        try {
            await this.$store.dispatch('deleteComment', {
                articleNo: this.article.article_no,
                commentNo: this.selectedComment.id,
                password
            })
            await this.findArticle()
        } catch (error) {
            alert('비밀번호가 틀렸습니다.')
        }
    }

    async findArticle() {
        try {
            this.listShow = false
            this.showPasswordForm = false
            this.showPasswordEditComment = false
            this.showPasswordDeleteComment = false
            this.newComment = {
                writer: '',
                password: '',
                content: ''
            }
            this.selectedComment = null
            this.article = {
                attach_file_urls: []
            }
            this.clickedIndex = ''
            this.article = (await this.$store.dispatch('findArticle', {
                boardNo: this.boardNo,
                articleNo: this.articleNo,
                password: this.password
            })).data
            this.$forceUpdate()
            this.listShow = true
        } catch (error) {
            alert('비밀번호가 틀렸습니다.')
            this.back()
        }
    }

    async mounted() {
        await this.findArticle()
        this.listShow = true
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

.article {
    opacity: 0;

    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
}

.content {
    ::v-deep p span span {
        font-size: 12px;
        font-family: monospace !important;
    }

    ::v-deep img {
        display: block;
        max-width: 100%;
    }
}

.gallery {
    img {
        cursor: pointer;
        margin-right: 5px;
        height: 10vh;
        width: 10vh;
    }
}

.button {
    font-size: 14px;
    @include mobile {
        font-size: 10px;
    }
    color: $bright-theme;
    border: 1px solid $dark-theme;
    background-color: $dark-theme;
    float: right;
    padding: 5px 11px;
    margin: 3px;
}

.control {
    display: flex;
    width: 100px;
    justify-content: space-between;

    div {
        padding: 3px;
        cursor: pointer;
    }
}


.comments {
    & > * {
        padding-left: 10px;
    }

    .line {
        margin: 10px 0;
        border-top: 1px solid $transparent-dark-theme;
    }

    .writer {
        margin-top: 10px;
        font-weight: bolder;
    }

    .button {
        height: 10px;
        font-size: 10px;
        float: none;
        display: inline-block;
        border: 1px solid $transparent-dark-theme;
        background-color: $bright-theme;
        color: $dark-theme;
        margin-left: 0;
    }

    .comment {
        width: fit-content;
        height: fit-content;
        margin: 10px;
        white-space: pre-wrap;
    }

    input {
        color: $dark-theme;
        height: 25px;
        margin: 5px 5px 5px 0;
        border: 1px solid $transparent-dark-theme;
    }

    textarea {
        display: block;
        width: calc(100% - 30px);
        height: 100px;
        padding: 5px;
        color: $dark-theme;
        resize: none;
        border: 1px solid $transparent-dark-theme;

        &:read-only {
            min-height: 100px;
            border: none;
            background-color: $bright-theme;
        }
    }
}

.gray {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #000000bf;

    img {
        margin-top: 100px;
        max-width: 95vw;
        max-height: 80vh;
        @include mobile {
            max-height: 60vh;
        }
    }

    .control {
        position: absolute;
        top: 80vh;
        font-size: 12px;
        color: $bright-theme;
        @include desktop {
            top: 90vh;
        }
    }
}

.no-margin {
    margin: 0;
}

.margin-bottom {
    padding-bottom: 30px;
}

.space-between {
    display: flex;
    justify-content: space-between;
}
</style>