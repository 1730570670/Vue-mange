<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:15px;margin-left:4px">
      <!-- 管理员信息面板 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userimg"/>
          <div class="userinfo">
            <p class="name">{{this.$store.state.tab.UserInfo}}</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
      </el-card>
      <el-card>
        <!-- 上次登录信息 -->
        <div class="login-info">
          <p>上次登录时间:<span>&nbsp;&nbsp;&nbsp;&nbsp;2021-7-19</span></p>
          <p>上次登录地点:<span>&nbsp;&nbsp;&nbsp;&nbsp;湖南</span></p>
        </div>
      </el-card>
      <!-- 以上为用户资料展示区 -->
      <el-card style="margin-top:20px;height:291px">
        <el-table :data="tableDate">
          <el-table-column v-for="(item,value) in tableLabel" 
          :prop="value" :label="item" :key="value">
          </el-table-column>
        </el-table>
     </el-card>
     <!-- 以上为数据展示区 -->
    </el-col>
    
    <!-- 折线图 -->
      <el-card :style="{width:825+'px',height:300+'px',position:'relative',left:20+'px',top:15+'px'}" id="main"></el-card>
     <!-- 右下区域 -->
      <div style="display:flex;position:relative;left:19px;margin:30px;height:230px;top:21px">
        <el-card :style="{width:412+'px'}" id="chartbar"></el-card><!--柱状图-->
        <el-card :style="{width:412+'px'}" id="chartPie"></el-card><!--饼状图-->
      </div>
  </el-row>
  
</template>

<script>
import echarts from 'echarts'; //引入echarts
export default {
    name:'H-ome',
    data(){
      return{    
        // 用户数据标题
        tableLabel:{
          title:'手机型号',
          todayBuy:'今日购买',
          montBuy:'本月购买',
          totaBuy:'总购买'
        },
        // 用户数据里面的数据
        tableDate:[
          {
            title:'oppo',
            todayBuy:100,
            montBuy:200,
            totaBuy:800
          },
           {
            title:'vivo',
            todayBuy:200,
            montBuy:300,
            totaBuy:1000
          },
           {
            title:'iPone',
            todayBuy:200,
            montBuy:400,
            totaBuy:1200
          },
           {
            title:'HUAWEI',
            todayBuy:300,
            montBuy:1000,
            totaBuy:1500
          }
        ],
        // 用户头像
        userimg:require('../../assets/images/headig.jpg'),
        opinionData: ["3", "29", "15", "34", "18",'25','39']     
      }
    },
    // 事件函数
    methods: {       
      // 柱状图函数
        initCharts:function(){
        //初始化echarts实例
          let myChart = echarts.init(document.getElementById('chartbar'));
          // 绘制图表
          myChart.setOption({
            title: { 
              text: '本月销量情况',//柱状图标题
              x:'center' //柱状图标题位置居中
            },
            tooltip: {},//鼠标悬浮
            xAxis: {
              // 加载tabldata里面的标题
            data: [this.tableDate[0].title,this.tableDate[1].title,this.tableDate[2].title,this.tableDate[3].title]
            },
            yAxis: {},//Y轴的数据,一般不填写,让他自动
            series: [
              {
              name: '本月销量',//鼠标悬浮文字
              type: 'bar',//以b柱状图的形式显示
              color:'#409EFF',//柱状图颜色
              // 加载tabldata里面的本月数据
              data:[this.tableDate[0].montBuy,this.tableDate[1].montBuy,this.tableDate[2].montBuy,this.tableDate[3].montBuy]
            }]
            })
          },  
        // 饼状图函数
        drawPieChart:function() {
            this.chartPie = echarts.init(document.getElementById('chartPie'));
            this.chartPie.setOption({
              // 饼状图标题
                title: {
                    text: '销量',//标题
                    // subtext: '销量数据显示',//副标题
                    x: '50%'//标题的位置显示在中间
                },
                tooltip:{},//鼠标悬浮的提示
                legend: {
                    name:'本月销量',
                    orient: 'vertical',//排列整齐
                    left: 'left',//在左边进行排列
                    data: this.tableDate.name//排列的数据,为数据里面的名称
                },
                series: [
                    {
                        type: 'pie',//显示饼状图参数
                        radius: '60%',//饼状图的一个大小
                        center: ['56%', '60%'],//饼状图的位置(左，右)
                        color:['#F56C6C','#E4E7ED','#909399','#E6A23C'],
                        data: [//饼状图里面的name需要与上面data数name一一对应,否则不渲染数据
                            { value: this.tableDate[0].montBuy, name:this.tableDate[0].title },
                            { value: this.tableDate[1].montBuy, name:this.tableDate[1].title },
                            { value: this.tableDate[2].montBuy, name:this.tableDate[2].title },
                            { value: this.tableDate[3].montBuy, name:this.tableDate[3].title },
                        ],
                        
                    }
                ]
            });
        },
        drawLine:function() {
                this.charts = echarts.init(document.getElementById('main'))
                this.charts.setOption({
                    title:{
                      text:'销售情况',//标题
                      x:'center'//标题居中
                    },
                    tooltip: {},//鼠标悬浮提示
                    //下载按钮
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // x轴数据
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [1,2,3,4,5,6,7]//x轴字段名
                    
                    },
                    // y轴数据
                    yAxis: {
                        type: 'value'
                    },
                    series: [//数据分组
                      {
                        name: '天销售情况',
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData,
                        color:'red'
                      },
                      {
                        name: '月销售情况',
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData,
                        color:'#E6A23C'
                      },
                      {
                        name: '年销售情况',
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData,
                        color:'#E6A23C'
                      }
                    ]
                })
            }
      },
        // 挂载时执行的事件
    mounted: function () {
      // 执行柱状图事件
        this.initCharts();
      // 立即执行饼状图加载事件
        this.drawPieChart();
        // 执行折线图事件
        this.drawLine('main')

    },
        
}
</script>

<style lang="less" scoped>
// 弹性布局
.user{
  display: flex;
  align-items: center;
 // 用户头像
  img{
    width: 130px;
    border-radius: 50%;
  }
  .userinfo{
    margin-left: 30px;
    // 用户名
    .name{
      font-size: 30px;
    }
    // 超级管理员的字体颜色
    .access{
      color: #CCCCCC;
    }
  }

 
}
</style>