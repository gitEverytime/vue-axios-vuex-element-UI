<template>
  <div>
    <el-row>
      <el-col :span="24" class="login_header">
        欢迎，请先登录
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <login-form></login-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import loginForm from '../loginForm.vue'
  export default {
    components:{
      loginForm
    },
  }
</script>
<style lang="scss">
  .login_header{
    background-color: #324057;
    height: 60px;
    padding: 0 40px;
    text-align: right;
    color: #C0CCDA;
    font-size: 16px;
    line-height: 60px;
  }
</style>
