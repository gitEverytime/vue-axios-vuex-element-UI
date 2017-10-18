<template>
	<div class="nav">
    <el-row class="header_wrap">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="enteringUrl" class="first_list">业绩录入</el-menu-item>
            <el-menu-item index="2" @click="examineUrl">业绩查看</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="12" class="el-menu--dark col_right">
        <span class="m_r_30">欢迎回来</span>
        <!--<i class="iconfont icon-Group1 m_r_30"></i>-->
        <i class="iconfont icon-Group m_r_30" @click="setLogout"></i>
      </el-col>
    </el-row>
	</div>
</template>
<script>
  import {cookieUtil} from '../../js/cookie'
  export default {
    data(){
      return {
      }
    },
    mounted(){
//      console.log(cookieUtil.get("token"));
    },
    computed:{
      activeIndex:function () {
        return this.$store.getters.getActiveIndex;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
      },
      enteringUrl(){
        this.$router.push("/");
      },
      examineUrl(){
        this.$router.push("/examine");
      },
      setLogout: async function() {
//        let params = {
//        };
//        let vm = this;
//        const res = await http.post(api.logout, params);
//        if (res.data.code===205) {
//          vm.$router.push("/login");
//        }
        cookieUtil.delCookie("token");
        this.$router.push("/login");
      }
    }
  }
</script>
<style lang="scss">
.header_wrap{
  .el-menu-item{
    color: #C0CCDA !important;
  }
  .is-active{
    color: #ffffff !important;
  }
  .first_list{
    margin-left: 56px !important;
  }
  .col_right{
    height: 60px;
    line-height: 60px;
    text-align: right;
    color: #ffffff;
  }
  .el-menu{
    border-radius: 0 !important;
  }
  .m_r_30{
    margin-right: 30px;
    cursor: pointer;
  }
}

</style>
