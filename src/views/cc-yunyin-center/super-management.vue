<template>
  <a-list
    rowKey="id"
    :grid="{gutter: 24, lg: 4, md: 2, sm: 1, xs: 1}"
    :dataSource="dataSource"
    class="card-list"
  >
    <a-list-item slot="renderItem" slot-scope="item" @click="select(item)">
      <template v-if="!item || item.id === undefined">
        <a-button class="new-btn" type="dashed" style="height: 403px">
          <a-icon type="plus"/>
          新增
        </a-button>
      </template>
      <template v-else>
        <a-card :hoverable="true" :class="{&quot;cc-selected&quot;: item.selected}">
          <a-card-meta>
            <a slot="title">{{ item.title }}</a>
            <div class="meta-content" slot="description">{{ item.des }}</div>
            <div class="cc-card" slot="description">
              <div class="label">数据中心</div>
              <ul class="content dataCenters">
                <li v-for="(center, index) in item.dataCenters">{{ center }}</li>
              </ul>
            </div>
            <div class="cc-card" slot="description">
              <div class="label">
                <div>资源池</div>
                <i class="resourceBundle">{{ item.resourceBundle }}</i>
              </div>
              <ul class="content">
                <li v-for="(powerInfo, index) in item.power">
                  <span v-if="index === &quot;all&quot;">总算力：{{ powerInfo }}</span>
                  <span v-if="index === &quot;on&quot;">已售算力：{{ powerInfo }}</span>
                  <span v-if="index === &quot;off&quot;">剩余算力：{{ powerInfo }}</span>
                </li>
              </ul>
            </div>
            <div class="cc-card" slot="description">
              <div class="label line-height-2">总销售额</div>
              <div class="content pad40L"><span class="unit">{{ item.unit }}</span> {{ item.sales }}</div>
            </div>
          </a-card-meta>
        </a-card>
      </template>
    </a-list-item>
  </a-list>
</template>

<script>

const dataSource = []
const defaultData = {
  title: '直营店1',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
  resourceBundle: '5.0',
  power: {all: '200305', on: '77654', off: '122,651'},
  sales: '346,742.99',
  unit: '¥',
  selected: false
}
const aliData = {
  title: '阿里云',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
  resourceBundle: '5.0',
  power: {all: '36544', on: '11600', off: '24,944'},
  sales: '346,572.15',
  unit: '¥',
  selected: false
}
const huaweiData = {
  title: '华为云',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['华为云数据中心1', '华为云数据中心2'],
  resourceBundle: '5.0',
  power: {all: '19343', on: '8001', off: '11342'},
  sales: '266,990.03',
  unit: '¥',
  selected: false
}
dataSource.push({})
for (let i = 0; i < 7; i++) {
  if (!(i % 3)) {
    dataSource.push(Object.assign({id: i}, aliData))
  } else if (!(i % 4)) {
    dataSource.push(Object.assign({id: i}, huaweiData))
  } else {
    dataSource.push(Object.assign( {id: i}, defaultData))
  }

}

export default {
  name: 'SuperManagement',
  data () {
    return {
      dataSource
    }
  },
  methods: {
    select (item) {
      dataSource.forEach(d => {
        d.selected = d.id === item.id
      })
      if (!item.id) {
        dataSource.push({
          id: dataSource.length + 1,
          title: `直营店${dataSource.length + 1}`,
          des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
          dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
          resourceBundle: '5.0',
          power: {all: '', on: '', off: ''},
          sales: '346,572.15',
          unit: '¥',
          selected: false
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/components/index.less";
@theme-color: #02A04E;
.cc-selected {
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
    padding-left: 30px !important;
    padding-right: 30px !important;
    .ant-list-item {
      padding: 20px 0;
    }
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
    height: 50px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1.75em;
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
