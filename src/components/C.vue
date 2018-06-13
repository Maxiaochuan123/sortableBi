<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
  import echarts from '../../static/script/echarts.js'
  export default {
    name: "C",
    data(){
      return{

        // 用于左侧菜单栏渲染 “基础数据”
        leftechartSource: {
          Id: 'c',
          Name: '回报点数量',
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function (params) {
                  var tar = params[1];
                  return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
              }
            },
            grid: [{x: '28%', y: '7%', width: '60%', height: '62%'}],
            xAxis: {
                type : 'category',
                splitLine: {show:false},
                data : [],
                axisLine:{
                  lineStyle:{
                    color: '#fff'
                  }
                }
            },
            yAxis: {
                type : 'value',
                axisLine:{
                  lineStyle:{
                    color: '#fff'
                  }
                }
            },
            series : [{
            name: '辅助',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
            },
            {
                name: '生活费',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data:[2900, 1200, 300, 200, 900, 300]
            }],
            color: ['#51D6C2']
        },

        // 用于右侧拖拽后渲染 “完整数据”
        completeData:{
            title : {
              text: '回报点数量',
              x:'center',
              textStyle:{
                color:'#fff'
              }
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function (params) {
                  var tar = params[1];
                  return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
              }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type : 'category',
                splitLine: {show:false},
                data : ['1','2','3','4','5','6'],
                axisLine:{
                  lineStyle:{
                    color: '#fff'
                  }
                }
            },
            yAxis: {
                type : 'value',
                axisLine:{
                  lineStyle:{
                    color: '#fff'
                  }
                }
            },
            series : [{
            name: '辅助',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
            },
            {
                name: '生活费',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data:[2900, 1200, 300, 200, 900, 300]
            }],
            color: ['#51D6C2']
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
