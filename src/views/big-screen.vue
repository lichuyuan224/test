<template>
  <div class='big-screen' style='width: 100%;'>
    <a-icon type="fullscreen" @click='changeFull'/>
    <img id='big-screen' style='width: inherit' :src='imgUrl'>
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
  methods: {
    enable: function(element) {
      if(element.requestFullScreen) {
        element.requestFullScreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    cancel: function() {
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    changeFull() {
      if (!this.isFull) {
        this.enable(document.getElementById('big-screen'))
      } else {
        this.cancel()
      }
    }
  }
}
</script>
<style scoped lang='less'></style>