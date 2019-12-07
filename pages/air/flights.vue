<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          //航班列表
          <flights-item v-for="(item,index) in pageIitem" :key="index"  :data="item"></flights-item>
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
import { airs } from "@/axios/index.js";

export default {
  data() {
    return {
      flightsIitem: [], //这个是获取回来全部的数据
      pageIitem: [], //这个是分页数据
      pageSize: 5
    };
  },
  methods: {
      //这是渲染页面的数据
    getpageSize(value){
        // 展示页面数
        const num = (value-1)*this.pageSize
         this.pageIitem = this.flightsIitem.slice(num,num+this.pageSize)
    },
      //这是分页内置函数
    sizeChange(value) {
        this.pageSize = value
       this.getpageSize(value)
    },
     //这是分页内置函数 分页页数改变就会获得分页当前页面数据 
     currentChange(value){
       this.getpageSize(value)
     }
  },
  components: { FlightsListHead, FlightsItem },
  async created() {
    let res = await airs(this.$route.query);
    this.flightsIitem = res.data.flights;
     this.getpageSize(1)
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