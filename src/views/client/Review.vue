<template>
    <div>
        <div class="flex">
            <div class="editor"></div>
            <div class="viewer"></div>
        </div>
        <div @click="save">save</div>
        <div @click="edit">edit</div>
        <div @click="viewer">viewer</div>
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

    mounted () {
        this.editor = new Editor({
            el: this.$el.querySelector('.editor'),
            height: '90vh',
            initialEditType: 'wysiwyg',
            hideModeSwitch: false
        })
    }

    async edit () {
        const response = await axios.get('http://localhost:3000/review/1')

        const edit = new Editor({
            el: this.$el.querySelector('.viewer'),
            height: '90vh',
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

    async viewer () {
        const response = await axios.get('http://localhost:3000/review/1')

        new Viewer({
            el: this.$el.querySelector('.viewer'),
            height: '90vh',
            initialValue: Buffer.from(response.data.content).toString()
        })

    }
}
</script>

<style scoped lang="scss">
.flex {
    display: flex;
}
.editor, .viewer, .edit {
    width: 500px;
}
</style>