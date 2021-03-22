<template>
    <div>
        <div class="flex center row">
            <label class="only-desktop">제목:</label>
            <input class="title" v-model="title" placeholder="제목"/>
            <label class="only-desktop">작성자:</label>
            <input class="writer" v-model="writer" placeholder="작성자"/>
        </div>
        <quill-editor v-model="content" :options="options" class="editor"/>
        <div class="flex">
            <div class="box agreement row only-desktop">
                <p>■ 개인정보의 수집·이용 목적</p>
                <p>서비스 제공 및 계약의 이행, 구매 및 대금결제, 물품배송 또는 청구지 발송, 회원관리 등을 위한 목적</p>
                <p>■ 수집하려는 개인정보의 항목</p>
                <p>이름, 주소, 연락처, 이메일 등</p>
                <p>■ 개인정보의 보유 및 이용 기간</p>
                <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외없이 해당정보를 파기합니다.</p>
                <div class="check">
                    <input type="checkbox" v-model="checked"/>동의
                </div>
            </div>
            <div class="flex center row margin-bottom">
                <label class="only-desktop">비밀번호:</label>
                <input class="password" v-model="password" placeholder="비밀번호"/>
                <div class="save" @click="save">save</div>
                <div class="cancel" @click="goBack">cancel</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'
import 'quill/dist/quill.snow.css'
import '@/assets/javascripts/imageCompressor.js'
import {quillEditor} from 'vue-quill-editor'
import {Quill} from 'vue-quill-editor'
import {freeBoards} from '@/cafe24info'

Quill.register('modules/imageCompress', imageCompressor)

@Component({
    components: {quillEditor}
})
export default class WriteReview extends Vue {
    @Prop() editContent
    articleNo = null
    title = ''
    writer = ''
    password = ''
    content = ''
    options = {
        modules: {
            toolbar: [['image']],
            imageCompress: {
                maxWidth: 1000,
                maxHeight: 1000,
                tagName: '.editor'
            }
        }
    }
    checked = false

    get isDesktop () {
        return window.innerWidth > 400
    }

    beforeMount() {
        if (this.editContent) {
            this.articleNo = this.editContent.article_no
            this.title = this.editContent.title
            this.writer = this.editContent.writer
            this.content = this.editContent.content
        }
    }

    async save() {
        if (!this.title || !this.writer || !this.password) {
            return alert('제목 / 작성자 / 비밀번호를 입력해 주세요.')
        }
        if (this.isDesktop && !this.checked) {
            return alert('동의서를 체크해 주세요.')
        }

        if (this.articleNo) {
            const response = await this.$store.dispatch('editReview', {
                boardNo: freeBoards['review'],
                article: {
                    id: this.articleNo,
                    title: this.title,
                    writer: this.writer,
                    password: this.password,
                    content: this.content
                }
            })
            if (response.data === 'Not Authorized') return alert('비밀번호가 틀렸습니다.')
        } else {
            await this.$store.dispatch('saveReview', {
                boardNo: freeBoards['review'],
                article: {
                    title: this.title,
                    writer: this.writer,
                    password: this.password,
                    content: this.content
                }
            })
        }
        this.goBack()
    }
    goBack () {
        this.$router.go(-1)
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
$border: 1px solid $bright-theme;
.only-desktop {
    @include mobile {
        display: none !important;
    }
}
.flex {
    display: flex;
    @include mobile {
        justify-content: center;
    }
    &.center {
        align-items: center;
    }
    height: 35px;
}

.row {
    margin: 5px 0;
}

.title, .writer, .password {
    width: 200px;
    height: inherit;
    border: $border;
    margin: 0 2px;
}

.editor {
    height: 70vh;
    margin-bottom: 42px;
}

.box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: $border;

    &.borderless {
        border: 0
    }
}

.agreement {
    height: fit-content;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
    margin-right: 5px;
    .check {
        font-size: 17px;
        width: 100%;
        text-align: right;
    }
}

.save, .cancel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: $border;
    width: 40px;
    height: inherit;
    cursor: pointer;
    margin: 0 2px;
}

.margin-bottom {
    padding-bottom: 30px;
}

p {
    margin: 5px 0;
}
</style>