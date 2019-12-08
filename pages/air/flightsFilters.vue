<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        广州 - 上海
        /
        2019-06-17
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="com.org_airport_name" placeholder="起飞机场" :clearable="true">
          <el-option :label="item" v-for="(item,index) in data.airport" :key="index" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="com.flightTimes" placeholder="起飞时间" :clearable="true">
          <el-option
            :label="`${item.from}:00 - ${item.to}   :00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="com.airline_name" placeholder="航空公司" :clearable="true">
          <el-option :label="item" v-for="(item,index) in data.company" :key="index" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="com.plane_size" placeholder="机型" :clearable="true">
          <el-option
            :label="item.name"
            v-for="(item,index) in size"
            :key="index"
            :value="item.plane_size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //存储条件数据
      com: {
        org_airport_name: "", // 机场
        flightTimes: "", // 出发时间
        airline_name: "", // 航空公司
        plane_size: "" // 机型大小,
      },
      size: [
        { name: "大", plane_size: "L" },
        { name: "中", plane_size: "M" },
        { name: "小", plane_size: "S" }
        // { name: "初始值", plane_size: "" }
      ]
    };
  },
  props: {
    data: {},
    filterData: {}
  },
  watch: {
    // com: {
    //   // handler是一个函数，只能叫这个名字，表示对象中属性变化时的处理函数，它也有newVal
    //   handler() {
    //     //   console.log(this.filterData);
    //     let arr = [...this.filterData];
    //     // console.log(this.com);
    //     //遍历的是条件 过滤的是过滤的是原始数组  所以 需要 每个下拉的的value值来 助我判断需要  company: "东航"
    //     for (var i in this.com) {
    //       if (i === "airport" && this.com[i] !== "") {
    //         //判断机场
    //         arr = arr.filter(v => v.org_airport_name === this.com[i]);
    //       } else if (i === "flightTimes" && this.com[i] !== "") {
    //         const [from, to] = this.com[i].split(","); // [6,12]
    //         arr = arr.filter(v => {
    //         // 出发时间小时
    //           const start = +v.dep_time.split(":")[0];
    //           return start >= from && start < to;
    //         });
    //       } else if (i === "company" && this.com[i] !== "") {
    //         //判断航空公司
    //         arr = arr.filter(v => v.airline_name === this.com[i]);
    //       } else if (i === "plane_size" && this.com[i] !== "") {
    //         //判断机型
    //         arr = arr.filter(v => v.plane_size === this.com[i]);
    //       }
    //     }
    //     this.$emit("newData",arr)
    //   },
    //   // deep:true表示深度监听
    //   deep: true
    // }
     com: {
      // handler是一个函数，只能叫这个名字，表示对象中属性变化时的处理函数，它也有newVal
      handler() {
        //   console.log(this.filterData);
        let arr = [...this.filterData];
        // console.log(this.com);
        //遍历的是条件 过滤的是过滤的是原始数组  所以 需要 每个下拉的的value值来 助我判断需要  company: "东航"
        for (var i in this.com) {
          if ((i === "org_airport_name"|| i === "airline_name"||i === "plane_size") && this.com[i] !== "") {
            //判断机场  航空公司 
            arr = arr.filter(v => v[i] === this.com[i]);
          } else if (i === "flightTimes" && this.com[i] !== "") {
            const [from, to] = this.com[i].split(","); // [6,12]
            arr = arr.filter(v => {
            // 出发时间小时
              const start = +v.dep_time.split(":")[0];
              return start >= from && start < to;
            });
          }
        }
        this.$emit("newData",arr)
      },
      // deep:true表示深度监听
      deep: true
    }
  },
  methods:{
    handleFiltersCancel(){
      this.com =  {
        airport: "", // 机场
        flightTimes: "", // 出发时间
        company: "", // 航空公司
        plane_size: "" // 机型大小,
      }
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>