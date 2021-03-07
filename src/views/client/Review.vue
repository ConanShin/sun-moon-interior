<template>
    <div class="review">
        <h3>{{article.title}}</h3>
        <div v-html="article.content"></div>
        <div class="gallery">
            <img @click="clickedIndex = index" v-for="(url, index) in images" :src="url"/>
        </div>

        <div v-if="clickedIndex !== ''" class="gray">
            <div class="control">
                <div class="left" @click="clickedIndex > 0 && --clickedIndex"><</div>
                <div class="close" @click="clickedIndex = ''">X</div>
                <div class="right" @click="clickedIndex < images.length-1 && ++clickedIndex">></div>
            </div>
            <img :src="images[clickedIndex]"/>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Review extends Vue {
    @Prop() articleNumber
    @Prop() writer
    article = {
        attach_file_urls: []
    }
    clickedIndex = ''

    get images () {
        return this.article.attach_file_urls.map(article => article.url)
    }

    async mounted () {
        this.article = (await this.$store.dispatch('findReview', {board: 5, articleNumber: this.articleNumber, writer: this.writer})).data
    }
}
</script>

<style scoped lang="scss">
.review {
    overflow: auto;
}
.gallery {
    img {
        cursor: pointer;
        margin-right: 5px;
        height: 10vh;
        width: 10vh;
    }
}
.gray {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: #000000bf;
    img {
        height: 80vh;
    }
    .control {
        position: absolute;
        top: 30px;
        font-size: 12px;
        color: white;
        cursor: pointer;

        display: flex;
        width: 100px;
        justify-content: space-between;

        div {
            padding: 3px;
        }
    }
}
</style>