<template>
  <el-row :gutter="20">
    <el-col :span="8" class="left">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="用户头像" class="userImg">
          <div class="userInfo">
            <h2 class="userName">{{userName}}</h2>
            <h5 class="userPermission">超级管理员</h5>
          </div>
        </div>
        <div class="loginInfo">
          <p class="info">上次登陆时间: <span>{{ getLastDay }}</span></p>
        </div>
      </el-card>
      <el-card shadow="hover">
        <el-table
            stripe
            :data="tableData">
          <el-table-column prop="user_id" label="用户名" align="center"></el-table-column>
          <el-table-column prop="nick_name" label="昵称" align="center"></el-table-column>
          <el-table-column prop="roleId" label="身份" width="90" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.roleId === '用户'">{{ scope.row.roleId }}</el-tag>
              <el-tag v-else type="success">{{ scope.row.roleId }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="login_time" label="登录时间" width="170" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" class="right">
      <div class="num">
        <el-card :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon el-icon-picture" style="background-color: #25CCF7"></i>
          <div class="detail">
            <p class="num">{{ count.imageCarouselCount }}</p>
            <p class="introduction">轮播图</p>
          </div>
        </el-card>
        <el-card :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon el-icon-message-solid" style="background-color: #EAB543"></i>
          <div class="detail">
            <p class="num">{{ count.textCarouselCount }}</p>
            <p class="introduction">系统通知</p>
          </div>
        </el-card>
        <el-card :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon el-icon-s-grid" style="background-color: #55E6C1"></i>
          <div class="detail">
            <p class="num">{{ count.announcementCount }}</p>
            <p class="introduction">官网通知</p>
          </div>
        </el-card>
        <el-card :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon el-icon-s-promotion" style="background-color: #D6A2E8"></i>
          <div class="detail">
            <p class="num">{{ count.informationShareCount }}</p>
            <p class="introduction">信息共享</p>
          </div>
        </el-card>
        <el-card :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon el-icon-success" style="background-color: #F97F51"></i>
          <div class="detail">
            <p class="num">{{ count.helpEachOtherCount }}</p>
            <p class="introduction">互帮互助</p>
          </div>
        </el-card>
        <el-card :body-style="{display: 'flex',padding: 0}" shadow="hover">
          <i class="icon el-icon-s-home" style="background-color: #2ec7c9"></i>
          <div class="detail">
            <p class="num">{{ count.treeHoleCount }}</p>
            <p class="introduction">暨阳树洞</p>
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
import ECharts from '../../components/ECharts'
import store from '../../store'
import {getDashboard} from "@/api/dashboard";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    ECharts
  },
  data(){
    return {
      userImg: 'http://file.upload.waheng.fun/' + store.state.loginAbout.avatar,
      userName: store.state.loginAbout.nick_name,
      expireTime: store.state.loginAbout.expire_time,
      tableData: [],
      count: {
        imageCarouselCount: null,
        textCarouselCount: null,
        announcementCount: null,
        informationShareCount: null,
        helpEachOtherCount: null,
        treeHoleCount: null,
      },
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
  computed: {
    getLastDay() {
      const  dd =  new  Date(this.expireTime);
      dd.setDate(dd.getDate() - 2); //获取AddDayCount天后的日期
      const  y = dd.getFullYear();
      const  m = (dd.getMonth()+1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
      const  d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
      return  y + "-" + m + "-" + d;
    }
  },
  mounted(){
    this.getData()
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
  },
  methods: {
    getData() {
      getDashboard().then(res => {
        const {code, data} = res
        if(code === 200) {
          this.count = {...data}
          this.tableData = data.loginRecord
        }
      })
    }
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
