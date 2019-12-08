<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <!-- 我这里传过去的值必须都是新数据 不能是筛选过得数据 -->
          <FlightsFilters :data="filter" :filterData="filterData" @newData="newData"></FlightsFilters>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          <!-- //航班列表 -->
          <flights-item v-for="(item,index) in pageIitem" :key="index" :data="item"></flights-item>
          <el-pagination
            layout="prev, pager, next ,jumper,total,slot,sizes"
            :total="flightsIitem.length"
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[2, 3, 5, 10]"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/pages/air/flightsListHead.vue";
import FlightsItem from "@/pages/air/flightsItem.vue";
import FlightsFilters from "@/pages/air/flightsFilters.vue";

import { airs } from "@/axios/index.js";

export default {
  data() {
    return {
      flightsIitem: [], //这个是获取回来全部的数据
      pageIitem: [], //这个是分页数据
      pageSize: 5,
      filter: [],
      filterData: [] //这个是发送过去的数据
    };
  },
  methods: {
    //这是渲染页面的数据
    getpageSize(value) {
      // 展示页面数
      const num = (value - 1) * this.pageSize;
      this.pageIitem = this.flightsIitem.slice(num, num + this.pageSize);
    },
    //这是分页内置函数
    sizeChange(value) {
      this.pageSize = value;
      this.getpageSize(value);
    },
    //这是分页内置函数 分页页数改变就会获得分页当前页面数据
    currentChange(value) {
      this.getpageSize(value);
    },
    //这个是将筛选回来的结果 重新渲染
    newData(e) {
      this.flightsIitem = e
      this.getpageSize(1)
    }
  },
  components: { FlightsListHead, FlightsItem, FlightsFilters },
  async created() {
    let res = await airs(this.$route.query);
    this.flightsIitem = res.data.flights;
    this.filterData = res.data.flights;
    this.getpageSize(1);
    this.filter = res.data.options;
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>