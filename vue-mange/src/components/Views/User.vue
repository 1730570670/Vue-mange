<template>
  <div class="UserContianer">
      <div class="User-head">
        <el-row>
          <el-col :span="25">
            <div class="grid-content bg-purple-dark">
              <el-card>
                <!-- 输入用户名字查询 -->
                <el-input
                placeholder="请输入用户名字查询"
                prefix-icon="el-icon-search" style="width:200px"
                v-model="user">
               </el-input>
                <el-button style="margin-left:20px" icon="el-icon-search" type="primary" @click="selectInfo">查询</el-button>
                <el-button type="primary" style="margin-left:20px" plain icon="el-icon-sort" @click="DataSort">按照入职日期排序</el-button>
                <el-button type="primary" style="margin-left:20px" plain icon="el-icon-sort" @click="AgeSort">按照年龄排序</el-button>
                <el-button type="primary" style="margin-left:20px" plain icon="el-icon-circle-plus" @click="infoVisable">添加信息</el-button>
                <!-- 添加信息面板 -->
                <el-dialog
                    title="添加信息"
                    :visible.sync="addinfoVisable"
                    width="40%">
                    <template>
                      <div class="block">
                         <el-date-picker
                          v-model="timeValue"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                      <!-- 选择省 -->
                      <el-select v-model="provinceselect" filterable placeholder="请选择省" @change="provincechange">
                          <el-option
                            v-for="item in province"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                          </el-option>
                        </el-select>
                        <!-- 选择市 -->
                        <el-select v-model="districtvalue" filterable placeholder="请选择市" @change="districtchange">
                          <el-option
                            v-for="item in district"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                          </el-option>
                        </el-select>
                        <!-- 选择县 -->
                        <el-select v-model="cityvalue" filterable placeholder="请选择县">
                          <el-option
                            v-for="item in hsien"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                          </el-option>
                        </el-select>
                        <!-- 输入用户名字 -->
                        <el-input
                        placeholder="请输入姓名"
                        prefix-icon="el-icon-s-custom" style="width:180px;margin-left:10px;margin-top:10px"
                        v-model="userName">
                        </el-input>
                          <el-input
                        placeholder="请输入年龄"
                        prefix-icon="el-icon-user" style="width:180px;margin-left:10px;margin-top:10px"
                        v-model="userage">
                        </el-input>
                        <br><br>
                        <!-- 选择性别 -->
                        <template>
                          <label class="label1">性别:</label>
                          <el-radio v-model="sexradio" label="男">男</el-radio>
                          <el-radio v-model="sexradio" label="女">女</el-radio>
                        </template>
                        <!-- 是否实习 -->
                        <template>
                          <label class="label2">是否实习:</label>
                          <el-radio v-model="work" label="是">是</el-radio>
                          <el-radio v-model="work" label="否">否</el-radio>
                        </template>  
                    </template>   
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="colseState">取 消</el-button>
                    <el-button type="primary" @click="addUserInfo">添加</el-button>
                    </span>
                </el-dialog>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row class="TwoContainer">
          <el-col :span="25">
            <el-card>
              <!-- 放的表格数据 -->
              <el-table :data="newUserList" height="478"> 
                <el-table-column 
                  v-for="label in UserLabel" :key="label.type" align="center"
                  :prop="label.type"
                  :label="label.label"
                  width="150">
                </el-table-column>
                <el-table-column  align="center"
                  label="删除"
                  width="150">
                  <el-button slot-scope="scope"  @click="removeList(scope.$index,newUserList)">删除</el-button>
                </el-table-column>
                <el-table-column align="center"
                  label="编辑"
                  width="150">
                  <el-button slot-scope="scope"  @click="EditList(scope.$index,newUserList)">编辑</el-button>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 编辑对话框 -->
      <el-dialog
        title="编辑信息"
        :visible.sync="EditVisible" class="el-log"
        width="33%"  >
        <label>姓名: </label><el-input v-model="UpData.UserName" placeholder="请输入要修改的姓名"></el-input>
        <label style="margin-left:30px">年龄: </label><el-input  v-model="UpData.UserAge" placeholder="请输入要修改的年龄"></el-input> 
        <template>
          <div class="block2">
            <label>日期: </label>
              <el-date-picker
              v-model="UpData.UserData"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <label style="margin-left:30px">地址: </label><el-input v-model="UpData.UserAddress" placeholder="请输入要修改的地址"></el-input>
          </div>
        </template>
        <template>
          <label>性别: </label>
          <el-radio v-model="UpData.UserSex" label="男"></el-radio>
          <el-radio v-model="UpData.UserSex" label="女"></el-radio>
        </template>
        <template>
          <label style="margin-left:75px;">是否实习: </label>
          <el-radio v-model="UpData.UserShixi" label="是"></el-radio>
          <el-radio v-model="UpData.UserShixi" label="否"></el-radio>
        </template>
        <br>
        <span  slot="footer" class="dialog-footer"> 
          <el-button @click="EditVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditSave">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'//引入axios
export default {
  name:'U-ser',
  data(){
    return{
      // 表格的标题
      UserLabel:[
        {
          type:'data',
          label:'入职日期'
        },
        {
          type:'name',
          label:'姓名'
        },
        {
          type:'sex',
          label:'性别'
        },
        {
          type:'age',
          label:'年龄'
        },
        {
          type:'address',
          label:'地址'
        },
        {
          type:'state',
          label:'实习状态'
        },
      ],
      // 表格中的数据
      UserList:JSON.parse(localStorage.getItem('UserList')),//查询浏览器自身储存
      user:'',//管理员需要查询的人
      province:[] ,//获取的省的数据
      provinceselect:'',//选择的省
      district:[],//获取市的数据
      districtvalue: '',//选择的市
      hsien:[],//获取的县的数据
      cityvalue:'',//选择的县
      addinfoVisable:false,//添加信息面板的可见状态
      sexradio:'男',//选择的性别
      work:'是',//是否实习的value
      userName:'',//填写的用户信息
      timeValue:'',//管理员填写的时间的信息
      userage:'',//管理员填写的年龄
      newUserList:[],//用来放筛选出的用户数据
      IsSearch:false,//避免出现未搜进行删除,删错数据(解决Bug用)
      EditVisible:false,//编辑信息对话框的打开状态
      UpData:{
        UserName:'',
        UserAge:'',
        UserAddress:'',
        UserShixi:'',
        UserSex:'',
        UserData:''
      },
      isDel:false,//点击删除后的状态
    }
  },
  methods:{
    // 查询事件(筛选姓名)
    selectInfo:function(){
      // 过滤
        this.newUserList=[];//为了防止重复添加数据,先把数据清空
        this.UserList.filter((todo)=>{//过滤遍历数据
          if(todo.name.indexOf(this.user)>-1){//判断搜索的用户下表是否存在(存在下表不会为-1)
            this.newUserList.push(todo);//将过滤的值赋值给新列表
          }  //延迟的方法(查询优化)
        })
    },
    // 获取市区的请求
    provincechange:function(){
      this.districtvalue=this.cityvalue=this.hsien=''
      axios.get('https://restapi.amap.com/v3/config/district?key=b987cb0d6e93e9c8b666e103ba586f9e&keywords='+this.provinceselect).then(
        response =>{
          this.district=response.data.districts[0].districts;
        }
      )
    },
    // 获取县的请求
    districtchange:function(){
      this.cityvalue=""
       axios.get('https://restapi.amap.com/v3/config/district?key=b987cb0d6e93e9c8b666e103ba586f9e&keywords='+this.districtvalue).then(
        response =>{
          // 获取的县数据赋值到本地数据
          this.hsien=response.data.districts[0].districts
        }
      )
    },
    //激活添加信息的面板
    infoVisable:function(){
      this.addinfoVisable=true
    },
    // 添加信息面板中的添加信息事件
    addUserInfo:function(){
      // 年龄的正正则表达式
      var agevalue=/^\d{1,3}$/;
      // 获取管理员所填的信息     
      var addressv=this.provinceselect+this.districtvalue+this.cityvalue;//合并选择的地址信息
      let info={data:this.timeValue,name:this.userName,sex:this.sexradio,age:this.userage,address:addressv,state:this.work}
      // 判断管理员是否正确填写信息
      if(addressv!='' && this.userName!='' && this.timeValue!='' && agevalue.test(this.userage)){
        // 往用户数据数组中最后添加信息
        this.UserList.push(info)
        this.addinfoVisable=false;//将面板状态隐藏
        this.$message({
          message: '添加信息成功!',
          type: 'success',
          center:true
        });
        this.selectInfo();//再次调用查询的方法
        // 添加信息之后将面板里面的数据清空
        this.timeValue=this.userName=this.userage=this.provinceselect=this.cityvalue=this.districtvalue=''
      }else{//如果信息有遗漏就提示
        this.$message({
          message: '请查看是否遗漏信息,或者错误',
          type: 'error',
          center:true
        });
      }
    }, 
    // 面板中取消按钮的事件
    colseState:function(){
      // 添加信息之后将面板里面的数据清空
      this.timeValue=this.userName=this.userage=this.provinceselect=this.cityvalue=this.districtvalue=''
      // 隐藏面板
      this.addinfoVisable=false;
    },
    // 删除的是过滤的数组(还要将原数组进行删除)
    removeList:function(index,List){
      var isDel=confirm("你确定要移除此项吗?")//判断是否点击确定
      if (isDel==true){
        List.splice(index,1);//过滤的数组(对应的下标)进行删除
        var DelArr=[];//删除的下表进行存储   
        // 判断是否点击了搜索(因为搜索框绑定的model=this.user)
        if(this.IsSearch==true){
          for(var i = 0;i<this.UserList.length;i++){//进行UserList数组遍历
            if(this.UserList[i].name.indexOf(this.user)!=-1){
              DelArr.push(i);//将下标存进临时数组   
            }
          }
          this.UserList.splice(DelArr[index],1)//将真实数组数据(下标)进行删除
        }
        // 如果搜索按钮为点击则直接删除数组对应的下标值
        this.UserList.splice(index,1)
      }
    },
    // 编辑(获取信息)
    EditList:function(index,List){
      this.EditVisible=true;//打开面板
      // 以下都是获取信息(获取(过滤)数据列表的信息)
        this.UpData.UserName=List[index].name;
        this.UpData.UserAge=List[index].age;
        this.UpData.UserAddress=List[index].address;
        this.UpData.UserSex=List[index].sex;
        this.UpData.UserShixi=List[index].state;
        this.UpData.UserData=List[index].data;
        this.$store.state.tab.ListIndex=index;//将下标传送到Store,方便保存时使用
    },
    // 编辑(保存信息)
    EditSave:function(){
      var index=this.$store.state.tab.ListIndex;//全局通信,获取点击编辑的下标
      var EditList=[];// 临时数组
      // 判断是否查询状态,如果不是,直接获取原数组下标,直接修改保存
      if(this.IsSearch==false){
        // 赋值
        this.UserList[index].name=this.UpData.UserName;
        this.UserList[index].age=this.UpData.UserAge;
        this.UserList[index].address=this.UpData.UserAddress;
        this.UserList[index].sex=this.UpData.UserSex;
        this.UserList[index].state=this.UpData.UserShixi;
        this.UserList[index].data=this.UpData.UserData;
      }else{//如果是查询状态,将获取的数组存进临时数组,进行修改
        for(var i = 0 ;i<this.UserList.length;i++){
          if(this.UserList[i].name.indexOf(this.user)>-1){
            EditList.push(i)
          }
        }
        // 修改真实数据
        var Upindex=EditList[index]
        this.UserList[Upindex].name=this.UpData.UserName;
        this.UserList[Upindex].age=this.UpData.UserAge;
        this.UserList[Upindex].address=this.UpData.UserAddress;
        this.UserList[Upindex].sex=this.UpData.UserSex;
        this.UserList[Upindex].state=this.UpData.UserShixi;
        this.UserList[Upindex].data=this.UpData.UserData;
      }
      this.EditVisible=false;//关闭面板
      this.selectInfo();//调用查询数据的函数 
      // 不管怎么样,完成之后都要提示
      this.$notify({
          title: '成功',
          message: '更新了一条信息',
          type: 'success'
        });
    },
    // 按照入职日期排序
    DataSort:function(){
      this.UserList.sort((da,db)=>{//因为格式为yyyy-dd-mm,故转换为整数,在进行排序
         var str1=da.data.replace('-','');
         var str2=str1.replace('-','');
         var str3=db.data.replace('-','');
         var str4=str3.replace('-','');
         return str2-str4;//返回
      })
      this.selectInfo();
    },
    // 按照年龄排序
    AgeSort:function(){
      this.UserList.sort((datea,dateb)=>{
        return datea.age-dateb.age
      })
      this.selectInfo();
    }   
  },
  //挂载函数
  mounted:function(){
    // 获取省的数据
    axios.get('https://restapi.amap.com/v3/config/district?key=b987cb0d6e93e9c8b666e103ba586f9e&keywords=').then(
        response =>{
          this.province=response.data.districts[0].districts;
        }
      )
      // 调用筛选的函数(加载就查询空格,会查询出全部数据)
    if(this.UserList!=null){
      this.UserList=JSON.parse(localStorage.getItem('UserList'));
    }else{
      this.UserList=[];
    }
    this.selectInfo();
  },
  // 监视属性
  watch:{
    // 监视用户列表
    UserList:{
      deep:true,
      handler:function(value){
        // 保存进浏览器自身储存
        localStorage.setItem('UserList',JSON.stringify(value))
      }
    },
    // 监视IsSearch的变化
    newUserList:{
      deep:true,
      handler:function(){
        //判断历史记录的数组长度是否跟过滤的数组长度相等
        if(this.newUserList.length==this.UserList.length){
          // 如果相等就说明 this.IsSearch=true;
          this.IsSearch=false;
        }else{
          this.IsSearch=true;
        }
      }
    }
  }

}
</script>

<style lang="less">
// 让整个容器进行宽高限制,超出的部分进行隐藏处理
.UserContianer{
  position: relative;
  top: 15px;
  height: 81vh;
  overflow: hidden;
  width: 80vw;
  left: 5px;
  .User-head{
    // 省市县下拉列表
    .el-select{
      width: 180px;
      margin-left: 10px;
      margin-top: 10px;
    }
  }
  // 时间选择器
  .block{
    margin-left: 10px;
  }
  // 下面为单选按钮的标题
  .label1{
    margin-left: 10px;
  }
  // 下面为单选按钮的标题
  .label2{
    margin-left: 20px;
  }
}
// 表格区域限制宽高,防止溢出
.TwoContainer{
  margin-top: 10px;
  .el-card{
    height: 494px;
  }
  .el-table-column{
   text-align: center;
  }
  
}
.el-log {
 .el-input{
    width: 180px;
  }
}
 
</style>