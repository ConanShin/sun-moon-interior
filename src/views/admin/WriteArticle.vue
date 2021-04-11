<template>
    <div class="admin-write-article">
        <quill-editor v-model="content" :options="options" class="row admin-editor"/>
        <div class="button" @click="save">save</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import 'quill/dist/quill.snow.css'
import ImageCompress from 'quill-image-compress'
import {quillEditor} from 'vue-quill-editor'
import Quill from 'quill'
import axios from "axios";

Quill.register('modules/imageCompress', ImageCompress)
@Component({
    components: {quillEditor}
})
export default class WriteArticle extends Vue {
    content = ''
    options = {
        modules: {
            toolbar: [['image']],
        },
        placeholder: ''
    }

    searchImages() {
        const dataURIs = []
        this.$el.querySelectorAll('.admin-editor img').forEach((imageElement, index) => {
            if (imageElement.src.length > 1000) dataURIs.push(imageElement.src)
        })
        return dataURIs
    }

    DataURIToFile(dataURI, fileName) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        const blob = new Blob([ia], {type: mimeString})
        return new File([blob], 'sunmooninterior1/' + fileName)
    }

    async azureUpload(files) {
        let formData = new FormData()

        files.forEach(file => {
            formData.append('images[]', file, file.name);
        })
        const url = await axios.post(process.env.VUE_APP_BACKEND + `azure-blob/upload`, formData)
        return url.data
    }

    async save() {
        const images = this.searchImages()
        const files = images.map((imageURI, index) => this.DataURIToFile(imageURI, 'content_title_' + index))
        if (files.length === 0) return
        const urls = await this.azureUpload(files)
        this.$el.querySelectorAll('.editor img').forEach((imageElement, index) => {
            if (imageElement.src.length > 1000) imageElement.src = urls.pop()
        })
    }
}
</script>
<style scoped lang="scss">
.button {
    display: inline-block;
    padding: 3px;
    margin-top: 5px;
    float: right;
}
</style>
<style lang="scss">
.admin-write-article .admin-editor .ql-container {
    height: 80vh;
}
</style>