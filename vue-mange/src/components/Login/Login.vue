<template>
  <div>
      <el-card class="loginbox">
          <h3>欢迎使用通用管理系统</h3>
          <label>账&nbsp;&nbsp;&nbsp;号:</label><el-input v-model="UserInfo.UserLogin" placeholder="Please UnerInfo"></el-input>
          <label>密&nbsp;&nbsp;&nbsp;码:</label><el-input show-password v-model="UserInfo.UserPassword" placeholder="Please UnerPassword"></el-input>
          <el-button @click="drawer=true">注册</el-button>
          <el-button type="primary" @click="loginMain">登录</el-button>
      </el-card>
      <!-- 注册面板 -->
      <el-drawer
        title="注册"
        :visible.sync="drawer">
        <div class="log">
            <label>账&nbsp;&nbsp;&nbsp;号:</label><el-input v-model="addUserInfo.UserLogin" placeholder="Please UnerInfo" style="width:200px"></el-input><br>
            <label>密&nbsp;&nbsp;&nbsp;码:</label><el-input show-password v-model="addUserInfo.UserPassword" placeholder="Please UnerPassword" style="width:200px"></el-input><br>
            <el-button @click="inUserInfo">注册</el-button>
        </div>      
      </el-drawer>
  </div>
</template>

<script>
export default {
    name:'L-ogin',
    data(){
        return{
            drawer:false,//打开右侧面板的状态
            userlogin:JSON.parse(localStorage.getItem('info')),//查询用户账号专用
            // 登录信息
            UserInfo:{
                UserLogin:'',//账号
                UserPassword:'',//密码
            },
            // 注册信息
            addUserInfo:{
                UserLogin:'',//账号
                UserPassword:'',//密码
            }
        }
    },
    methods:{
        // 注册
        inUserInfo:function(){
            var info={
                login:this.addUserInfo.UserLogin,
                password:this.addUserInfo.UserPassword
            };//获取注册信息
            if(this.addUserInfo.UserLogin!='' && this.addUserInfo.UserPassword!=''){
                this.userlogin.push(info)
                this.drawer=false;
                this.addUserInfo.UserLogin=this.addUserInfo.UserPassword='';
                // 提示的信息
                const h = this.$createElement;
                this.$notify({
                    title: '成功',
                    message: h('i', { style: 'color: teal' }, '注册成功')
                });
            }else{
                alert("信息不能为空");
            }
        },
        // 登录
        loginMain:function(){
            // 判断数组中是否有此账号(遍历)
            var ishave=false
            for(var i=0;i<this.userlogin.length;i++){
                // 判断是否有账号
                if(this.userlogin[i].login==this.UserInfo.UserLogin){
                    ishave=true;//说明有此账号
                    //判断账号密码是否相等
                    if(this.userlogin[i].password==this.UserInfo.UserPassword){
                        this.$store.state.tab.islogin=true;//登录状态
                        // 路由跳转到主页
                        this.$router.push({
                            path: '/main'
                        });
                        
                        this.$store.state.tab.UserInfo=this.userlogin[i].login;//获取信息到Vuex                     
                        // 提示成功的信息
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            center:true
                        });
                        // 密码错误提示的信息
                    }else{
                        this.$message({
                            message: '账号或者密码错误',
                            type: 'error',
                            center:true
                        });
                    }
                }
            }
            // 如果没有找到账号,最后返回
            if(ishave==false){
                this.$message({
                    message: '账号或者密码错误',
                    type: 'error',
                    center:true
                });
                
            }
        }
    },
    watch:{
        userlogin:function(val){
            localStorage.setItem('info',JSON.stringify(val));
        }
    },
    mounted(){
       if(this.userlogin!=null){
           JSON.parse(localStorage.getItem('info'))
       }else{
           this.userlogin=[];
       }
    }
}
</script>

<style lang="less">
body{
    background: whitesmoke;
}
.loginbox{
    width: 400px;
    align-items: center;
    margin: 0px auto;
    position: relative;
    height: 240px;
    top: 100px;
    .el-input{
        width: 300px;
    }
    label,.el-input{
        margin-top: 20px;
    }
    .el-button{
        margin-top: 20px;
        margin-right: 40px;
        float: right;
    }  
}
.log{
    margin-left: 100px;
    label,.el-input{
        margin-top: 20px;
    }
    .el-button{
        margin-left: 110px;
        margin-top:20px
    }
}
</style>