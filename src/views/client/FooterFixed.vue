<template>
    <div>
        <div class="large">해외달인테리어</div>
        <div class="medium">경기도 김포시 풍무로 96번길 107</div>
        <div class="medium">TEL 031 997 0512 FAX 031 997 0513</div>
        <div class="small">EMAIL sun-mooninterior@naver.com</div>
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
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

.footer {
    position: relative;
    text-align: center;
    border-top: 1px solid #655e5e14;
    overflow: hidden;
    width: 100%;
    background-color: $bright-theme;
    height: 70px;
    padding: 10px 0;
}

.large {
    font-size: 12px;
}

.medium {
    font-size: 11px;
}

.small {
    font-size: 10px;
}
</style>