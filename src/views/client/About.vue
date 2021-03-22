<template>
    <div>
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
                <img src="@/assets/map.png"/>
                <div class="small">TEL 031 997 0512 FAX 031 997 0513</div>
                <div class="small">EMAIL sun-mooninterior@naver.com</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class About extends Vue {

}
</script>

<style scoped lang="scss">
.padding {
    padding: 20px;
}
.bold {
    font-weight: bolder;
    margin-bottom: 10px;
}
.center {
    text-align: center;
    div {
        margin: 2px 0;
    }
}
img {
    width: 100%;
}
.small {
    font-size: 10px;
}
</style>