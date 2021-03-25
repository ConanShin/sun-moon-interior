<template>
    <div v-if="isDesktop" class="contact flex" :class="{show: show}">
        <div class="flex-2">
        </div>
        <div class="flex-8">
            <div class="bold">Contact</div>
            <div>
                <div>해와달 인테리어의 모든 상담은 사전예약을 통해 이루어지고 있습니다.</div>
                <div>Q&A 게시판에 견적의로 글과 연락처를 남겨 주시면 상담 예약 전화를 드립니다.</div>
                <div class="gap">TEL 031 997 0512 FAX 031 997 0513</div>
                <div>EMAIL sun-mooninterior@naver.com</div>
            </div>
            <div class="button" @click="$router.push({name: 'writeArticle', query: { from: 'qna'}})">견적 의뢰 하기</div>
            <div class="bold gap">Process</div>
            <div>- 상담은 공사 예정일 2-3개월전 부터 진행</div>
            <div>- 공사는 범위에 따라 15일~30일 정도 소요</div>
            <div class="boxes flex">
                <div class="box center">
                    <span>STEP1</span>
                    <span>상담 의뢰</span>
                </div>
                <div class="triangle"></div>
                <div class="box center">
                    <span>STEP2</span>
                    <span>오프라인<br>미팅</span>
                </div>
                <div class="triangle"></div>
                <div class="box center">
                    <span>STEP3</span>
                    <span>실측 진행</span>
                </div>
                <div class="triangle"></div>
                <div class="box center">
                    <span>STEP4</span>
                    <span>계약 진행</span>
                </div>
                <div class="triangle"></div>
                <div class="box center">
                    <span>STEP5</span>
                    <span>디자인 작업</span>
                </div>
                <div class="triangle"></div>
                <div class="box center">
                    <span>STEP6</span>
                    <span>공사 진행</span>
                </div>
                <div class="triangle"></div>
                <div class="box center">
                    <span>STEP7</span>
                    <span>사후 A/S</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
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
    show = true

    get isDesktop() {
        return window.innerWidth > 460
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';
@import 'src/assets/style/media-query';

.contact {
    @include desktop {
        font-size: 20px;
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
}

.flex {
    display: flex;

    .flex-2 {
        flex: 2;
    }

    .flex-8 {
        flex: 8;
        margin-left: 20px;
    }
}

.center {
    text-align: center;
    margin-top: 10px;
}

.bold {
    font-weight: bolder;
    @include desktop {
        margin: 30px 0;
    }
}

.gap {
    margin-top: 50px;
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
    cursor: pointer;
}

.padding {
    padding: 20px;
}

.triangle {
    display: inline-table;
    margin: 68px 10px 0 10px;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
    border-left: 20px solid $dark-theme;
}

.boxes {
    @include desktop {
        margin-top: 50px;
    }
}

.box {
    margin: 12px 0;

    span:first-child {
        padding: 4px 15px;
        background-color: $dark-theme;
        color: $bright-theme;
        @include desktop {
            display: inline-block;
            width: 90px;
        }
    }

    span:nth-child(2) {
        border: 1px solid $dark-theme;
        display: inline-block;
        width: 160px;
        text-align: center;
        @include desktop {
            display: inline-flex;
            width: 118px;
            height: 100px;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>