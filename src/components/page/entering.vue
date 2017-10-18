<template>
	<div>
		<div class="con">
			<div class="container cont_wrap">
          <div class="col-md-5">
            <div class="entering_bg">
              <div class="enteringBox">

              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mt20 form_box">
              <form-data></form-data>
            </div>
          </div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import formData from "../formData.vue"
  import http from '../../axoios/http'
  import api from '../../axoios/api'
	export default{
		name:'entering',
		data(){
			return {

			}
		},
    mounted: function () {
		  let vm = this;
//      vm.fetchData();
    },
    methods:{
    },
    components:{
      formData
    },
	}
</script>
<style lang="scss">

</style>
