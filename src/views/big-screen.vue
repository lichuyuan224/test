<template>
  <div class="big-screen" style="width: 100%;">
    <a-icon v-if="showFullScreen" type="fullscreen" @click="changeFull"/>
    <img id="big-screen" style="width: inherit" :src="imgUrl">
  </div>
</template>
<script>

import { yunyinBigscreen, yunweiBigscreen, jiankongdapan, ziyuanzhuangtaitu, gaojinggailan, aliyundashboard, gongzuotai, quanbugongdan } from '@/core/icons'

export default {
  data () {
    return {
      imgUrl: yunyinBigscreen,
      showFullScreen: false
    }
  },
  mounted () {
    const routerPathMap = {
        '/operateCenter/bigScreen': yunyinBigscreen,
        '/devopsCenter/bigScreen': yunweiBigscreen,
        '/monitor/show-pic1': jiankongdapan,
        '/monitor/show-pic2': ziyuanzhuangtaitu,
        '/monitor/show-pic3': gaojinggailan,
        '/monitor/show-pic4': aliyundashboard,
        '/my-request/workspace': gongzuotai,
        '/my-request/request-list': quanbugongdan,
      }
      this.imgUrl = routerPathMap[this.$route.path]
      if(this.$route.path && this.$route.path.indexOf('bigScreen') > -1) {
        this.showFullScreen = true
      }
  },
  methods: {
    enable: function(element) {
      if(element.requestFullScreen) {
        element.requestFullScreen()
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    cancel: function() {
      if(document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
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