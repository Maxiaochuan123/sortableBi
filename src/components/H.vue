<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
import echarts from '../../static/script/echarts.js'
export default {
  name: "H",
  data(){
    return{
      leftechartSource: {
        Id: 'h',
        Name: '车辆年销售量',
        dataset: {
        source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, '1'],
            [57.1, 78254, '2'],
            [74.4, 41032, '3'],
            [50.1, 12755, '4'],
            [89.7, 20145, '5'],
            [68.1, 79146, '6'],
            [19.6, 91852, '7'],
            [10.6, 101852, '8'],
            [32.7, 20112, '9']
        ]
        },
        grid: [{x: '10%', y: '7%', width: '76%', height: '42%'}],
        xAxis: {
          axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }},
        yAxis: {
          type: 'category',
          axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#4A7391', '#51D6C2'],
            },
            textStyle:{
                color:'#fff'
              }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
      },
      completeData:{
          title: {
            text: '车辆年销售量',
            x:'center',
            textStyle:{
              color:'#fff'
            }
          },
          dataset: {
        source: [
            [89.3, 58212, '1'],
            [57.1, 78254, '2'],
            [74.4, 41032, '3'],
            [50.1, 12755, '4'],
            [89.7, 20145, '5'],
            [68.1, 79146, '6'],
            [19.6, 91852, '7'],
            [10.6, 101852, '8'],
            [32.7, 20112, '9']
        ]
    },
    xAxis: {
          axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }},
        yAxis: {
          type: 'category',
          axisLine:{
            lineStyle:{
              color: '#fff'
            }
          }
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#4A7391', '#51D6C2'],
            },
            textStyle:{
                color:'#fff'
              }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
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
