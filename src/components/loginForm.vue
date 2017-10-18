<template>
  <div class="login_form_wrap">
    <h2>运营管理系统登录</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="用户名" class="pad_36"></el-input>
        <i class="iconfont icon-Group1 icon"></i>
      </el-form-item>
      <el-form-item label="" prop="userPwd">
        <el-input type="password" v-model="ruleForm.userPwd" @keyup.enter.native="keyLogin('ruleForm')" placeholder="密码"  auto-complete="off" class="pad_36"></el-input>
        <i class="iconfont icon-password icon"></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login_btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {cookieUtil} from '../js/cookie'
  import http from '../axoios/http'
  import api from '../axoios/api'
  export default {
    data(){
      return {
        ruleForm: {
          userName: '',
          userPwd:''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
        },
        checked:true
      }
    },
    methods:{
      keyLogin(formName){
        this.formLoad(formName);
      },
      submitForm(formName) {
        this.formLoad(formName);
      },
      formLoad(formName){
        let vm = this;
        let checked = true;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            if(!vm.checked){
              return
            }
            vm.checked = false;
            vm.fetchFormData();   // 提交数据
          } else {
            return false;
          }
        });
      },
      fetchFormData: async function() {
        let vm=this;
        let params =vm.ruleForm;
        const res = await http.post(api.login, params)
        vm.checked = true;
        if(!res.data){
          return
        }
        let result = res.data;
        if(result.code===200){
          vm.$message.success(res.data.message);
          cookieUtil.set("token",result.token,'ibaixiong.com');
          vm.$router.push("/entering");
        }else{
          vm.$message.error(res.data.message);
        }
      },
    }
  }
</script>
<style lang="scss">
  .login_form_wrap{
    .el-form-item{
      position: relative;
      width: 240px !important;
      margin: 0 auto 22px;
      .el-form-item__content{
        margin-left: 0 !important;
      }
      .icon{
        position: absolute;
        top: 0;
        left:10px;
        font-size: 18px;
        color: #99A9BF;
      }
      .login_btn{
        width: 240px !important;
      }
    }
   text-align: center;
    padding-top: 200px;
    h2{
      color: #252525;
      font-size: 18px;
      margin-bottom: 25px;
    }
    .pad_36 input{
      padding-left: 36px !important;
    }
  }
</style>
