<template>
    <div class="agreement">
        <span class="close" @click="$emit('cancel')">X</span>
        <p>■ 개인정보의 수집·이용 목적</p>
        <p>서비스 제공 및 계약의 이행, 구매 및 대금결제, 물품배송 또는 청구지 발송, 회원관리 등을 위한 목적</p>
        <p>■ 수집하려는 개인정보의 항목</p>
        <p>이름, 주소, 연락처, 이메일 등</p>
        <p>■ 개인정보의 보유 및 이용 기간</p>
        <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외없이 해당정보를 파기합니다.</p>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Agreement extends Vue {

}
</script>

<style scoped lang="scss">
@import 'src/assets/style/common';
.agreement {
    width: calc(100% - 40px);
    padding: 20px;
    background-color: $bright-theme-100;
}
.close {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>