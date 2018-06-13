<template>
  <div class="box">
    <div id="left" v-if="take_Up">

      <!-- 收入箭头 -->
      <div class="takeUp" @click="takeUp"><i :class="take_Up ? 'iconfont icon-zuo' : 'iconfont icon-you'"></i></div>

      <!-- 新增 通用 Model -->
      <div class="currencyModel" v-if="currencyModel">
        <div class="close" @click="close"><i class="iconfont icon-cuowu"></i></div>
        <div class="title">新增通用图表</div>
        <!-- 图表 -->
        <div class="chartContent">
          <div class="scrollChartBox" v-for="(item,index) in currencyAddData" :key="index" @click="scrollChartBoxClick($event, item.Type)">
            <div class="scrollChart" :id="item.Id"></div>
              <p>{{item.Type}}</p>
          </div>
        </div>
        <!-- 表单 -->
        <div class="scrollChartFrom">
          
        </div>
      </div>

      <!-- 新增 专题 Model -->
      <div class="specialModel" v-if="specialModel">
        <div class="close" @click="close"><i class="iconfont icon-cuowu"></i></div>
        <div class="title">新增专题</div>
        <el-form :model="specialFormData" :rules="rules" ref="specialFormData" label-width="100px" class="specialForm">
          <el-form-item label="专题名称：" prop="specialTitle">
            <el-input v-model="specialFormData.specialTitle" clearable></el-input>
          </el-form-item>
          <el-form-item label="专题链接：" prop="specialUrl">
            <el-input v-model="specialFormData.specialUrl" clearable></el-input>
          </el-form-item>
          <el-form-item label="新增日期：" prop="specialTime">
            <el-date-picker v-model="specialFormData.specialTime" type="date"  size="large" format="yyyy 年 MM 月 dd 日" value-format="timestamp"  placeholder="选择日期"  class="fromInput"></el-date-picker>   
          </el-form-item>
          <div class="specialAddBtn" @click="specialAddSubmit('specialFormData')">新增</div>
        </el-form>
      </div>

    <!-- 切换 通用  / 专题 -->
    <div class="searchBox">
      <div class="search2">
      <div class="switch">
        <span @click="clickSwitchBox1($event)">{{switchText1}}<i :class=" switchBox == true ? 'iconfont icon-xiajiantou' :  'iconfont icon-shangjiantou'"></i></span>
        <span @click="clickSwitchBox2($event)" v-show="switchBox">{{switchText2}}</span>
      </div>

    <!-- 新增专题按钮 -->
    <div class="specialAdd" @click="specialAdd"><i class="iconfont icon-xinzeng"></i></div>

    <input type="text" v-model="searchInput" placeholder="搜 索" @focus="searchFocus" @blur="searchBlur" @keyup="deletKeyDown($event)">
    <span class="clearVal" v-show="clearVal" @click="clickClearVal">x</span>
    <span class="searchGo" @click="searchGo"><i class="fa fa-search"></i></span>
      <ul class="autoCompletion" v-show="fuzzyQueryList_show">
        <li @click="revocation">撤销</li>
        <li v-for="(item, index) in searchFuzzyQueryList" :key="index" @click="searchFuzzyQueryInputAdd($event)">{{item}}</li>
      </ul>
    </div>  
  </div>

    <!-- 通用 -->
    <div class="left_currencyBox" v-show="showEchart">
      <!-- <div class="currencyBox" v-for="(item,index) in currencyData" :key="index">
        <div class="leftechartbox" :id="item.leftechartSource.Id" :data-echart="item.leftechartSource.Id + index" :data-name="item.leftechartSource.Name" draggable="true" @dragstart="drag($event,item.completeData)"></div>
          <p>{{item.leftechartSource.Name}}</p>
      </div> -->
    <A @parent_dragstart="drag"></A>
    <B @parent_dragstart="drag"></B>
    <C @parent_dragstart="drag"></C>
    <D @parent_dragstart="drag"></D>
    <E @parent_dragstart="drag"></E>
    <F @parent_dragstart="drag"></F>
    <echartG @parent_dragstart="drag" style="width:100%;margin-left:0;"></echartG>
    <H @parent_dragstart="drag" style="width:100%;margin-left:0;"></H>
  </div>

    <!-- 专题 -->
    <div class="left_specialBox" v-show="showEchart == false">
      <el-tooltip class="item" effect="dark" :content="item.specialTitle" placement="top-start" v-for="(item, index) of specialData" :key="index">
        <div draggable="true" @dragstart="drag"  @click="specialclick($event)">
          <span class="title" :data-url="item.specialUrl">{{item.specialTitle}}</span><span class="time">{{item.specialTime}}</span>
        </div>                
      </el-tooltip>
    </div>
  </div>
    
  <div id="right">
    <!-- 收入箭头 -->
    <div class="takeUp2" @click="takeUp"><i :class="take_Up ? 'iconfont icon-zuo' : 'iconfont icon-you'"></i></div>
      
    <!-- 通用 -->
    <div v-for="(item,index) in 7" :key="index" v-if="showEchartBox" draggable="true" @dragover="allowDrop($event)" @drop="drop($event)" @dragenter="dragenter($event)" @dragleave="dragleave($event)">
    <div class="toolbarBtn"><i class="fa fa-cog"></i>
      <div class="toolbarBox">
        <div class="toolbar">
          <div><i class="fa fa-pie-chart" data-toolbarId="pie" @click="cli($event)"></i></div>
          <div><i class="fa fa-bar-chart" data-toolbarId="bar" @click="cli($event)"></i></div>
          <div><i class="fa fa-line-chart" data-toolbarId="line" @click="cli($event)"></i></div>
          <div><i class="fa fa-trash-o" data-toolbarId="delete" @click="cli($event)"></i></div>
        </div>
      </div>
    </div>
    <span class="corner">
      <span v-for="(item,index) in 4" :key="index"></span>
    </span>
    <div class="echartBox"></div>
  </div>

      <!-- 专题 -->
      <div class="special" v-if="showEchartBox == false" draggable="true" @dragover="allowDrop($event)" @drop="drop($event)" @dragenter="dragenter($event)" @dragleave="dragleave($event)">
        <iframe class="iframeBox"  src="" scrolling="yes" frameborder="0"> </iframe>
      </div>

    </div>
  </div>
</template>

<script>
  import Sortable from '../static/script/Sortable.js'
  import echarts from '../static/script/echarts.js'

  import {requestEcharts} from '../src/api/api'
  import {requestPowerBi} from '../src/api/api'
  import {requestCurrencyAddData} from '../src/api/api'

  import A from './components/A'
  import B from './components/B'
  import C from './components/C'
  import D from './components/D'
  import E from './components/E'
  import F from './components/F'
  import echartG from './components/echartG'
  import H from './components/H'


  // search 重置
  let restore = () => {
    $('#left .leftechartbox').each(function (index,item) {
      $(item).parent().css('display','block')
    })
  }

  //切换 折线图 or 柱状图
  let lineOrBar = (type, data_echartData) => {
    data_echartData.series[0].type = type

    let xAxis = {
      type: 'category',
      data:[],
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    }

    let yAxis = {
      type: 'value',
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    }

    for(let i of data_echartData.series){
      for(let j of i.data){
        xAxis.data.push(j.name != '' || undefined ? j.name : j.value)
      }
    }

    data_echartData.xAxis = xAxis
    data_echartData.yAxis = yAxis
    data_echartData.legend.data = data_echartData.series.name
    data_echartData.color = ['#00bade']
  }

  export default {
    name: "Echarts",
    components: {
      A, B, C, D, E, F, echartG, H
    },
    data() {
      return {
        srcdiv: '', //左侧当前拖拽元素
        myChart: '', //当前echart实例
        clearVal: false, //清除按钮
        searchInput: '', //搜索栏 数据
        searchDataName: [], //模糊查询所用数据 来自子组件的 自定义属性 data-name
        fuzzyQueryList_show: false,//模糊查询列表是否显示
        leftEchartName: '', // 用于搜索时条件判断的 name 名称
        completeData: {}, //当前拖拽图表完整数据
        liIndex: 0,
        switchBox: false, //切换通用 / 专题
        switchText1: '通用',
        switchText2: '专题',
        showEchart: true, //显示通用
        showEchartBox: true,
        take_Up: true,
        currencyModel: false, //显示通用模态框
        specialModel: false, //显示新增专题模态框
        currencyData:[], //通用数据        
        specialData:[], //专题数据
        currencyAddData:[], //新增 通用数据
        specialFormData:{
          specialTitle:'',
          specialUrl:'',
          specialTime: new Date()
        },
        rules:{
          specialTitle:[{ required: true, message: '请将信息填写完整', trigger: ['blur','change']}],
          specialUrl:[{ required: true, message: '请将信息填写完整', trigger: ['blur','change']}],
          specialTime:[{ required: true, message: '请将信息填写完整', trigger: ['blur','change']}]
        },
        scrollChartFromData:{
          type:''
        }
      };
    },

    created(){
      requestEcharts().then(res=>{
        this.currencyData = res
      })
      requestPowerBi().then(res=>{
        this.specialData = res
      })
      requestCurrencyAddData().then(res=>{
        this.currencyAddData = res
      })
    },
  
    mounted() {
      // console.log('html：',$('.chartContent').html())
      // $('.scrollChartBox').on('click',function(){
      //   alert(1)
      // })
      // 拖拽插件
      let sortable = Sortable.create(right, {
        group: {
          name: 'moveBox',
          pull: false,
          put: true
        },
        animation: 500,
        sort: true
      })

      // 收起箭头
      $(() => {
        $(document).on('mousemove',(event)=>{
          if(this.take_Up == true){
            $('.takeUp2').css('display','none')
            if (event.clientX < 400){
              $('.takeUp').css('display','block')
            }
            if (event.clientX > 420){
              $('.takeUp').css('display','none')
            }
            
          }else{
            if (event.clientX < 20){
              $('.takeUp2').css('display','block')
            }else{
              $('.takeUp2').css('display','none')
            }
          }
        })
      })

      // 加载左侧图表
      setTimeout(()=>{
        for(let item of this.currencyData){
          let myChart = echarts.init(document.querySelector('#' + item.leftechartSource.Id))
          myChart.setOption(item.leftechartSource)
        }
      })

    //浏览器退出时 保存当前设置
    //   window.onunload = function(event) {
	  //   	localStorage.setItem('rightHTML',$("#right").html())
	  //   }
    
    // //页面渲染完毕，读取设置，并重新渲染图表
    // let that = this
	  //   if(localStorage.getItem('rightHTML')){
    //     $("#right").html(localStorage.getItem('rightHTML'))

    //       $("#right .echartBox").each((index,item) => {

    //         $('.echartBox').attr('draggable',true)
    //         $('.echartBox').on('dragover', () => { that.allowDrop(event) })
    //         $('.echartBox').on('drop', () => { that.drop(event) })
    //         $('.echartBox').on('dragenter', () => { that.dragenter(event) })
    //         $('.echartBox').on('dragleave', () => { that.dragleave(event) })

    //         if($(item).attr('id')){
    //           let localStorageEchartData = JSON.parse($(item).attr('data-echartdata'))
    //           let localStorageEchartItem = echarts.init(document.querySelector("#" + $(item).attr('id')))
    //           localStorageEchartItem.clear() //清除绘制内容，实例可用
    //           localStorageEchartItem.setOption(localStorageEchartData) //重新渲染
    //         }
            
    //       })
    //   }
    //   $('.toolbar div').on('click', (event) => {
    //     that.cli(event)
    //   })
  },
    
    methods: {
      scrollChartBoxClick(ev, type){
        $(ev.currentTarget).addClass('shadow').siblings().removeClass('shadow')
        this.scrollChartFromData = type
      },
      scrollChartAddSubmit(){

      },

      allowDrop(ev) {
        ev.preventDefault()
      },

      drag(ev, completeData) {
        this.srcdiv = ev.currentTarget //获取拖拽事件元素
        ev.dataTransfer.setData("html", ev.currentTarget.innerHTML)//获取拖拽事件元素的 Html
        // ev.dataTransfer.setData("text", ev.currentTarget.innerText)//获取拖拽事件元素的 Html
        this.completeData = completeData //获取子组件传递的 完整数据
        // this.leftEchartName = name
        console.log(completeData)
      },

      drop(ev) {
        ev.preventDefault()
        let that = this
        let textArr = []
        let echartID = []
        let data_echartData = []
        let data_echart = $(this.srcdiv).attr('data-echart') //左侧盒子自定义属性
        let leftDragHtml = ev.dataTransfer.getData("html") //获取左侧抓起时获取的 Html
        let leftBoxId = $(this.srcdiv).parent().attr("id") //左侧 导航栏父级 Id
        let rightBoxId = $(event.target).parent()[0].parentNode.id // 右侧容器父级 Id

        $(ev.target).empty()
        $(ev.target).removeAttr('data-echartData')
        $(ev.target).removeAttr('id')
         
         
        if (that.srcdiv != ev.currentTarget && leftBoxId != rightBoxId) {

          /**
           * 遍历右侧容器  id  装入 echartID数组
           */
          $('#right .echartBox').each(function (index, item) {
            echartID.push($(item).attr('id') || '')
          })

          /**
           * 判断 echartID 中是否有重复 id  如果没有则将左侧 自定义属性添加为 Id
           */
            if (echartID.indexOf(data_echart) == -1) {
              console.log(data_echart) 
              $(event.target).attr('id', data_echart)
              
              // if($(event.target).attr('id') == data_echart){

              $(ev.target).addClass('rightDivHoverDrog')
              $(ev.target).parent().find('.corner').css('visibility','visible')
              $(ev.target).parent().find('.toolbarBtn').css('visibility','visible')

              let rightId = $(event.target).attr('id'); //获取当前放入 盒子的 id
              that.myChart = echarts.init(document.querySelector("#" + rightId)); //echart 查找符合条件的 id
                //把数据设置到 当前drop的盒子上
              if(!$(event.target).attr('data-echartData')){
                  $(event.target).attr('data-echartData',JSON.stringify(that.completeData))
              }else{
                $(event.target).removeAttr('data-echartData')
              }

              // 获取盒子上的 自定义数据
              let attrData = $(event.target).attr('data-echartData')
              data_echartData = JSON.parse(attrData)

                //如果子组件传递了 完整数据，则显示完整数据
                if (data_echart && data_echartData) {
                  this.myChart.clear() //清除绘制内容，实例可用
                  that.myChart.setOption(data_echartData) // 使用刚指定的配置项和数据显示图表。
                }
            }else{
                $(ev.target).removeClass('rightDivHover')
                $(ev.target).removeClass('rightDivHoverDrog')
              }
        }
      },

      // 移入拖拽区域
      dragenter(ev){
        let data_echart = $(this.srcdiv).attr('data-echart') //左侧盒子自定义属性
          $(ev.target).addClass('rightDivHover')
      },
    // 离开拖拽区域
      dragleave(ev){
          $(ev.target).removeClass('rightDivHover')
      },


    // 搜索框获取焦点
    searchFocus(){
      restore()

      if(this.searchInput.length > 0){
        this.fuzzyQueryList_show = true
        this.clearVal = true
      }else{
        this.clearVal = false
      }

      let dataNameItem = []
      $('#left .leftechartbox').each(function (index,item) {
        dataNameItem.push($(item).attr('data-name'))
      })
      this.searchDataName = dataNameItem
    },

    // 搜索框失去焦点
    searchBlur(){
      restore()
      setTimeout( () => {
        this.fuzzyQueryList_show = false
      },100)
    },

    // 搜索框清除按钮
    clickClearVal() {
      let that = this
      this.searchInput = ''
      this.clearVal = false
      restore()
    },

    //模糊查询列表 撤销按钮
    revocation(){
      restore()
      this.searchInput = ''
      setTimeout( () => {
      this.clearVal = false
      this.fuzzyQueryList_show = false
      },100)
    },

    // 监听 搜索框 keyDown
    deletKeyDown(ev){
      let that = this
      if(ev.keyCode == 8){
        if(that.searchInput.length < 1){
            restore()
            this.clearVal = false
            this.fuzzyQueryList_show = false
        }
      }else if(ev.keyCode == 13){
        let liText = $('.autoCompletion').find("li:not(:first-child):eq(" + that.liIndex + ")").text()
        this.searchInput = liText
      }
      if(that.searchInput.length > 0){
          this.clearVal = true
          this.fuzzyQueryList_show = true
      }

      //上下键选择 li
      if(ev.keyCode == 38){ //向上
        that.liIndex--
        if(that.liIndex < 0) that.liIndex = that.searchDataName.length -1
        console.log(that.liIndex)
      }else if(ev.keyCode == 40){//向下
        that.liIndex++
        if(that.liIndex >= that.searchDataName.length ) that.liIndex = 0
        console.log(that.liIndex)
      }
      let li = $('.autoCompletion').find("li:not(:first-child):eq(" + that.liIndex + ")")
      li.css("background", "#0283daa6").siblings().css("background", "")
    },

    //searchGo 开始搜索
    searchGo(){
      let that = this
      $('#left .leftechartbox').each(function (index,item) { 
        if(that.searchInput != ''){
          if($(item).attr('data-name') != that.searchInput){
            $(item).parent().css('display','none')
          }
        }
      })
    },

    // 点击 模糊查询列表 设置值
    searchFuzzyQueryInputAdd(ev){
      this.searchInput = $(ev.target).text()
      this.fuzzyQueryList_show = false
    },

    // 切换详情
    clickSwitchBox1(ev){
      this.switchBox = !this.switchBox
      
      this.currencyModel = false
      this.specialModel = false
    },
    clickSwitchBox2(ev){
      this.switchBox = !this.switchBox    
      this.switchText2 = this.switchText1
      this.switchText1 = ev.target.innerText

      this.currencyModel = false
      this.specialModel = false

      // 切换 showEchartBox
      this.showEchart = !this.showEchart
      this.showEchartBox = !this.showEchartBox
    },

    //专题点击展示
    specialclick(ev){
      let url = $(ev.target).data('url')
      $('.iframeBox').attr('src',url)
    },

    // 时间转换 
    getTimeStamp(time){
      return new Date(time).getTime()
    },

    // 新增按钮
    specialAdd(){
        if(this.showEchart){
          this.currencyModel = true
          setTimeout(()=>{
            $('.currencyModel').animate({margin:'10% auto'},200,"linear")
            for(let item of this.currencyAddData){
              let myChart = echarts.init(document.querySelector('#' + item.Id))
              myChart.setOption(item)
            }
          // $('.chartContent .scrollChartBox').on('click',()=>{
          //   console.log($(this).find('.chartContent .scrollChartBox'))
          // })
            
          })
        }else{
          this.specialModel = true
          setTimeout(()=>{
          $('.specialModel').animate({margin:'16% auto'},200,"linear")
        })
        }
    },

    //新增专题 提交
    specialAddSubmit(specialFormData){
      this.$refs[specialFormData].validate((valid) => {
        if(valid){
           // 时间转换成时间戳
          this.specialFormData.specialTime = this.getTimeStamp(this.specialFormData.specialTime)

          this.$confirm('确定要提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res)=>{
            alert(1)
          }).catch(res=>{
            this.$message({ type: 'error', message: '提交失败!' })
          })
        } else {
          this.$message.error('请将信息填写正确')
          return false;
        }
      })
    },

    // 关闭新增
    close(){
      if(this.showEchart){
          $('.currencyModel').animate({margin:'0% auto',opacity:'.5',opacity:'.2'},200,"linear",()=>{
            this.currencyModel = false
          })
        }else{
          $('.specialModel').animate({margin:'0% auto',opacity:'.5',opacity:'.2'},200,"linear",()=>{
            this.specialModel = false
          })
        }
    },

    // 收起箭头
    takeUp(){
      this.take_Up = !this.take_Up

      if(this.take_Up){
        $('#left div').css('display', 'block')
        $('#left').width(388)
        $('.takeUp').css('left','390px')

        $('#right').css('width','80%')
        $('#right').css('padding','10px')

        this.$emit('parent_takeUp',true)        
      }else{
        $('#left div').css('display', 'none')
        // $('#left').width(0)
        // $('.takeUp').css('left','2px')

        $('#right').css('width','100%')
        $('#right').css('padding',0)

      this.$emit('parent_takeUp',false)        
      }
    },

    // 切换图表类型
    cli(ev){
      var echatsDropBox = $(ev.target).parent().parent().parent().parent().parent().find('.echartBox') //获取 drop 盒子
      var toolbarParentBoxId = echatsDropBox.attr('id') //获取盒子上的 id
      var clickItemData = $(ev.target).attr('data-toolbarId')
      // 获取盒子上的 自定义数据
        let data_echartData = []
        let attrData =echatsDropBox.attr('data-echartData')
        data_echartData = JSON.parse(attrData)

        let resetEcharts = echarts.init(document.querySelector("#" + toolbarParentBoxId))
        resetEcharts.clear() //清除绘制内容，实例可用

        if(clickItemData == 'pie'){
          delete data_echartData["xAxis"]
          delete data_echartData["yAxis"]

          data_echartData.series[0].type = 'pie'

          data_echartData.color = ['#4A7391','#51D6C2','#7A9FC3','#2DC8AC','#244776','#00bade']

        }else if(clickItemData == 'bar'){
          lineOrBar('bar', data_echartData)

        }else if(clickItemData == 'line'){
          lineOrBar('line', data_echartData)
        }else if(clickItemData == 'delete'){
          let parentBox = $(ev.target).parent().parent().parent().parent()
          parentBox.removeAttr('style')
          parentBox.siblings('.corner').removeAttr('style')
          parentBox.siblings('.echartBox').removeAttr('id')
          parentBox.siblings('.echartBox').removeAttr('data-echartdata')
          parentBox.siblings('.echartBox').removeAttr('_echarts_instance_')
          parentBox.siblings('.echartBox').removeClass('rightDivHover') 
          parentBox.siblings('.echartBox').removeClass('rightDivHoverDrog') 
          parentBox.siblings('.echartBox').empty()
        }
        
        resetEcharts.setOption(data_echartData) //重新渲染
      }
    },
    computed: {
      // 搜索框模糊查询
      searchFuzzyQueryList: function() {
        var search = this.searchInput;
        if (search) {
          return this.searchDataName.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        // return this.searchDataName; //全部列出，注释则，输入时列出查询数据
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
  @import url("http://www.jq22.com/jquery/font-awesome.4.6.0.css");

  .shadow{
    box-shadow: inset 1px 0px 15px #888890;
  }

  .box {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #2a2c3b;
    position: relative;

  .specialModel, .currencyModel{
    width: 888px;
	  height: 466px;
    background-image: url('assets/specialBack.png');
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1000;
    position: fixed;
    left:0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    .close{
      width: 20px;
      height: 24px;
      font-size: 24px;
      line-height: 18px;
      color: #fff;
      position: absolute;
      top: 5px;
      right: 6px;
      cursor: pointer;
    }
    .title{
      width: 100%;
      font-size: 22px;
      padding-top: 20px;
      color: #fff;
    }
    .specialForm{
      margin-top: 40px;
      .el-form-item__label{
          color: #fff;
      }
      .el-form-item__content{
        width: 474px;
      }
      .el-form-item{
        margin: 20px 0 20px 54px;
      }
      .el-input{
        width: 140%;
      }
    }
    .specialAddBtn{
      width: 100px;
      height: 40px;
      color: #fff;
      margin: 40px  auto 0;
      font-size: 16px;
      background-image: url('./assets/specialBtn.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .currencyModel{
    width: 1114px;
    height: 600px;
    background-size: 100% 600px;
    overflow: hidden;

    .title{
      padding-top: 40px;
    }

    .chartContent{
      width: 98%;
      height: 152px;
      float: right;
      margin: 18px 10px 0;
      overflow-y: auto;
      // white-space: nowrap;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-around;
      // align-content: space-between;

      .scrollChartBox{
        width: 178px;
        height:140px;
        margin: 12px 4px 24px 32px;
        float: left;
        position: relative;
        // box-sizing: border-box;
        // white-space: normal;
        // word-wrap: break-word;
        // word-break: break-all;
        // overflow: hidden;
        // display: inline-block;
        // background-color: aquamarine;

        // :hover{
        //   box-shadow: inset 1px 0px 15px #888890;
        // }

        .scrollChart{
          width: 100%;
          height: 100%;
        }

        p{
          position: absolute;
          margin: 0;
          bottom: 4px;
          width: 100%;
          font-size: 16px;
          line-height: 20px;
          color: #fff;
        }
        
      }
      .scrollChartBox:hover{
        box-shadow: inset 1px 0px 15px #888890;
      }
      
    }
    .chartContent::-webkit-scrollbar{
      width:4px;
      // height: 6px;
    }

    .chartContent::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      background: #00BADE;
    }

    .chartContent::-webkit-scrollbar-track {/*滚动条里面轨道*/
      border-radius: 10px;
      background: #244776;
    }
  }

  .searchBox{
    .specialAdd{
      width: 34px;
      height: 33px;
      line-height: 32px;
      position: absolute;
      right: -38px;
      cursor: pointer;
      i{
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .search,.search2{
    width: 310px;
    left: 67px;
    height: 32px;
    border: 1px solid #446da8;
    position: fixed;
    top: 69px;
    z-index: 5;
    background-color: #17283f;
  }
  .search2{
    width: 280px;
  }
  .search input ,.search2 input{
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;
    background:none;    
    outline:none;    
    border:0px;  
    font-size: 18px;
    padding-left: 16px;
    color: #fff;
  }
  .search input::placeholder ,.search2 input::placeholder{
    color: #fff;
    font-size: 16px;
  }
  .searchGo,.clearVal{
    position: absolute;
    top: 0;
    display: inline-block;
    width: 12%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 32px;
    font-weight: 100;
    cursor: pointer;
  }
  .searchGo{
    right: 0;
  }
  .searchGo:hover{
    color: #5689DB;
  }
 .searchGo:active{
    top: 1px;
  }
  .clearVal{
    right: 28px;
    font-size: 17px;
  }
  .autoCompletion{
    list-style: none;
    position: absolute;
    left: -1px;
    top: 34px;
    width: 100%;
    min-height: 30px;
    border-right: 1px solid #446da8;
    border-bottom: 1px solid #446da8;
    border-left: 1px solid #446da8;
    background-color: #243a58;
  }
  .autoCompletion li:first-child{
    background-color: #0e1d31;
  }
  .autoCompletion li{
    background-color: #17283F;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    color: #fff;
    margin: 1px 0;
  }

  .autoCompletion li:hover{
    background-color: #0283daa6;
  }

  #left {
    width: 394px;
    min-width: 388px;
    height: 100%;
    position: relative;
    overflow: auto;
    background-color: #17283f;
    border-right: 1px solid #446da8;
    transition: width .1s;

    // 通用
    .left_currencyBox{
      margin-top: 60px;
      .currencyBox {
        position: relative;
        width: 46%;
        height: 140px;
        margin-bottom: 20px;
        /* box-shadow: inset 1px 0px 15px #888890; */
        float: left;
        margin: 20px 2%;
        .leftechartbox{
          width:100%;
          height:100%;
        }
        p{
          position: absolute;
          margin: 0;
          bottom: 4px;
          width: 100%;
          font-size: 16px;
          line-height: 20px;
          color: #fff;
        }
      }
      .currencyBox:not(:nth-child(1)), .currencyBox:not(:nth-child(2)){
        margin-top: 0;
      }
    }

    // 专题
    .left_specialBox{
      margin-top: 60px;
      :hover{
        background-color: #446DA8;
        color: #fff;
      }
      div{
        padding: 0 10px;
        margin-top: 10px;
        color:#A2A3A4;
        font-size:16px;
        width: 369px;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
        .title{
          display: inline-block;
          float: left;
          text-align: left;
          width: 282px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;  
        }
        .time{
          display: inline-block;
          float: right;
          text-align: left;
        }
      }
    }
  }


  #left div.echat:hover {
    box-shadow: inset 1px 0px 20px 3px #888890;
  }


  #left, #right {
    font-size: 20px;
    text-align: center;
  }

  #right{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    overflow: auto;
  }

  #right > div:not(:first-child) {
    width: 30%;
    height: 300px;
    margin-bottom: 20px;
    position: relative;
    z-index: 0;
    border: 1px solid transparent;
  }
  .rightDivHover{
    background-color: #17283f;
    border: 1px solid #446da8;
  }

  .rightDivHoverDrog{
    background-color: #17283f;
    border: 1px solid #446da8;
  }

  .echartBox {
    width: 97.7%;
    height: 96.5%;
    z-index: -2;
    padding: 10px 0 0 10px;
  }

  /*设置滚动条*/
  #left::-webkit-scrollbar, #right::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  /*  四边角加粗 */
  .corner{
    visibility: hidden;
  }
  .corner span{
    position: absolute;
    padding: 6px;
    border-style: solid;
    border-color: #446da8;
  }
  .corner span:nth-child(1){
    left: -1px;
    top: -1px;
    border-width: 3px 0 0 3px;
  }
  .corner span:nth-child(2){
    right: -3px;
    top: -1px;
    border-width: 3px 3px 0 0 ;
  }
  .corner span:nth-child(3){
    right: -3px;
    bottom: -3px;
    border-width: 0 3px 3px 0;
  }
  .corner span:nth-child(4){
    left: -1px;
    bottom: -3px;
    border-width: 0 0 3px 3px;
  }

  /*具条*/
  .toolbarBox{
    width: 80px;
    height: 100px;
    position: absolute;
    top: -4px;
    right: -20px;
    z-index: 4;
    opacity: 0;    
    -webkit-transition: right .5s ease;
    -moz-transition: right .5s ease;
    -ms-transition: right .5s ease;
    -o-transition: right .5s ease;
    transition: right .5s ease;
  }
  .toolbarBtn{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgb(2,186,242);
    cursor: pointer;
    visibility: hidden;
  }
  .toolbarBtn>i{
    color: #fafafa;
  }
  .toolbarBtn:hover .toolbarBox{
    right: -58px;
    opacity: 1;
  }
  .toolbar{
    position: absolute;
    right: 5px;
    width: 14px;
    margin: 0;
    width: 30px;
    padding: 0;
    border: 1px solid #3a537c;
    background-color: #17283f; 
  }
  .toolbar div i{
    font-size: 18px;
    color: #fafafa;
  }
  .toolbar div i[data-toolbarId='delete']{
    color: #F56C6C;
    font-size: 20px;
  }
  .toolbar div{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }

  .toolbar div:hover{
    background-color: rgb(0,157,205);
  }

  .toolbar div:nth-child(1):before{
    content: '';
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid #3a537c;
    border-bottom: 7px solid transparent;
    position: absolute;
    top: 4px;
    left: -7px;
  }
  .switch{
    background-color: #132E50;
    width: 60px;
    height: 32px;
    position: absolute;
    top: -1px;
    left: -62px;
    border: 1px solid #446DA8;
    border-right: 0;
    cursor: pointer;
    span{
          font-size: 16px;
          line-height: 37px;
          width: 60px;
          height: 33px;
          display: inline-block;
          position: absolute;
          left: 4px;
          color: #fff;

          i{
            color: #ABB5C0;
            font-size: 16px;
            padding: 0 4px;
          }
    }
    span:last-child{
      top: 33px;
      left: -1px;
      width: 52px;
      padding-left: 6px;
      text-align: left;
      background-color: #132E50;
      border: 1px solid #446DA8;
      border-top: 0;
    }

  }
  // 专题盒子
  .special{
    width: 100% !important;
    height: 100% !important;
    .iframeBox{
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }

  // 收起箭头
  .takeUp,.takeUp2{
    position: fixed;
    top: 40%;
    left: 390px;
    background-color: #0b4cc54a;
    width: 18px;
    height: 200px;
    z-index: 3;
    text-align: center;
    line-height: 200px;
    color: #fff;
    border-radius: 0 20px 20px 0;
    display: block;
    cursor: pointer;
  }
  .takeUp2{
    left: 1px;
  }
}
</style>
