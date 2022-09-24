<template>
  <div class="flex card-list">
    <div class="left-bar">
      <a-list
        rowKey="id"
        :grid="{gutter: 24, lg: 1, md: 1, sm: 1, xs: 1}"
        :dataSource="dataSource"
        class="card-list"
      >
        <a-list-item slot="renderItem" slot-scope="item" @click="select(item)">

          <a-card :hoverable="true" :class="{&quot;cc-selected&quot;: item.selected}">
            <a-card-meta>
              <a slot="title">{{ item.title }}</a>
              <div class="cc-card" slot="description"><span><a-icon type="environment"/> 具体地址</span></div>

              <div class="cc-card" style="display: block" slot="description">
                <div class="mrg-bottom drop-down-show" v-for="(num, index) in item.number">
                  <img :src="ccIconPer" alt="icon">
                  <span v-if="index === &quot;room&quot;">
                    <span class="label"> 机房数量</span>
                    <span class="number-color">{{ num }}</span>
                  </span>
                  <span v-if="index === &quot;box&quot;">
                    <span class="label"> 机柜数量</span>
                    <span class="number-color">{{ num }}</span>
                  </span>
                  <span v-if="index === &quot;vm&quot;">
                    <span class="label"> 物理机数量</span>
                    <span class="number-color">{{ num }}</span>
                  </span>
                  <span v-if="index === &quot;switch&quot;">
                    <span class="label"> 交换机数量</span>
                    <span class="number-color">{{ num }}</span>
                  </span>
                </div>
              </div>
            </a-card-meta>
          </a-card>

        </a-list-item>
      </a-list>
    </div>
    <div class="right-content">
      <a-list
        rowKey="id"
        :grid="{gutter: 24, lg: 2, md: 2, sm: 1, xs: 1}"
        :dataSource="selectData.bundles"
        class="card-list"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ item.title }}</a>
              <div class="meta-content" slot="description">{{ item.des }}</div>
              <div class="cc-card mrg0B" slot="description">
                <div class="flex-1" v-for="(powerInfo, index) in item.power">
                  <span v-if="index === &quot;all&quot;">总算力：{{ powerInfo }}</span>
                  <span v-if="index === &quot;on&quot;">已售算力：{{ powerInfo }}</span>
                  <span v-if="index === &quot;off&quot;">剩余算力：{{ powerInfo }}</span>
                </div>
              </div>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>

</template>
<script>
import { ccIconPer } from '@/core/icons'
const dataSource = [
  {
    id: 1,
    title: '和林格尔数据中心1',
    selected: false,
    number: {room: 2000, box: 23020, vm: 1027010, switch: 6012},
    bundles: [{title: '高性能计算资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: '高性能计算资源池2', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: 'GPU资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}}]
  },
  {
    id: 2,
    title: '和林格尔数据中心2',
    selected: false,
    number: {room: 500, box: 300, vm: 21750, switch: 450},
    bundles: [{title: '高性能计算资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: '高性能计算资源池2', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: 'GPU资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: 'GPU资源池2', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}}]
  },
  {
    id: 3,
    title: '阿里云数据中心',
    selected: false,
    number: {room: 280, box: 108, vm: 102356, switch: 300},
    bundles: [{title: '高性能计算资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: '阿里云资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: '阿里云资源池2', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: '阿里云资源池3', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: 'GPU资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}}]
  },
  {
    id: 4,
    title: '华为云数据中心',
    selected: false,
    number: {room: 300, box: 10000, vm: 3002450, switch: 3050},
    bundles: [{title: '高性能计算资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: '华为云资源池', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}},
      {title: 'GPU资源池1', des: '高性能计算资源池1描述说明高性能计算资源池1描述说明', power: {all: '200305', on: '77654', off: '122,651'}}]
  },
]
export default {
  data () {
    return {
      dataSource,
      selectData: dataSource[0]
    }
  },
  methods: {
    select (item) {
      dataSource.forEach(d => {
        d.selected = d.id === item.id
      })
      this.selectData = item
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/components/index.less";
@theme-color: #02A04E;
.mrg-bottom {
  margin-bottom: 1.75em;
}
@keyframes slide-down{
  0%{transform: scale(1,0);}
  100%{transform: scale(1,1);}
}

.flex {
  display: flex;
}
.mrg0B {
  margin-bottom: 0 !important;
}
.flex-1 {
  flex: 1;
  color: rgba(0, 0, 0, 0.85);
}

.left-bar {
  flex: 1;
  :deep(.ant-list-item) {
    padding: 0 !important;
    margin-bottom: 0 !important;
    .ant-card {
      height: 108px;
      overflow: hidden;
    }
    .ant-card-meta-title {
      &>a {
        font-size: 20px !important;
      }
    }
  }
  .number-color {
    float: right;
    color: #ff6a00;
    font-size: 24px;
    line-height: 1;
  }
}
.right-content {
  padding-left: 12px;
  flex: 4;
}
.cc-selected {
  animation: slide-down .3s linear;
  transition: .3s linear;
  transform-origin: 0;
  height: auto !important;
  border: 1px solid @theme-color;
  :deep(.ant-card-meta-title) {
    &>a {
      color: @theme-color !important;
    }
  }
}
:deep(.ant-btn-dashed:hover),
:deep(.ant-btn-dashed:focus) {
  border-color: @theme-color !important;
  color: @theme-color;
}
.pad40L {
  padding-left: 40px;
  color: @theme-color !important;
  font-size: 18px;
  .unit{
    font-size: 14px;
  }
}
.line-height-2 {
  line-height: 2;
}
.cc-card {
  .resourceBundle{
    color: #fff;
    display: block;
    width: 40px;
    text-align: center;
    border-radius: 13px 0;
    background-color: #ff6a00;
  }
  .label {
    flex: 1;
  }
  margin-bottom: 1.75em;
  display: flex;
  .content {
    flex: 2;
    color: rgba(0, 0, 0, 0.85);
  }
  .dataCenters li{
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    &:not(:first-child) {
      padding-top: 8px;
    }
  }
}

.card-list {

  :deep(.ant-row .ant-col) {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
  :deep(.ant-card-body:hover) {
    .ant-card-meta-title>a {
      color: @theme-color;
    }
  }

  :deep(.ant-card-meta-title) {
    margin-bottom: 12px;

    &>a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0,0,0,.85);
    }
  }

  :deep(.meta-content) {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 21px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1.05em;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, .45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}

</style>