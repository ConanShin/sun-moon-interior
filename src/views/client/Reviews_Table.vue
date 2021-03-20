<template>
    <div class="reviews" :class="{show: listShow}">
        <div class="header">
            <div class="menu-name">review</div>
            <div class="write button" @click="write">write</div>
        </div>
        <div class="list">
            <div class="review" v-for="review in reviews" @click="$router.push({name: 'review', query: {link: encodeURIComponent(review.link)}})">
                <span class="title reply" v-if="review.is_reply">re: {{review.title}}</span>
                <span class="title" v-else>{{review.title}}</span>
                <span class="writer">{{review.writer}}</span>
            </div>
        </div>
        <div class="paging">
            <span @click="search(-1)"><</span>
            <span v-for="index in pageLength" :class="{bold: index == page}" @click="searchPage(index)">{{index}}</span>
            <span @click="search(+1)">></span>
        </div>
    </div>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Reviews extends Vue {
    @Prop() page
    listShow = false

    get isDesktop () {
        return window.innerWidth > 400
    }

    get reviews() {
        return this.$store.getters.reviews
    }

    get pageLength() {
        return this.$store.getters.pageLength
    }

    async searchPage(pageNumber) {
        this.listShow = false
        await this.$store.dispatch('findReviews', {board: 5, page: pageNumber})
        await this.$router.push({name: 'reviews', query: {page: pageNumber}})
        this.listShow = true
    }

    async search(offset) {
        if (Number(this.page) === 1 && offset === -1) return
        if (Number(this.page) === this.pageLength && offset === 1) return
        const redirectPage = Number(this.page) + offset
        await this.searchPage(redirectPage)
    }

    write() {
        this.$router.push({name: 'writeReview'})
    }

    async beforeMount() {
        await this.$store.dispatch('findReviews', {board: 5, page: this.page})
        this.listShow = true
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
$theme: #655e5e;

.header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
}

.write.button {
    position: relative;
    cursor: pointer;
    @include desktop {
        margin-left: auto;
        text-align: right;
        font-size: 18px;
        padding: 18px 27px;
    }
    @include mobile {
        margin-right: 15px;
        font-size: 10px;
        padding: 7px;
        color: white;
        border: 1px solid #655e5e;
        background-color: #655e5e;
    }
}

.reviews {
    font-family: "Nanum Gothic";
    opacity: 0;
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
}

.review {
    &:first-of-type {
        border-top: 1px solid #655e5e36;
    }
    border-bottom: 1px solid #655e5e36;
    padding: 18px 27px;
    @include mobile {
        padding: 18px 15px;
    }
    font-size: 13px;
    display: flex;
    justify-content: space-between;
}

.title {
    cursor: pointer;
    width: 500px;

    @include mobile {
        width: 200px;
    }
    &.reply {
        padding-left: 10px;
    }
}
.writer {
    font-size: 8px;
}
.paging {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    span {
        padding: 5px;
        margin: 5px;
        cursor: pointer;
        font-weight: lighter;
        &.bold {
            font-weight: bolder;
            text-shadow: 1px 2px 3px #000000c4;
        }
    }
}

</style>
