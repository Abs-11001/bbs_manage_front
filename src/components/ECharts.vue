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
      default: false
    },
    isBar: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Object,
      default () {
        return {
          title: null,
          series: [],
          xData: [],
          legend: [],
          dataset: {},
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
      },
      barOptions: {
        dataset: {
          source: []
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [],
        tooltip: {},
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
      } else if (!this.isBar) {
        this.pieOptions.title.text = this.chartData.title
        this.pieOptions.series = this.chartData.series
      } else if(this.isBar) {
        this.barOptions.dataset.source = this.chartData.dataset
        this.barOptions.series = this.chartData.series
      }
    }
  },
  computed: {
    options () {
      if(this.isAxis) return this.hasAxisOptions
      else {
        if(this.isBar) return this.barOptions
        else return this.pieOptions
      }
    }
  }
}
</script>
