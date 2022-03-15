<template>
    <div class="mallContainer">
      <el-col>
        <el-row>
          <!-- 轮播图 -->
          <el-card>
            <div class="swiper">
               <el-carousel :interval="3000" type="card" height="200px">
                <el-carousel-item v-for="item in 3" :key="item">
                  <h3 class="medium" style="text-align:center">图片{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </div>
</template>

<script>
export default {
    name:'M-all'
}
</script>

<style lang="less">
.mallContainer{
  position: relative;
  left: 3px;
  top: 15px;
  .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  }

  .el-carousel__item:nth-child(1n+1) {
    background-color: #d3dce6;
  }
}
</style>