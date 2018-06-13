<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
import echarts from '../../static/script/echarts.js'
export default {
  name: "E",
  data(){
    return{
      leftechartSource: {
        Id: 'e',
        Name: '雷达反馈射频面',
        angleAxis: {
        type: 'category',
        data: [],
        z: 10
        },
        angleAxis: {
              type: 'category',
              data: ['', '', '', '', '', '', ''],
              z: 10,
              axisLine:{
              lineStyle:{
                color: '#fff'
              }
            }
          },
        radiusAxis: {
          axisLine:{
              lineStyle:{
                color: '#fff'
              }
            }
        },
        polar: {
          axisLine:{
              lineStyle:{
                color: '#fff'
              }
            },
          radius : '70%',
          center: ['50%', '38%'],
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a',
            radius : '70%',
          center: ['50%', '38%'],
        }, {
            type: 'bar',
            data: [2, 4, 6, 1, 3, 2, 1],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a',
            radius : '70%',
          center: ['50%', '38%'],
        }, {
            type: 'bar',
            data: [1, 2, 3, 4, 1, 2, 5],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a',
            radius : '70%',
          center: ['50%', '38%'],
        }],
        color: ['#4A7391','#51D6C2','#7A9FC3','#2DC8AC','#244776','#00bade']
      },
      completeData:{
          title: {
            text: '雷达反馈射频面',
            x:'center',
            textStyle:{
              color:'#fff'
            }
          },
          angleAxis: {
              type: 'category',
              data: ['一', '二', '三', '四', '五', '六', '日'],
              z: 10,
              axisLine:{
              lineStyle:{
                color: '#fff'
              }
            }
          },
          radiusAxis: {
            axisLine:{
              lineStyle:{
                color: '#fff'
              }
            }
          },
          polar: {
            axisLine:{
              lineStyle:{
                color: '#fff'
              }
            },
            radius : '70%',
          center: ['50%', '50%'],
          },
          series: [{
              type: 'bar',
              data: [1, 2, 3, 4, 3, 5, 1],
              coordinateSystem: 'polar',
              name: 'A',
              stack: 'a'
          }, {
              type: 'bar',
              data: [2, 4, 6, 1, 3, 2, 1],
              coordinateSystem: 'polar',
              name: 'B',
              stack: 'a'
          }, {
              type: 'bar',
              data: [1, 2, 3, 4, 1, 2, 5],
              coordinateSystem: 'polar',
              name: 'C',
              stack: 'a'
          }],
          legend: {
            orient: 'vertical',
              left: 'left',
              show: true,
              data: ['A', 'B', 'C'],
              textStyle:{
              color:'#fff'
            }
          },
          color: ['#4A7391','#51D6C2','#7A9FC3','#2DC8AC','#244776','#00bade']
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