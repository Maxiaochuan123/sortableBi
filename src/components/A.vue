<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
import echarts from '../../static/script/echarts.js'
export default {
  data(){
    return{
      leftechartSource: {
        Id: 'a',
        Name: '车辆年销售量',
        tooltip: {},
        grid: [{x: '15%', y: '7%', width: '76%', height: '62%'}],
        xAxis: {
          data: [],
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
        color:['#00bade'],
        series: [{
            name: '销量',
            type: 'bar',
            data: [
              {value: 5, name:''}, 
              {value: 20, name:''},
              {value: 36, name:''}, 
              {value: 10, name:''},
              {value: 10, name:''}, 
              {value: 20, name:''}, 
            ]
        }]
      },
      completeData:{
          title: {
            text: '车辆年销售量',
            x:'center',
            textStyle:{
              color:'#fff'
            }
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data:["销量"],
            textStyle:{
              color:'#fff'
            }
          },
          xAxis: {
            data: ["恩佐","911","diablo","zonda","EB110","CCXR"],
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
          color:['#00bade'],
          series: [{
            name:'销量',
            type: 'bar',
            center: ['50%', '55%'],
            data: [
              {value: 5, name:'法拉利-恩佐'}, 
              {value: 20, name:'保时捷911'},
              {value: 36, name:'兰博基尼-diablo'}, 
              {value: 10, name:'帕加尼-zonda'},
              {value: 10, name:'布加迪-EB110'}, 
              {value: 20, name:'克尼赛格-CCXR'}, 
            ]
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
