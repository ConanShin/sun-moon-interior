<template>
    <div>
        <div class="menu-name">Q&A</div>
        <div class="row">
            <label>제목</label>
            <input v-model="title"/>
        </div>
        <div class="row">
            <label>작성자</label>
            <input v-model="writer"/>
        </div>
        <div class="row">
            <label>이메일</label>
            <input v-model="email"/>
        </div>
        <div class="row">
            <label>휴대폰</label>
            <input v-model="phone"/>
        </div>
        <quill-editor :options="options" class="row editor"/>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import 'quill/dist/quill.snow.css'
import '@/assets/javascripts/imageCompressor.js'
import {quillEditor} from 'vue-quill-editor'
import {Quill} from 'vue-quill-editor'
Quill.register('modules/imageCompress', imageCompressor)

@Component({
    components: {quillEditor}
})
export default class WriteQNA extends Vue {
    title = ''
    writer = ''
    email = ''
    phone = ''
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
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';
.row {
    width: 90%;
    margin: auto;
    padding: 5px;
    font-size: 14px;
    color: $dark-theme;
    label {
        width: 50px;
        display: inline-block;
    }
    input {
        border: 1px solid $transparent-dark-theme;
        height: 22px;
        width: calc(100% - 65px);
    }
}
.editor {
    height: 40vh;
}
</style>