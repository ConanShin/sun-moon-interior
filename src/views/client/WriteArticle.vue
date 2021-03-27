<template>
    <div>
        <div class="menu-name">{{fromTitle}}</div>
        <div class="row">
            <label>제목</label>
            <input v-model="title"/>
        </div>
        <div class="row">
            <label>작성자</label>
            <input v-model="writer" :disabled="writerDisable"/>
        </div>
        <quill-editor v-model="content" :options="options" class="row editor"/>
        <div class="row">
            <label>비밀번호</label>
            <input v-model="password"/>
        </div>
        <template v-if="isDesktop">
            <div class="flex">
                <agreement :class="{show: showAgreement}"/>
                <div class="flex">
                    <input type="checkbox" v-model="checked"/>
                    <span>개인정보처리방침 동의</span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="check flex row">
                <input type="checkbox" v-model="checked"/>
                <span>개인정보처리방침 동의</span>
                <span class="underline" @click="showAgreement = !showAgreement">내용보기</span>
            </div>
            <agreement :class="{show: showAgreement}"/>
        </template>
        <div class="last row flex">
            <div class="button" @click="save">등록</div>
            <div class="button" @click="$router.back()">취소</div>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import 'quill/dist/quill.snow.css'
import '@/assets/javascripts/imageCompressor.js'
import {quillEditor} from 'vue-quill-editor'
import {Quill} from 'vue-quill-editor'
import Agreement from "@/views/client/components/Agreement";
import {freeBoards} from "@/cafe24info"

Quill.register('modules/imageCompress', imageCompressor)

@Component({
    components: {Agreement, quillEditor}
})
export default class WriteArticle extends Vue {
    @Prop() from
    @Prop() editContent

    articleNo = null
    title = ''
    writer = ''
    writerDisable = false
    content = ''
    password = ''
    checked = false
    showAgreement = false
    options = {
        modules: {
            toolbar: [['image']],
            imageCompress: {
                maxWidth: 1000,
                maxHeight: 1000,
                tagName: '.editor'
            }
        },
        placeholder: ''
    }

    beforeMount() {
        if (this.$route.fullPath.includes('qna')) {
            this.content = `<p>성함:</p>
                            <br>
                            <p>이메일:</p>
                            <br>
                            <p>휴대폰번호:</p>
                            <br>
                            <p>공사할곳:</p>
                            <br>
                            <p>주소:</p>
                            <br>
                            <p>평수:</p>
                            <br>
                            <p>부분공사&전체공사(한가지선택):</p>
                            <br>
                            <p>예산금액:</p>
                            <br>
                            <p>공사희망일:</p>
                            <br>
                            <p>기타문의사항:</p>`
        }
        if (this.editContent) {
            this.writerDisable = 'disabled'
            this.articleNo = this.editContent.article_no
            this.title = this.editContent.title
            this.writer = this.editContent.writer
            this.content = this.editContent.content
        }
    }

    get isDesktop() {
        return window.innerWidth > 460
    }

    get fromTitle () {
        if (this.from === 'review') return '시공후기'
        return '문의하기'
    }

    async save () {
        if (!this.title || !this.writer || !this.password) return alert('제목 / 작성자 / 비밀번호는 필수입력란 입니다.')
        if (!this.checked) return alert('개인정보방침에 동의해 주세요.')

        if (this.articleNo) {
            // EDIT
            try {
                const response = await this.$store.dispatch('editArticle', {
                    boardNo: freeBoards[this.from],
                    article: {
                        id: this.articleNo,
                        title: this.title,
                        writer: this.writer,
                        password: this.password,
                        content: this.content
                    }
                })
                this.$router.back()
            } catch (error) {
                alert('비밀번호가 틀렸습니다.')
            }
        } else {
            // SAVE
            try {
                await this.$store.dispatch('saveArticle', {
                    boardNo: freeBoards[this.from],
                    article: {
                        title: this.title,
                        writer: this.writer,
                        password: this.password,
                        content: this.content,
                        isSecret: this.from === 'qna'
                    }
                })
                this.$router.back()
            } catch (error) {
                console.log(error)
                alert('문서를 저장 중 오류가 발생했습니다.')
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import 'src/assets/style/common';
@import 'src/assets/style/media-query';
.row {
    width: 90%;
    margin: auto;
    padding: 5px;
    font-size: 14px;
    color: $dark-theme;

    label {
        width: 55px;
        display: inline-block;
        margin-right: 10px;
    }

    input {
        border: 1px solid $transparent-dark-theme;
        height: 22px;
        width: calc(100% - 77px);
    }

    &.last {
        margin: 20px auto;
    }
}

.check {
    input {
        width: 14px;
        height: 14px;
    }

    .underline {
        text-decoration: underline;
    }
}

.editor {
    height: 40vh;
    margin-bottom: 42px;
}

.agreement {
    @include mobile {
        position: fixed;
        right: -460px;
        top: 30%;
        transition: right 0.3s ease-in;
        &.show {
            right: 0;
        }
    }
    @include desktop {
        width: 700px;
    }
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.button {
    padding: 5px 20px;
    background-color: $dark-theme;
    color: $bright-theme;
}
</style>
