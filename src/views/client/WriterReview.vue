<template>
    <div>
        <input class="title" v-model="title" placeholder="제목"/>
        <input class="writer" v-model="writer" placeholder="작성자"/>
        <input class="password" v-model="password" placeholder="비밀번호" type="password"/>
        <quill-editor v-model="content" :options="options"/>
        <div class="save" @click="save">save</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import 'quill/dist/quill.snow.css'
import ImageCompress from 'quill-image-compress'
import {quillEditor} from 'vue-quill-editor'
import {Quill} from 'vue-quill-editor'

Quill.register('modules/imageCompress', ImageCompress)

@Component({
    components: {quillEditor}
})
export default class WriterReview extends Vue {
    title = ''
    writer = ''
    password = ''
    content = ''
    options = {
        modules: {
            toolbar: [['image']],
            imageCompress: {
                quality: 0.9,
                maxWidth: 1000, // default
                maxHeight: 1000, // default
                imageType: 'image/jpeg'
            }
        }
    }

    save() {
        this.$store.dispatch('saveReview', {
            boardNo: 5,
            article: {
                title: this.title,
                writer: this.writer,
                password: this.password,
                content: this.content
            }
        })
    }
}
</script>
<style lang="scss">
.ql-toolbar {
    //display: none;
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-top: 1px solid #ccc;
}
</style>
<style scoped lang="scss">
$border: 1px solid #ccc;
.title, .writer, .password {
    width: 200px;
    border: $border;
    margin: 0 2px 2px 0
}

.save {
    display: inline-block;
    border: $border;
    text-align: center;
    padding: 2px;
    margin-top: 2px;
    cursor: pointer;
}
</style>