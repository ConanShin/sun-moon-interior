<template>
    <div>
        <div class="menu-name">견적의뢰</div>
        <div class="center line-height">
            <div>모든 상담은 사전예약을 통해 이루어지고 있습니다.</div>
            <div>견적의뢰 게시판에 글을 남겨주시면</div>
            <div>상담 예약 전화를 드립니다.</div>
            <div class="button" @click="$router.push({name: 'writeArticle', query: { from: 'qna'}})">견적 의뢰 하기</div>
        </div>
        <div class="padding line-height">
            <div class="bold">Process</div>
            <div class="center">- 상담은 공사 예정일 2-3개월전 부터 진행</div>
            <div class="center">- 공사는 범위에 따라 15일~30일 정도 소요</div>
            <div class="box center">
                <span>STEP1</span>
                <span>상담 의뢰</span>
            </div>
            <div class="box center">
                <span>STEP2</span>
                <span>오프라인 미팅</span>
            </div>
            <div class="box center">
                <span>STEP3</span>
                <span>실측 진행</span>
            </div>
            <div class="box center">
                <span>STEP4</span>
                <span>계약 진행</span>
            </div>
            <div class="box center">
                <span>STEP5</span>
                <span>디자인 작업</span>
            </div>
            <div class="box center">
                <span>STEP6</span>
                <span>공사 진행</span>
            </div>
            <div class="box center">
                <span>STEP7</span>
                <span>사후 A/S</span>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Contact extends Vue {

}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';

.center {
    text-align: center;
    margin-top: 10px;
}
.bold {
    font-weight: bolder;
}
.line-height {
    line-height: 20px;
}
.button {
    background-color: $dark-theme;
    display: inline-block;
    color: $bright-theme;
    padding: 5px 10px;
    margin-top: 7px;
}
.padding {
    padding: 20px;
}
.box {
    margin: 12px 0;
    span:first-child {
        padding: 4px 15px;
        background-color: $dark-theme;
        color: $bright-theme;
    }
    span:nth-child(2) {
        border: 1px solid $dark-theme;
        display: inline-block;
        width: 160px;
        text-align: center;
    }
}
</style>