<template>
    <el-menu default-active="1-4-1" background-color="#545c64" text-color="#fff" :collapse="isCollapse"
     class="el-menu-vertical-demo">
        <h3>通用后台管理系统</h3>
        <el-menu-item @click="clickMenu(item) " v-for="item in nochildren" :index="item.path+''" :key="item.path">
            <i :class="'el-icon-'+ item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in haschildren" :index="item.path+''" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="(subitem,sunindex) in item.children" :key="subitem.path">
                <el-menu-item @click="clickMenu(subitem)" :index="sunindex+''">{{ subitem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name:'CommonAside',
    data() {
      return {
        menu:[
            {
                path:'/', 
                name:'home' ,
                label:'首页',
                icon:'s-home',
            },
            {
                path:'/mall',
                name:'mall',
                label:"商品管理", 
                icon:'video-play',
            },
            {
                path:'/user',
                name: 'user',
                label:'用户管理',
                icon:'user',
            },
            {
                label:'其他' ,
                icon:'s-grid',
                children:[
                    {
                    path:'/pave1',
                    name:'pagel',
                    label:'页面1',
                    icon:'setting',
                    },
                    {
                    path:'/paze2',
                    name:'page2',
                    label:'页面2',
                    icon:'setting',
                    }  
                ] 
            }
        ]
      }
    },
    methods: {
      clickMenu:function(item){
          this.$router.push({
              name:item.name,
          })
          this.$store.commit('selectMeenu',item);
      }
    },
    // 计算属性
    computed:{
        nochildren:function(){
            // 拿到menu里面菜单的数据
           return  this.menu.filter(item=>!item.children)
        },  
        haschildren:function(){
            // 拿到menu里面菜单子菜单的数据
            return  this.menu.filter(item=>item.children)
        },
        isCollapse:function(){
            // 拿到数据
            return this.$store.state.tab.isCollapse;
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
}
.el-menu{
    height: 100vh;
    border: none;
    overflow: hidden;
    h3{
        color: #fff;
        text-align:center;
        line-height: 48px;
    }
}
</style>