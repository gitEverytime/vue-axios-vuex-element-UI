<template>
  <div>
    <el-row>
      <el-col :span="24" class="error_header">
        欢迎，请先登录
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="error_content">
        <h2>抱歉，出错了</h2>
        <p>
          您输入地址可能有误或该地址已被删除<br>
          请再次检查或返回<router-link to="/login" class="link">重新登录</router-link>
        </p>
        <img src="/static/img/404.png">
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    components:{

    },
  }
</script>
<style lang="scss">
  .error_header{
    background-color: #324057;
    height: 60px;
    padding: 0 40px;
    text-align: right;
    color: #C0CCDA;
    font-size: 16px;
    line-height: 60px;
  }
  .error_content{
    text-align: center !important;
    h2{
      font-size: 20px;
      color: #000000;
      letter-spacing: 0;
      margin-top: 40px;
    }
    p{
      font-size: 16px;
      color: #757D86;
      letter-spacing: 0;
      line-height: 35px;
    }
    img{
      margin-top: 50px;
      width: 450px;
      height: 220px;
    }
  }
</style>
