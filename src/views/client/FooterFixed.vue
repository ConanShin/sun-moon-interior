<template>
    <div>
        <div class="links">
            <div class="blog link" @click="open('https://blog.naver.com/d-jhj')"/>
            <div class="instagram link" @click="open('https://instagram.com/tk_bbabba?igshid=5ohzmlkgb4lo')"/>
        </div>
        <template v-if="isDesktop">
            <div class="large">A. 경기도 김포시 풍무로 96번길 107 | T. 031 997 0512 | F. 031 997 0513 | E. sun-mooninterior@naver.com</div>
            <div class="large">사업자등록번호 492-18-01066</div>
        </template>
        <template v-else>
            <div class="medium">A. 경기도 김포시 풍무로 96번길 107</div>
            <div class="medium">T. 031 997 0512 F. 031 997 0513</div>
            <div class="small">E. sun-mooninterior@naver.com</div>
            <div class="small">사업자등록번호 492-18-01066</div>
            <div>sun-mooninterior@naver.com</div>
        </template>
        <div class="small">Copyright © 해와달인테리어 All rights reserved</div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Footer extends Vue {

    get isDesktop() {
        return window.innerWidth > 460
    }

    open (link) {
        window.open(link, '_blank')
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

.footer {
    background-color: $bright-theme-100;
    position: relative;
    text-align: center;
    border-top: 1px solid #655e5e14;
    overflow: hidden;
    width: 100%;
    height: fit-content;
    padding: 10px 0;
    line-height: 16px;
}

.links {
    text-align: center;
    .link {
        margin: 0 7px 4px;
        display: inline-block;
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-repeat: no-repeat;
        background-size: contain;
        &.blog {background-image: url("~@/assets/blog.png")}
        &.instagram {background-image: url("~@/assets/instagram.png")}
    }
}

.large {
    font-size: 15px;
    line-height: 25px;
}

.medium {
    font-size: 11px;
}

.small {
    font-size: 10px;
    @include desktop {
        margin-top: 10px;
    }
}
</style>
