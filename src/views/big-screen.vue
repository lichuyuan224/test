<template>
  <div class="big-screen">
    <img :src="imgUrl">
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
  watch: {
    $route (e, t) {
      const routerPathMap = {
        '/operateCenter/bigScreen': yunyinBigscreen,
        '/devopsCenter/bigScreen': yunweiBigscreen
      }
      this.imgUrl = routerPathMap[e.path]
      console.log(e.path, this.imgUrl)
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<style scoped lang='less'></style>