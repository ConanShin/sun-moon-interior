<template>
    <div :class="{show: !footerHidden}">
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
    footerHidden = true
    throttle = null

    mounted () {
        this.showFooter()
        if (this.isDesktop) return document.body.addEventListener('scroll', this.showFooter)
        window.addEventListener('scroll', this.showFooter)
    }
    destroy() {
        if (this.isDesktop) return document.body.removeEventListener('scroll', this.showFooter)
        window.removeEventListener('scroll', this.showFooter)
    }

    get isDesktop() {
        return window.innerWidth > 400
    }

    hideFooter () {
        setTimeout(() => {
            this.footerHidden = true
        }, 3000)
    }

    showFooter () {
        if(this.throttle) return
        this.throttle = setTimeout(() => {
            this.throttle = null
            if (this.isDesktop) {
                if (document.body.scrollTop === (document.body.scrollHeight - document.body.offsetHeight)) {
                    this.showThrottle = setTimeout(() => {
                        this.showThrottle = null
                        this.footerHidden = false
                    }, 1000)
                    // this.hideFooter()
                } else {
                    this.footerHidden = true
                    this.showThrottle = null
                }
            } else {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    this.showThrottle = setTimeout(() => {
                        this.showThrottle = null
                        this.footerHidden = false
                    }, 1000)
                    this.hideFooter()
                } else {
                    this.footerHidden = true
                    this.showThrottle = null
                }
            }
        }, 200)
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

.footer {
    position: fixed;
    bottom: 0;
    text-align: center;
    border-top: 1px solid $transparent-dark-theme;
    overflow: hidden;
    height: 0;
    width: 100%;
    background-color: $bright-theme;
    opacity: 0.8;

    transition: all 0.5s ease-in;
    &.show {
        height: 70px;
        @include desktop {
            padding: 10px 0;
        }
    }
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