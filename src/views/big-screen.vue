<template>
  <div class='big-screen' style='width: 100%;'>
    <img style='width: inherit' :src='imgUrl'>
  </div>
</template>
<script>

import { yunyinBigscreen, yunweiBigscreen } from '@/core/icons'

export default {
  data () {
    return {
      imgUrl: yunyinBigscreen
    }
  },
  mounted () {
    const routerPathMap = {
        '/operateCenter/bigScreen': yunyinBigscreen,
        '/devopsCenter/bigScreen': yunweiBigscreen
      }
      this.imgUrl = routerPathMap[this.$route.path]
  },
  methods: {}
}
</script>
<style scoped lang='less'></style>