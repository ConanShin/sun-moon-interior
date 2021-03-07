<template>
    <div>
        <img src="@/assets/map.png"/>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Location extends Vue {

}
</script>

<style scoped lang="scss">
img {
    width: 100%;
}
</style>