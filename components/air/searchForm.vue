<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
          @blur="showdepart"
          v-model="form.departCity"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          placeholder="请搜索到达城市"
          :highlight-first-item="true"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          @blur="showdest"
          v-model="form.destCity"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { airCities } from "@/axios/index.js";
import { resolve } from "q";
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      departArr: [],
      destArr: [],
      currentTab: 0
    };
  },
  methods: {
    // 发送函数
    async getCityData(value) {
      let res = await airCities(value);
      const DELsort = res.data.data.filter(item => {
        if (!item.sort) {
          return false;
        }
        return true;
      });
      console.log(DELsort);
      const arr = DELsort.map(item => {
        return {
          ...item,
          value: item.name.replace("市", "")
        };
      });
      //   console.log(typeof arr );
      return arr;
    },
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    querySearchAsync(value, cb) {
      //   let res = await airCities(value);
      //   console.log(res);
      //   let arr = res.data.data.map(item => {
      //     return {
      //       ...item,
      //       value: item.name.replace("市", "")
      //     };
      //   });
      this.getCityData(value).then(res => {
        if (value !== "") {
          this.departArr = res;
        }
        let arr = res
        cb(arr); //cb就是显示出来的搜索列表
      });
    },
    // 出发城市下拉选择时触发
    handleSelect(item) {
      this.form.departCode = item.sort;
      this.form.departCity = item.value; //选中列表就触发
    },
    // 出发城市 失去焦点时候 自动把搜索到的数组第一项放在 input上
    showdepart() {
      // console.log(this.form.departCity !=='');
      // console.log(this.departArr.length > 0);
      // console.log((this.departArr.length > 0) && (this.form.departCity !==''));
      if (this.departArr.length > 0 && this.form.departCity !== "") {
        this.form.departCode = this.departArr[0].sort;
        this.form.departCity = this.departArr[0].value;
      } else if (this.form.departCity === "") {
        this.form.departCode = "";
        this.form.departCity = "";
      }
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      this.getCityData(value).then(res => {
        if (value !== "") {
          this.destArr = res;
        }
        let arr = res
        cb(arr); //cb就是显示出来的搜索列表
      });
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCode = item.sort;
      this.form.destCity = item.value;
    },
    // 目标城市 失去焦点时候 自动把搜索到的数组第一项放在 input上
    showdest() {
      console.log(234);
      if (this.destArr.length > 0 && this.form.destCity !== "") {
        this.form.destCode = this.destArr[0].sort;
        this.form.destCity = this.destArr[0].value;
      } else if (this.form.destCity === "") {
        this.form.destCode = "";
        this.form.destCity = "";
      }
    },
    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发换 目标城市切换时触发
    handleReverse() {
      const showarr = this.departArr;
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
      this.departArr = this.destArr;
      this.destArr = showarr;
    },

    // 提交表单是触发
    handleSubmit() {
      this.$router.push({ path: "/air/flights", query: this.form });
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
