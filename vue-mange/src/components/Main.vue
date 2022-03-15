<template>
  <div>
    <el-container style="height:100%">
        <el-aside width="auto">
          <!-- 左边侧边栏组件 -->
         <common-aside></common-aside>
        </el-aside>
        <el-container>
        <el-header>
          <!-- 顶部组件 -->
          <common-header></common-header>
        </el-header>
        <el-main>
          <ComonTag></ComonTag> 
          <!-- 显示区域加载路由 -->
          <router-view></router-view>
        </el-main>
       </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader';//引入顶部组件 
import CommonAside from './CommonAside.vue';//引入左边侧边栏的组件
import ComonTag from './CommonTag.vue'
export default {
  name:'H-ome',
  // 组件
  components: {
     CommonAside,
     CommonHeader,
     ComonTag
  },
}
</script>
// less文件 npm i less 和 npm i less-loader
<style lang="less" scoped>
.el-header{
  background-color: rgb(66, 66, 66);
}
.el-main{
  padding-top: 0px;
}
</style>