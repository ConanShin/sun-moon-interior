<template>
    <div>
        <div class="flex">
            <div class="editor"></div>
        </div>
        <div class="button" @click="cancel">cancel</div>
        <div class="button" @click="save">save</div>
<!--        <div @click="edit">edit</div>-->
<!--        <div @click="viewer">viewer</div>-->
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import Editor from '@toast-ui/editor'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import axios from 'axios'

@Component
export default class Review extends Vue {
    editor = null
    height = '70vh'

    mounted () {
        this.editor = new Editor({
            el: this.$el.querySelector('.editor'),
            height: this.height,
            initialEditType: 'wysiwyg',
            hideModeSwitch: true,
            toolbarItems: ['bold', 'image', 'ol', 'ul']
        })
    }

    async edit () {
        const response = await axios.get('http://localhost:3000/review/1')

        const edit = new Editor({
            el: this.$el.querySelector('.viewer'),
            height: this.height,
            initialEditType: 'wysiwyg',
            hideModeSwitch: false
        })
        edit.setMarkdown(Buffer.from(response.data.content).toString())
    }

    async save () {
        const content = this.editor.getMarkdown()

        const body = {
            title: 'temp',
            content,
            author: '신철민',
            password: 'temp123'
        }
        await axios.post('http://localhost:3000/review', body)
    }

    cancel () {

    }

    async viewer () {
        const response = await axios.get('http://localhost:3000/review/1')

        new Viewer({
            el: this.$el.querySelector('.viewer'),
            height: this.height,
            initialValue: Buffer.from(response.data.content).toString()
        })
    }
}
</script>

<style scoped lang="scss">
$theme: #6b6a6a;

.flex {
    display: flex;
}
.editor, .viewer, .edit {
    width: 100%;
}
.button {
    float: right;
    margin: 5px 0 0 3px;
    display: inline-block;
    padding: 5px;
    border: 1px solid $theme;
    cursor: pointer;
}
</style>
