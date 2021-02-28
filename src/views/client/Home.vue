<template>
    <div>

    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    beforeMount () {
        this.$store.dispatch('findProducts')
    }
}
</script>

<style scoped lang="scss">

</style>