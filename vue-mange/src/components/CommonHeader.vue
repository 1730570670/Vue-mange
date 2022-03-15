<template>
  <div class="Main-Container">
      <!-- 左边的容器 -->
      <div class="left-container">
        <el-button plain icon="el-icon-menu" size="mini" @click="IsShow"></el-button><!-- 点击侧边栏的伸缩效果 -->
    </div>
    <!-- 右边的容器 -->
    <div class="right-container">
        <!-- 点击触发下拉框 引入elementUI-->
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
            <img :src="userImg"  class="headIcon">
        </span>
        <el-dropdown-menu class="itembutton">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item><button @click="ExitLogin">退出</button></el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    name:'CommonHeader',
    data(){
        return{
            userImg:require('../assets/images/headig.jpg'),//图片的路径
        }
    },
    methods:{
        // 更改展开状态
        IsShow:function(){
        // 触发全局数据,将store里面的时间进行触发
            this.$store.commit('CollapseMenu');
        },
        //跳转路由到登录页面
        ExitLogin:function(){
            this.$router.push({
                name:'login'
            })
        }
    },

}
</script>

<style lang="less">
// 下拉列表样式在css文件的Select.less文件

// 左边容器样式
.left-container{
    *{ //全部组件左浮动
        float: left;
        
    }
    margin-top: 15px;
   
    .el-breadcrumb{
        margin-top: 7px;
        margin-left: 30px;
    }
}
// 右边容器
.right-container{
    // 又浮动
    float: right;
    margin-top: -10px;
    margin-right: 20px;
}
// 用户头像
.headIcon{
    width:50px;
    border-radius: 50px;
}
.itembutton{
    button{
    background: transparent;
    border: none;
    width: 60px;
}
} 
</style>