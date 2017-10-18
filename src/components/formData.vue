<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="部门" prop="partmentType">
        <el-select v-model="ruleForm.partmentType" placeholder="请选择部门类型" class="with_40">
          <el-option
            v-for="item in options"
            :key="item.dictCodeName"
            :label="item.dictCodeName"
            :value="item.dictCodeValue">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="日期" prop="data1" >
        <el-date-picker
          class="with_40"
          v-model="ruleForm.data1"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
          @change="dateChange">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="客户量" prop="customer">
      <el-input-number v-model="ruleForm.customer"  :min="0" :max="9999"></el-input-number>
    </el-form-item>
    <el-form-item label="邀请数" prop="invite">
      <el-input-number v-model="ruleForm.invite"  :min="0" :max="9999"></el-input-number>
    </el-form-item>
    <el-form-item label="签约数" prop="num">
      <el-input-number v-model="ruleForm.num"  :min="0" :max="9999"></el-input-number>
    </el-form-item>
    <el-form-item label="签单金额" prop="money">
      <el-input-number v-model="ruleForm.money"  :min="0" :max="999999999" @keyup.enter.native="keyLogin('ruleForm')"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="primary_btn" size="large" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import http from '../axoios/http'
  import api from '../axoios/api'
  import {cookieUtil} from '../js/cookie'
  export default{
    name:'entering',
    data(){
      let checkNum = (rule, value, callback) => {   //数量验证
        if (value<=0) {
          return callback(new Error('数量不能少于1'));
        }else{
          callback();
        }
      };
      let checkNumType = (rule, value, callback) => {     //部门验证
        if (value<=0) {
          return callback(new Error('请选择部门'));
        }else{
          callback();
        }
      };
      return {
        options:[],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();          }
        },
        ruleForm:{
          partmentType: '',
          data1: '',
          customer:'',
          invite:'',
          num:'',
          money:'',
        },
        departType:"",
        dataValue:"",
        rules: {
          partmentType: [
            { validator: checkNumType, trigger: 'change' }
          ],
          data1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
      }
    },
    mounted: function () {
      /**
       * 获取部门列表
       */
      this.fetchDepartmentList();
    },
    methods:{
      fetchDepartmentList: async function() {
        let params = {};
        let vm = this;
        let depart = api.departmentList+"?token="+cookieUtil.get("token");
        const res = await http.post(depart, params);
        if(!res.data){
          return
        }
        if (res.data.code===0) {
            vm.options=res.data.data;
        }
      },
      keyLogin(formName){
        this.formLoad(formName);
      },
      submitForm(formName) {
        this.formLoad(formName);
      },
      formLoad(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fetchExmineData();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      fetchExmineData: async function() {
        let vm = this;
        let params = {
          "department": this.ruleForm.partmentType,
          "entryDate": this.dataValue + " 00:00:00",
          "customerNum": this.ruleForm.customer,
          "invitationNum": this.ruleForm.invite,
          "signNum": this.ruleForm.num,
          "signAmount": this.ruleForm.money
        }
        let entry = api.entry+"?token="+cookieUtil.get("token");
        const res = await http.post(entry, params)
        if(!res.data){
          return
        }
        let result = res.data;
        if(result.code === 0){
          vm.$message.success("录入成功！");
        }else{
          vm.$message.error(res.data.message);
        }
      },
      dateChange(val){
        this.dataValue=val;
      },
    },
    components:{

    },
  }
</script>
<style lang="scss">
  .with_40{
    width: 240px !important;
  }
  .dropdown__item:hover {
    background-color: #ff6b2c !important;
  }
  .el-select-dropdown__item.selected {
    color: #fff;
    background-color: #ff6b2c !important;
  }
  .primary_btn{
    width: 195px;
    height: 40px;
    margin-left: 90px;
    margin-top: 4px;
  }
  .el-form-item__label{
    font-size: 16px !important;
    &:before{
      content:'' !important;
    }
  }
</style>
