<template>
  <el-row :gutter="20">
    <el-col :span="8" class="left">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="用户头像" class="userImg">
          <div class="userInfo">
            <h2 class="userName">Admin</h2>
            <h5 class="userPermission">超级管理员</h5>
          </div>
        </div>
        <div class="loginInfo">
          <p class="info">上次登陆时间: <span>2022-07-27</span></p>
          <p class="info">上次登陆地点: <span>河南</span></p>
        </div>
      </el-card>
      <el-card shadow="hover">
        <el-table
          :data="tableData">
          <el-table-column
              v-for="(key, value, index) in tableHeader"
              :key="index"
              :prop="value"
              :label="key"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" class="right">
      <div class="num">
        <el-card v-for="i in countData" :key="i.name" :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon" :class="`el-icon-${i.icon}`" :style="{backgroundColor: i.color}"></i>
          <div class="detail">
            <p class="num">¥{{i.value}}</p>
            <p class="introduction">{{i.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" class="line-chart-container" body-style="height: 100%">
        <ECharts class="lineChart" :chart-data="lineChartData" :is-axis="true"/>
      </el-card>
      <div class="graph">
        <el-card shadow="hover"  body-style="height: 100%">
          <ECharts :chart-data="barChartData" :is-axis="true"/>
        </el-card >
        <el-card shadow="hover"  body-style="height: 100%">
          <ECharts :is-axis="false" :chart-data="pieChartData" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import {getData} from "@/api/data";
import ECharts from '../../components/ECharts'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    ECharts
  },
  data(){
    return {
      userImg: require('../../assets/images/user.png'),
      tableHeader: {
        name: '名称',
        todayBuy: '日销量',
        monthBuy: '月销量',
        totalBuy: '总销量'
      },
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      lineChartData: {
        series: [],
        xData: [],
        legend: []
      },
      barChartData: {
        series: [],
        xData: [],
        legend: []
      },
      pieChartData: {
        series: []
      }
    }
  },
  mounted(){
      // getData().then( res => {
      //   const {code, data} = res.data
      //   if (code === 20000){
      //     // 绘制屏幕左下方的数据
      //     this.tableData = data.tableData
      //
      //     // 获取折线图数据
      //     const orderData = data.orderData
      //     const orderDataKey = Object.keys(orderData.data[0])
      //     const series = []
      //     orderDataKey.forEach(key => {
      //       series.push({
      //         data: orderData.data.map(item => item[key]),
      //         type: 'line',
      //         name: key
      //       })
      //     })
      //     this.lineChartData.series = series
      //     this.lineChartData.xData = orderData.date
      //     this.lineChartData.legend = orderDataKey
      //
      //     // 获取柱状图数据
      //     const userData = data.userData
      //     const barChartSeries = [
      //       {
      //         name: '新增用户',
      //         type: 'bar',
      //         data: userData.map(item => item['new'])
      //       },
      //       {
      //         name: '活跃用户',
      //         type: 'bar',
      //         data: userData.map(item => item['active'])
      //       }
      //     ]
      //     this.barChartData.xData = userData.map(item => item['date'])
      //     this.barChartData.series = barChartSeries
      //     this.barChartData.legend = ['新增用户', '活跃用户']
      //
      //     // 获取饼图数据
      //     const videoData = data.videoData
      //     const pieChartSeries = [
      //       {
      //         type: 'pie',
      //         data: videoData
      //       }
      //     ]
      //     this.pieChartData.series = pieChartSeries
      //   }
      // })
  }
}
</script>

<style scoped lang="less">
  .left{
    .el-card{
      margin-bottom: 20px;
    }
    .user{
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 2px solid #c9c8c8;
      .userImg{
        width: 150px;
        border-radius: 50%;
      }
      .userInfo{
        margin-left: 20px;
        .userPermission{
          color: #a8a4a4;
          font-weight: 400;
        }
      }
    }
    .loginInfo{
      margin-top: 20px;
      .info{
        margin-bottom: 10px;
        font-weight: 400;
        font-size: 13px;
        color: #a8a4a4;
        span{
          margin-left: 50px;
        }
      }
    }
  }
  .right{
    .num{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-card{
        width: 32%;
        margin-bottom: 20px;
        i{
          width: 80px;
          line-height: 80px;
          text-align: center;
          color: white;
        }
        .detail{
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 10px;
          padding: 10px 0;
          .num{
            font-size: 25px;
            margin-bottom: 10px;
          }
          .introduction{
            font-size: 13px;
            color: #999;
          }
        }
      }
    }
    .line-chart-container{
      height: 280px;
      .lineChart{
        height: 100%;
      }
    }
    .graph{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .el-card{
        width: 48%;
        height: 260px;
        div{
          height: 100%;
        }
      }
    }
  }
</style>