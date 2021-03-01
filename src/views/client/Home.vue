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

    get products () {
        return this.$store.getters.products
    }
}
</script>

<style scoped lang="scss">

</style>