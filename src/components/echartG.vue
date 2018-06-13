<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
import echarts from '../../static/script/echarts.js'
export default {
  name: "echartG",
  data(){
    return{
      leftechartSource: {
        Id: 'g',
        Name: '月销售点',
        grid: [{x: '8%', y: '7%', width: '86%', height: '52%'}],
        xAxis: {
          axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }
        },
        yAxis: {
          axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }
        },
        series: [{
            symbolSize: 10,
            data: [
                [10.0, 8.04],
                [8.0, 6.95],
                [13.0, 7.58],
                [9.0, 8.81],
                [11.0, 8.33],
                [14.0, 9.96],
                [6.0, 7.24],
                [4.0, 4.26],
                [12.0, 10.84],
                [7.0, 4.82],
                [5.0, 5.68]
            ],
            type: 'scatter'
        }],
        color: ['#00BADE']
      },
      completeData:{
          title: {
            text: '月销售点',
            x:'center',
            textStyle:{
              color:'#fff'
            }
          },
            xAxis: {
            axisLine:{
              lineStyle:{
                color: '#fff'
              }
            }
          },
            yAxis: {
              axisLine:{
                lineStyle:{
                  color: '#fff'
                }
              }
            },
            series: [{
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                type: 'scatter',
                color: ['#00BADE']
            }],
        }
    }
  },
  mounted(){
     // 默认图表数据
      var myChart = echarts.init(document.querySelector('#' + this.leftechartSource.Id))
      myChart.setOption(this.leftechartSource)
  },
  methods:{
    emit_dragstart(e){
      this.$emit('parent_dragstart', e, this.completeData)
    }
  }
}
</script>
