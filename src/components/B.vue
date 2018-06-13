<template>
    <div class="currencyBox">
      <div class="leftechartbox" :id="leftechartSource.Id" :data-echart="leftechartSource.Id + 0" :data-name="leftechartSource.Name" draggable="true" @dragstart="emit_dragstart($event)"></div>
        <p>{{leftechartSource.Name}}</p>
    </div>
</template>
<script>
  import echarts from '../../static/script/echarts.js'
  export default {
    name: "B",
    data(){
      return{

        // 用于左侧菜单栏渲染 “基础数据”
        leftechartSource: {
          Id: 'b',
          Name: '车辆广告投放',
          series : [{
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['50%', '44%'],
            data:[
              {value:335},
              {value:310},
              {value:234},
              {value:135},
              {value:1548}
            ]
          }],
          color: ['#4A7391','#51D6C2','#7A9FC3','#2DC8AC','#244776','#00bade']
        },

        // 用于右侧拖拽后渲染 “完整数据”
        completeData:{
            title : {
              text: '车辆广告投放',
              x:'center',
              textStyle:{
                color:'#fff'
              }
            },
            tooltip : {},
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
              textStyle:{
                color:'#fff'
              }
            },
            series : [{
              name: '访问来源',
              type: 'pie',
              center: ['50%', '55%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }],
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
