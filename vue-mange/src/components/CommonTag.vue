<template>
  <div>
      <!-- 渲染出Router数据 -->
      <el-tag v-for="(item,index) in tags" 
            type="info"
            :key="item.path" 
            :closable="item.name !='home'"  
            :effect="$route.name===item.name ?'dark':'plain'"
            @click="linkRouter(item)"
            @close="closerouter(item,index)" 
            >
          {{ item.label }}<!--Tag名称-->
      </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'//引入Vue参数
export default {
    name:'C-ommonTag',
    data() {
      return {
      };
    },
    methods:{
        ...mapMutations({
            close:'ColseTag'
        }),
        // 点击跳转路由
       linkRouter:function(item){
           this.$router.push({
               name:item.name
           });
       },
       closerouter:function(item,index){
           let length=this.tags.length-1;//将数组的长度进行减1
           this.close(item)//vue传参
           if(item.name !=this.$route.name){//如果名字不相等就返回空值
                return 0;
           }
           if(index==length){//如果小标等于长度 name=下标-1
                this.$router.push({
                    name:this.tags[index-1].name
                })
           }else{//如果小标等于长度 name=下标
               this.$router.push({
                   name:this.tags[index].name
               })
           }
       }
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tablist//获取Vue全局数据
        })
    }
}
</script>

<style scoped>
.el-tag{
    margin-top: 15px;
    margin-left: 5px;
    cursor: pointer;
}
</style>