<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <!-- Ads begin
      广告代码 真实项目中请移除
      production remove this Ads
    -->
    <!-- Ads end -->

    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <template v-slot:menuHeaderRender>
      <div v-if="!isSupplier">
        <img src="@/assets/helin-logo.png" style="height: 44px;width: 70px"/>
        <a-dropdown>
          <span class="ant-dropdown-link" @click.prevent>
            <span
              style="margin-left: 20px;
    margin-right: 54px;">{{ center }}</span>
            <i class="iconfont icon-down"></i>
          </span>

          <template #overlay>
            <a-menu @click="centerChange">
              <a-menu-item key="运营中心">
                <a href="javascript:;" >运营中心</a>
              </a-menu-item>
              <a-menu-item key="调度中心">
                <a href="javascript:;" >调度中心</a>
              </a-menu-item>
              <a-menu-item key="运维中心">
                <a href="javascript:;">运维中心</a>
              </a-menu-item>
              <a-menu-item key="支付中心">
                <a href="javascript:;">支付中心</a>
              </a-menu-item>
              <a-menu-item key="系统管理">
                <a href="javascript:;">系统管理</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div v-if='isSupplier'>
        <img src="@/assets/helin-logo.png" style="height: 44px;width: 70px"/>
        <span style='padding-left: 30px;'>超算供应商管理</span>
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:headerContentRender>

    </template>

    <setting-drawer v-if="isDev" :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0;">
        This is SettingDrawer custom footer content.
      </div>
    </setting-drawer>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view :key="key" />
  </pro-layout>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import Ads from '@/components/Other/CarbonAds'
import { asyncRouterMap } from '@/config/router.config.js'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter,
    Ads
  },
  data () {
    return {
      // preview.pro.antdv.com only use.
      isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
      // end
      isDev: process.env.NODE_ENV === 'development' || process.env.VUE_APP_PREVIEW === 'true',

      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false,
      center: '运营中心',
      isSupplier: false,
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    key() {
      return this.$route.path + Math.random()
    }
  },
  created () {
    console.log(this.$route.path)
    this.isSupplier = [
      '/my-shop',
      '/my-center',
      '/my-rb',
      '/my-product',
      '/my-request/workspace',
      '/my-request/request-list',
      '/my-activity',
      '/my-discount'
    ].includes(this.$route.path);
    const routes = asyncRouterMap.find(item => item.path === '/')
    if (this.isSupplier) {
      this.menus = ((routes && routes.children) || []).filter(c => [
        'my-shop',
        'my-center',
        'my-rb',
        'my-product',
        'my-request',
        'my-activity',
        'my-discount'
      ].includes(c.name))
    } else {
      this.menus = ((routes && routes.children) || []).filter(c => ['productapproval',
        'operateBigScreen',
        'yunyinDataCenter',
        'productcapacitymanagement',
        'aisystem',
        'discountmanagement',
        'activitymanagement',
        'admanagement',
        'resourcemanagement',
        'statistics',
        'dispatchcenter',
        'hashratebilling',
        'rb',
        'compliance',
        'workordermanagement',
        'operations'].includes(c.name))
    }

    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }
  },
  methods: {
    i18nRender,
    centerChange({ key }) {
      this.center = key
      const a = {
        '运营中心': [
          'operateBigScreen',
          'yunyinDataCenter',
          'productapproval',
          'productcapacitymanagement',
          'aisystem',
          'rb',
          'discountmanagement',
          'activitymanagement',
          'admanagement',
          'resourcemanagement',
          'statistics',
          'dispatchcenter',
          'hashratebilling',
          'compliance',
          'workordermanagement',
          'operations'],
        '调度中心': ['dispatch', 'dispatch2', 'dispatch3'],
        '运维中心': [
          'devopsBigScreen',
          'dataCenter',
          'om', 
          'params',
          'orginazation',
          'product',
          'monitor',
          'visitcontrol',
          'datacentermanagement'],
        '支付中心': ['pay','pay1','pay2','pay3','pay4','pay5','pay6','pay7'],
        '系统管理': ['system', 'notice'],
      }
      const routes = asyncRouterMap.find(item => item.path === '/')
      this.menus = ((routes && routes.children) || []).filter(c => a[key].includes(c.name))
    },
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    }
  }
}
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
