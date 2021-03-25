<template>
    <div class="article" :class="{show: listShow}">
        <h3>작성자: {{article.writer}}</h3>
        <h3>제목: {{article.title}}</h3>
        <div class="content" v-html="article.content"></div>
        <div class="gallery">
            <img @click="clickedIndex = index" v-for="(url, index) in images" :src="url"/>
        </div>
        <div class="margin-bottom">
            <div @click="back" class="button">목록</div>
            <div @click="edit" class="button">수정</div>
        </div>

        <div v-if="clickedIndex !== ''" class="gray">
            <img :src="images[clickedIndex]"/>
            <div class="control">
                <div class="left" @click="clickedIndex > 0 && --clickedIndex"><</div>
                <div class="close" @click="clickedIndex = ''">X</div>
                <div class="right" @click="clickedIndex < images.length-1 && ++clickedIndex">></div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Article extends Vue {
    @Prop() link
    @Prop() from
    listShow = false

    article = {
        attach_file_urls: []
    }
    clickedIndex = ''

    get images () {
        return this.article.attach_file_urls
    }

    back () {
        this.$router.push({name: this.from})
    }

    edit () {
        this.$router.push({name: 'writeArticle', query: {from: this.from}, params: {editContent: this.article}})
    }

    async mounted () {
        this.article = (await this.$store.dispatch('findArticle', {link: decodeURIComponent(this.link)})).data
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
    font-size: 17px;
    @include mobile {
        font-size: 10px;
    }
    color: #FFF;
    border: 1px solid #655e5e;
    background-color: #655e5e;
    float: right;
    padding: 11px;
    margin: 3px;
    cursor: pointer;
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
.gray {
    position: fixed;
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
.margin-bottom {
    padding-bottom: 30px;
}
</style>