<template>
    <div v-if="isDesktop" class="about flex" :class="{show: show}">
        <div class="flex-1">
        </div>
        <div class="flex-5">
            <div class="bold">Philosophy</div>
            <div class="line-height">
                <div>해와달 인테리어는</div>
                <div>낮과밤 우리가족이 편하게 쉴수있는 공간</div>
                <div>그리고 실용적인 공간을 제안합니다.</div>
            </div>
            <div class="bold gap">Location</div>
            <div class="margin">사전 예약을 통한 방문상담만 가능합니다.</div>
            <div class="line-height">
                <div>A. 경기도 김포시 풍무로 96번길 107</div>
                <div>T. 031 997 0512</div>
                <div>F. 031 997 0513</div>
                <div>E. sun-mooninterior@naver.com</div>
            </div>
        </div>
        <div class="flex-4">
            <img v-if="products[0]" :src="products[0].list_image"/>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.911291432864!2d126.72555341603122!3d37.60424672972388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c83af94f7c97d%3A0xc8972452b885ca26!2z7ZW07JmA64us7J247YWM66as7Ja0!5e0!3m2!1sko!2skr!4v1618021299075!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
    <div v-else>
        <div class="menu-name">소개</div>
        <div class="padding">
            <div class="bold">Philosophy</div>
            <div class="center">
                <div>해와달 인테리어는</div>
                <div>가족을 편안하게 보듬어 줄 수 있는 따뜻한 공간,</div>
                <div>그리고 실용적인 공간을 제안합니다.</div>
                <div>시간이 지나도 질리지 않고 고유한 아름다움을 간직한</div>
                <div>특별한 공간을 선물합니다.</div>
            </div>
        </div>
        <div class="padding">
            <div class="bold">Location</div>
            <div class="center">
                <div>경기도 김포시 풍무로 96번길 107</div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.911291432864!2d126.72555341603122!3d37.60424672972388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c83af94f7c97d%3A0xc8972452b885ca26!2z7ZW07JmA64us7J247YWM66as7Ja0!5e0!3m2!1sko!2skr!4v1618021299075!5m2!1sko!2skr" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                <div class="small">TEL 031 997 0512 FAX 031 997 0513</div>
                <div class="small">EMAIL sun-mooninterior@naver.com</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import {categories} from "@/cafe24info";

@Component
export default class About extends Vue {
    show = false
    get isDesktop() {
        return window.innerWidth > 460
    }

    get products () {
        return this.$store.getters.products
    }

    async mounted () {
        await this.$store.dispatch('findPortfolioList', categories['about'])
        this.show = true
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.about {
    opacity: 0;
    &.show {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
    .logo {
        display: inline-flex;
        width: 100px;
        height: 100px;
        background-color: $transparent-dark-theme;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        color: $bright-theme;
    }
    @include desktop {font-size: 20px;}
}

.flex {
    display: flex;

    .flex-1 {flex: 1;}
    .flex-5 {flex: 5;}
    .flex-4 {
        flex: 4;
        margin: 20px;
        img {margin-bottom: 10px;}
    }
}
.padding {padding: 20px;}

.margin {margin: 20px 0;}

.bold {
    font-weight: bolder;
    margin-bottom: 10px;
    @include desktop {
        font-size: 30px;
        margin: 30px 0;
    }
    @include mobile {text-align: center;}
    &.gap {margin-top: 100px;}
}

.center {
    text-align: center;

    div {margin: 2px 0;}
}

img {width: 90%;}

.small {font-size: 10px;}

.line-height {line-height: 33px;}
</style>
