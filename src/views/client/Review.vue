<template>
    <div class="review" :class="{show: listShow}">
        <h3>작성자: {{article.writer}}</h3>
        <h3>제목: {{article.title}}</h3>
        <div class="content" v-html="article.content"></div>
        <div class="gallery">
            <img @click="clickedIndex = index" v-for="(url, index) in images" :src="url"/>
        </div>
        <div class="control margin-bottom">
            <div @click="$router.push({name: 'reviews'})" class="box">목록</div>
            <div @click="$router.push({name: 'writeReview', params: {editContent: article}})" class="box">수정</div>
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
export default class Review extends Vue {
    @Prop() link
    listShow = false

    article = {
        attach_file_urls: []
    }
    clickedIndex = ''

    get images () {
        return this.article.attach_file_urls
    }

    async mounted () {
        this.article = (await this.$store.dispatch('findReview', {link: decodeURIComponent(this.link)})).data
        this.listShow = true
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
$theme: #655e5e;
.review {
    overflow: auto;
    width: calc(100vw - 20px);
    opacity: 0;
    font-family: "Nanum Gothic";
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
.box {
    border: 1px solid $theme;
    width: 35px;
    text-align: center;
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
    }
    .control {
        position: absolute;
        top: 80vh;
        font-size: 12px;
        color: black;
        text-shadow: 0 0 3px white;
    }
}
.margin-bottom {
    padding-bottom: 30px;
}
</style>