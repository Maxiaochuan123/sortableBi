<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
import echarts from '../../static/script/echarts.js'
export default {
  name: "F",
  data(){
    return{
      leftechartSource: {
        Id: 'f',
        Name: '关键节点',
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }
        },
        grid: [{x: '18%', y: '7%', width: '70%', height: '52%'}],
        yAxis: {
            type: 'value',
            axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            symbol: 'triangle',
            symbolSize: 20,
            lineStyle: {
                normal: {
                    color: '#51D6C2',
                    width: 2,
                    type: 'dashed'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: '#7A9FC3',
                    color: '#00BADE'
                }
            }
        }]
      },
      completeData:{
          title: {
            text: '关键节点',
            x:'center',
            textStyle:{
              color:'#fff'
            }
          },
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisLine:{
                lineStyle:{
                  color: '#fff'
                }
              }
          },
          yAxis: {
              type: 'value',
              axisLine:{
                lineStyle:{
                  color: '#fff'
                }
              }
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'line',
              symbol: 'triangle',
              symbolSize: 20,
              lineStyle: {
                normal: {
                    color: '#51D6C2',
                    width: 2,
                    type: 'dashed'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: '#7A9FC3',
                    color: '#00BADE'
                }
            }
          }]
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
