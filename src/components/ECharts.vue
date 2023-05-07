<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "ECharts",
  props: {
    isAxis: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default () {
        return {
          title: null,
          series: [],
          xData: [],
          legend: []
        }
      }
    }
  },
  data () {
    return {
      hasAxisOptions: {
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [],
        legend: {
          data: []
        },
        tooltip: {
          trigger: 'axis'
        },
      },
      pieOptions: {
        title: {
          text: null,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: []
      }
    }
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart () {
      this.initChartData()
      echarts.init(this.$refs.echart).setOption(this.options)
    },
    initChartData () {
      if (this.isAxis) {
        this.hasAxisOptions.xAxis.data = this.chartData.xData
        this.hasAxisOptions.series = this.chartData.series
        this.hasAxisOptions.legend.data = this.chartData.legend
      } else {
        this.pieOptions.title.text = this.chartData.title
        this.pieOptions.series = this.chartData.series
      }
    }
  },
  computed: {
    options () {
      return this.isAxis ? this.hasAxisOptions : this.pieOptions
    }
  }
}
</script>
