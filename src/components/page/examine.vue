<template>
	<div>
		<div class="examin echarts">
			<div class="bg_white pad_40">
        <el-row class="examine_header">
          <el-col :span="12">
            <h2>部门统计</h2>
          </el-col>
          <el-col :span="12" class="col_right">
            <el-radio-group v-model="radio2"  @change="changeQueryByDate">
              <el-radio :label="3">当日</el-radio>
              <el-radio :label="6" >本周</el-radio>
              <el-radio :label="9" >本月</el-radio>
            </el-radio-group>
            <el-date-picker
              v-model="value6"
              class="mar_l_15"
              type="daterange"
              :picker-options="pickerOptions0"
              @change="dateChange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="apart"
            label="部门"
           >
          </el-table-column>
          <el-table-column
            prop="totalCustomerNum"
            label="客户量"
            >
          </el-table-column>
          <el-table-column
            prop="totalInvitationNum"
            label="邀请数">
          </el-table-column>
          <el-table-column
            prop="totalSignNum"
            label="签约数">
          </el-table-column>
          <el-table-column
            prop="totalSignAmount"
            label="签单金额">
          </el-table-column>
        </el-table>
        <el-row class="echarts_wrap" >
          <el-col :span="13">
            <h3 class="el-title">客户数据</h3>
            <div style="height: 300px;">
              <IEcharts :option="bar" :loading="loading" v-if="this.showbar"></IEcharts>
            </div>
          </el-col>
          <el-col :span="2">
            <ul class="data_wrap">
            <li>
              <label class="green"></label><span>招商</span>
            </li>
            <li>
              <label class="yellow"></label><span>运营</span>
            </li>
            <li>
              <label class="blue"></label><span>大客户</span>
            </li>
            </ul>
          </el-col>
          <el-col :span="7">
            <h3 class="el-title">签单金额</h3>
            <div style="height: 300px;">
              <IEcharts :option="pie"></IEcharts>
            </div>
          </el-col>
          <el-col :span="2">
            <ul class="data_wrap">
              <li>
                <label class="green"></label><span>招商</span>
              </li>
              <li>
                <label class="yellow"></label><span>运营</span>
              </li>
              <li>
                <label class="blue"></label><span>大客户</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row v-if="this.stackLength ?this.showBrokenLine:!this.showBrokenLine">
          <el-col :span="24" style="position: absolute;">
            <h3 class="el-title">时间流</h3>
            <div style="height: 360px; width: 70%;">
              <IEcharts :option="stack"></IEcharts>
            </div>
            <el-select  v-model="selectedValue" placeholder="请选择"  @change="changeTypeEvent">
              <el-option
                v-for="item in options"
                :key="item.selectedValue"
                :label="item.label"
                :value="item.selectedValue">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
		</div>

	</div>
</template>
<script type="text/javascript">
	import headerTop from "../common/header.vue";
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import {cookieUtil} from '../../js/cookie'
  import {getNewDate,getNowDayWeek,getNowDayMonth} from '../../js/getDate'
  import http from '../../axoios/http'
  import api from '../../axoios/api'
	export default{
		name:'entering',
		components:{
      headerTop,
      IEcharts
		},
		data(){
			return {
        options: [{
          selectedValue: '1',
          label: '客户量'
        }, {
          selectedValue: '2',
          label: '邀请数'
        }, {
          selectedValue: '3',
          label: '签约数'
        }, {
          selectedValue: '4',
          label: '签单金额'
        }],
        selectedValue: '1',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        data: [5, 20, 90],
        dataList: {
          data1: '',
          data2: ''
        },
        radio2: 3,
        value6: '',
        showBrokenLine: false,
        tableData: [],
        totalData: {
          department: 4,
          totalCustomerNum: 0,
          totalInvitationNum: 0,
          totalSignNum: 0,
          totalSignAmount: 0
        },
        custNum: [],
        intNum: [],
        signNum: [],
        amountNum: [],
        loading: false,
        bar: {
          title: {
            text: ''
          },
          xAxis: {
            data: ["客户量","邀请数","签约数"]
          },
          yAxis: {},
          series: [
            {
              name:'扶贫局通知',
              type:'bar',
              //data:fu,
              data:[],
              //设置柱体颜色
              itemStyle:{
                normal:{color:'#13CE66'}
              }
            },
            {
              name:'云平台通知',
              type:'bar',
              //data:yun,
              data:[],
              //设置柱体颜色
              itemStyle:{
                normal:{color:'#F7BA2A'}
              }
            },
            {
              name:'其他',
              type:'bar',
              //data:qi,
              data:[],
              //设置柱体颜色
              itemStyle:{
                normal:{color:'#20A0FF'}
              }
            }

          ]
        },
        pie: {
          title: {
            text: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: [],
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [{
            name: '金额',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        },
        stack: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '',
              type: 'line',
              smooth: true,  //这句就是让曲线变平滑的
              stack: '总量1',
              data: [],
              itemStyle: {
                normal: {
                  color: "#13CE66",  //连线颜色,
                  borderColor: "#13CE66"
                }
              },
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              stack: '总量2',
              data: [],
              itemStyle: {
                normal: {
                  color: "#F7BA2A",  //连线颜色
                  borderColor: "#F7BA2A"
                }
              },
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              stack: '总量3',
              data: [],
              itemStyle: {
                normal: {
                  color: "#20A0FF",  //连线颜色
                  borderColor: "#20A0FF"
                }
              },
            }
          ]
        },
        stackLength: true,
        params: {
          startTime: "",
          endTime: ""
        },
        chooseData: {
          start: "",
          end: ""
        },
        timeflows:[],
        okeys:[],
        showbar:true,
        val:[],
        department:"",
        key:"",
        paramsData:[],
        sumBusinessData:[],
        sumOperateData:[],
        sumcustomData:[],
        section:"",
        text:"",
        zhaoshang:"",
        yunying:"",
        dakehu:""

      }
		},
		mounted(){
      this.$store.dispatch("setActiveIndex","2");
      //初始化当天数据查询
      this.params.startTime = getNewDate.getDate(0)+" 00:00:00";
      this.params.endTime = getNewDate.getDate(0)+" 00:00:00";
      this.fetchExamineData();  //请求录入数据接口
		},
		methods:{
		//ps:对时间轴的处理逻辑：先根据选择的开始时间和结束时间最后的日期的天数算出相隔多少天，如果天数为零不展示；如果天数介于1-10天，展示，每一天的日期对应每一天的数据，如果天数
    //介于10-20天，两天的数据相加展示在这两天最后一天的数据轴上， 介于20-30天，三天的数据相加展示在这三天最后一天的数据轴上，

      /**
       * 时间流切换（客户量，邀请数，签约数，签单金额）
       * @param val
       */
      changeTypeEvent(val){
        this.fetchExamineData();
      },
      /**
       * 选择日期切换（选择从开始时间到结束时间查询）
       * @param val
       */
      dateChange(val){
        let vm = this;
        this.radio2 = "";
        vm.text=4;
        vm.stack.xAxis.data = [];
        let radio = val.split("-");
        let sRadio = radio[2];
        let dRadio = radio[5];
        //判断当月和日小于10加零处理
        if(sRadio<10){
          sRadio = "0"+sRadio;
        }
        if(dRadio<10){
          dRadio = "0"+dRadio;
        }
        /**
         * 配置选择日期开始结束的请求接口的两个参数
         * */
        let newRadio = radio[3].replace(/(^\s*)|(\s*$)/g, "");   //对结束时间前面的空格做清除处理
        vm.params.startTime = (radio[0]+"-"+radio[1]+"-"+radio[2])+" 00:00:00";
        vm.params.endTime = (newRadio+"-"+radio[4]+"-"+radio[5])+" 00:00:00";
        /**
         * 刻度渲染（选择日期）
         * */
        vm.chooseData.start = radio[0]+"-"+radio[1]+"-"+radio[2];
        vm.chooseData.end = newRadio+"-"+radio[4]+"-"+radio[5];
        vm.stackLength = false;
        let sDays = radio[5] - radio[2];
        if(sDays=== 0){    //当起始时间和结束时间相等时间轴不展示
          vm.stackLength = true;
          vm.fetchExamineData();
        }else if(sDays>0 && sDays<=10){   //相差时间介于1-10天
          vm.computeredChooseNum(1,sDays);  //对时间轴的刻度计算数据处理
          vm.section = 1;
          vm.fetchExamineData();
          return
        }else if(sDays>10 && sDays<=20){  //相差时间介于11-20天
          vm.computeredChooseNum(2,sDays);
          vm.section = 2;
          vm.fetchExamineData();
          return
        }else if(sDays>10 && sDays<=30){   //相差时间介于21-30天
          vm.computeredChooseNum(3,sDays);
          vm.section = 3;
          vm.fetchExamineData();
          return
        }else{
          return
        }
      },
      /**
       * 选择日，周，月数据切换渲染
       * @param val
       */
      changeQueryByDate(val){
        /**
         * 刻度渲染
         */
        let vm = this;
        vm.stackData();  //切换处理function
        vm.fetchExamineData();  //请求接口function
      },
      /**
       * 周，月度，当天切换处理function
       */
      stackData(){
        let vm = this;
        let val = vm.radio2;
        let startTime = getNewDate.getDate(0).split("-");
        switch (val){
          case 3:  //当日
            /**
             * 配置当日请求接口的两个参数
             * */
            vm.stackLength = true;
            vm.params.endTime = getNewDate.getDate(0)+" 00:00:00";
            vm.params.startTime = getNewDate.getDate(0)+" 00:00:00";
            break;
          case 6:  //本周
            vm.stackLength = false;
            /**
             * 配置本周请求接口的两个参数
             * */
            vm.params.endTime = getNewDate.getDate(0)+" 00:00:00";
            vm.params.startTime = getNewDate.getDate(-(getNewDate.getNowDayWeek()-1))+" 00:00:00";
            vm.stack.xAxis.data = [];
            /**
             * 清空曲线x轴数据并重新计算渲染
             * */
            let endTime = getNewDate.getDate(-(getNewDate.getNowDayWeek()-1)).split("-");
            let days = startTime[2] - endTime[2];  //算出时间间隔
            if(days=== 0){
              this.stackLength = true;    //设置小于间隔一天曲线不展示
            }
            for(let i=0; i<days+1; i++){
              vm.stack.xAxis.data.unshift(getNewDate.getDate(-i));  //曲线间隔data数据添加时间
            }
            break;
          case 9:  //本月
            vm.stackLength = false;
            /**
             * 配置当月请求接口的两个参数
             * */
            vm.params.endTime = getNewDate.getDate(0)+" 00:00:00";
            vm.params.startTime = getNewDate.getNowDayMonth()+" 00:00:00";
            vm.stack.xAxis.data = [];
            /**
             * 清空曲线x轴数据并重新计算渲染
             * */
            let endMonthTime = getNewDate.getNowDayMonth().split("-");
            let oDays = startTime[2] - endMonthTime[2];
            if(oDays=== 0){
              vm.stackLength = true;
            }else if(oDays>0 && oDays<=10){
              vm.computeredNum(1,oDays);   //对时间轴的刻度计算数据处理
              vm.section = 1;
              return
            }else if(oDays>10 && oDays<=20){
              vm.computeredNum(2,oDays);
              vm.section = 2;
              return
            }else if(oDays>10 && oDays<=30){
              vm.computeredNum(3,oDays);
              vm.section = 3;
              return
            }else{
              return
            }
            break;
        }
      },
      /***
       * 接口数据处理逻辑（柱状图，饼状图，曲线图）
       * @returns {Promise.<void>}
       */
      fetchExamineData: async function() {
        let vm=this;
        /**
         * 对切换原先保留的数据进行清空操作
         * */
        vm.sumBusinessData=[];
        vm.sumOperateData=[];
        vm.sumcustomData=[];
        //请求录入查看数据接口
        const res = await http.post(api.queryByDate+"?token="+cookieUtil.get("token"), vm.params)
        let result = res.data;
        if(!result){  //如果没有数据就不会执行下面的脚本并返回
          return
        }
        if(result.code===0 && result.data!==""){
          vm.tableData = result.data.statistics;  //总的存贮数据
          vm.timeflows = result.data.timeflows;   //存贮查询到的日期数据
          /**
           * 计算各项总和，添加数组里面
           */
          vm.custNum = [];
          vm.intNum = [];
          vm.signNum = [];
          vm.amountNum = [];
          vm.bar.series[0].data = [];
          vm.bar.series[1].data = [];
          vm.bar.series[2].data = [];
          vm.totalData.totalCustomerNum = vm.totalData.totalSignAmount = vm.totalData.totalSignNum =vm.totalData.totalInvitationNum =0;
          /**
           * 柱状体数据渲染
           * */
          vm.tableData.forEach(function(value,key,arr){
            /**
             * 算出总的客户量，邀请数，签约数，签单金额
             * */
            vm.totalData.totalCustomerNum += value.totalCustomerNum;
            vm.totalData.totalInvitationNum += value.totalInvitationNum;
            vm.totalData.totalSignNum += value.totalSignNum;
            vm.totalData.totalSignAmount += value.totalSignAmount;
            vm.showbar = true;
            if(value.department && (value.department === 2)){   //运营
              vm.bar.series[1].data=[value.totalCustomerNum,value.totalInvitationNum,value.totalSignNum];
            }else if(value.department && (value.department === 3)){  //大客户
              vm.bar.series[2].data=[value.totalCustomerNum,value.totalInvitationNum,value.totalSignNum];
            }else if(value.department && (value.department === 1)){   //招商
              vm.bar.series[0].data=[value.totalCustomerNum,value.totalInvitationNum,value.totalSignNum];
            }else{
              vm.showbar = false;
              return
            }
            vm.amountNum.push(value.totalSignAmount);
          });
          vm.tableData = result.data.statistics;
          //把总的分项数据添加到数组中
          vm.tableData.push(vm.totalData);
          /**
           * 根据返回的department类型知道对应的部门
           */
          vm.pie.series[0].data =[];
          /**
           * 饼状图数据渲染
           */
          vm.pie.color = [];
          vm.stack.series[0].data =[];
          vm.stack.series[1].data = [];
          vm.stack.series[2].data = [];
          for (let i=0;i<vm.tableData.length;i++){
            let department = vm.tableData[i].department;
            switch (department){
              case 1:
                vm.tableData[i].apart="招商";
                vm.pie.series[0].data.push({
                  name:"招商",
                  value:vm.tableData[i].totalSignAmount
                });
                vm.pie.series[0].data[0].value = vm.tableData[i].totalSignAmount;
                vm.pie.color.push("#13CE66");

                vm.stack.legend.data.push("招商");
                vm.stack.series[0].name = "招商";
                break;
              case 2:
                vm.tableData[i].apart="运营";
                vm.pie.series[0].data.push({
                  name:"运营",
                  value:vm.tableData[i].totalSignAmount
                });
                vm.pie.color.push("#F7BA2A");

                vm.stack.legend.data.push("运营");
                vm.stack.series[1].name = "运营";
                break;
              case 3:
                vm.tableData[i].apart="大客户";
                vm.pie.series[0].data.push({
                  name:"大客户",
                  value:vm.tableData[i].totalSignAmount
                });
                vm.pie.color.push("#20A0FF");

                vm.stack.legend.data.push("大客户");
                vm.stack.series[2].name = "大客户";
                break;
              case 4:
                vm.tableData[i].apart="总计";
                break;
            }
          }
          /**
           * 曲线图数据渲染
           *
           * @fanwenqiang   2017/09/29
           */
          vm.brokenLine();
        }
      },
      /**
       * 曲线图数据渲染function
       * */
      brokenLine(){
        let vm = this;
        let xAxis = vm.stack.xAxis.data;
        let timeflows = vm.timeflows;
        if(vm.radio2 === 6){     //周折线渲染
          vm.paramsSumData(vm.stack.series[0].data,vm.stack.series[1].data,vm.stack.series[2].data,xAxis);
          //参数1，折线图招商数据数组；参数2，折线图运营数据数组；参数3，折线图大客户数据数组；参数三，x轴坐标数据
        }
        if(vm.radio2 === 9 || vm.text === 4 ){  //月份和选择日期折线图渲染
          vm.paramsSumData(vm.sumBusinessData,vm.sumOperateData,vm.sumcustomData,vm.paramsData);
          //参数1，查询区间每一天招商数据数组；参数2，查询区间每一天运营数据数组；参数3，查询区间每一天大客户数据数组；参数三，查询区间所有天数日期的数据数组

          //把各个部门的数据渲染到坐标data里面
          let j=1;
          sumData(vm.sumBusinessData,0);
          sumData(vm.sumOperateData,1);
          sumData(vm.sumcustomData,2);
          /***
           *vm.section是之前算出的天数的区间（1，2，3）
           * */
          function sumData(arr,key) {
            for (let i=0; i<arr.length;i=i+vm.section){
              if(vm.section === 1){
                vm.stack.series[key].data.push(arr[i]);
                j=1;
              }
              if(vm.section === 2){
                if(i === 0){
                  vm.stack.series[key].data.push(arr[0]);
                }else{
                  vm.stack.series[key].data.push((arr[i]+arr[i-1]));
                }
              }
              if(vm.section === 3){
                if(i === 0){
                  vm.stack.series[key].data.push(arr[0]);
                }else{
                  vm.stack.series[key].data.push((arr[i]+arr[i-1]+arr[i-2]));
                }
              }
            }
          }
        }
      },
      /**
       * 参数4数组去和总数据循环比对，如果发现有相同天数，那么拿出这一天的数据，并根据这一天的数据属于哪一个部门push到对应的参数1，2，3的数组里面
       * 如果其他部门没有数据，则补零；如果这一天什么数据也没有，各个部门数据数组都补零
       * */
      paramsSumData(arr1,arr2,arr3,arr4){
        let vm = this;
        arr4.forEach(function (value,key,Arr) {
          let isPush =false;
          vm.val=[];
          vm.timeflows.forEach(function (val,okey,oArr) {
            let entryDate = val.entryDate;
            let newEntryDate = entryDate.substring(0,entryDate.length-9); //拿出00：00：00之前的日期
            if(newEntryDate === value){ //比对相同拿出数据
              isPush = true;
              let selectedValue = vm.selectedValue;  //看时间轴是要展示客户量|邀请数|签约数|签单金额的数据
              switch (selectedValue){
                case "1":
                  vm.val.push({
                    param1:val.customerNum,
                    param2:val.department
                  });  //这一天的客户量
                  break;
                case "2":
                  vm.val.push({
                    param1:val.invitationNum,
                    param2:val.department
                  });  //这一天的邀请数val.invitationNum
                  break;
                case "3":
                  vm.val.push({
                    param1:val.signNum,
                    param2:val.department
                  });   //这一天的签约数val.signNum
                  break;
                case "4":
                  vm.val.push({
                    param1:val.signAmount,
                    param2:val.department
                  });   ////这一天的签单金额val.signAmount
                  break;
              }
            }
          })
          /**
           * 拿到所有的数据:如果有相等的
           */
          if(isPush){
            vm.zhaoshang="";
            vm.yunying="";
            vm.dakehu="";
            vm.val.forEach(function (value,key,Arr) {
              if(vm.val[key].param2 ===1){   //招商的数据
                  vm.zhaoshang = vm.val[key].param2;
                  arr1.push(vm.val[key].param1);
              }
              if(vm.val[key].param2 ===2){   //运营的数据
                vm.yunying = vm.val[key].param2;
                arr2.push(vm.val[key].param1);
              }
              if(vm.val[key].param2 ===3){   //大客户的数据
                vm.dakehu = vm.val[key].param2;
                arr3.push(vm.val[key].param1);
              }
            });
            if(vm.zhaoshang==""){
              arr1.push(0);
            }
            if(vm.yunying==""){
              arr2.push(0);
            }
            if(vm.dakehu==""){
              arr3.push(0);
            }
          }else{
            arr1.push(0);
            arr2.push(0);
            arr3.push(0);
          }
        })
      },
      /**
       * 计算日，周，月对应的轴X坐标数据
       * @param val  区间间隔
       * @param oDays    区间总天数
       */
      computeredNum(val,oDays){
        let vm = this;
        vm.paramsData = [];
        let kDays = parseInt(oDays / val);
        for (let i = 0; i < kDays + 1; i++) {  //刻度所要表现出来的数据源
          i===0?vm.stack.xAxis.data.unshift(getNewDate.getDate(0)):vm.stack.xAxis.data.unshift(getNewDate.getDate(-(i* val)));
        }
        for (let j = 0; j < oDays+1; j++){     //总的数据源
          j===0?vm.paramsData.unshift(getNewDate.getDate(0)):vm.paramsData.unshift(getNewDate.getDate(-j));
        }
        if (oDays % val !== 0) {
          vm.stack.xAxis.data.unshift(getNewDate.getNowDayMonth());
          vm.paramsData.unshift(getNewDate.getNowDayMonth());
        }
      },
      /**
       * 计算选择日期对应的X坐标数据
       * @param val
       * @param sDays    区间总天数
       */
      computeredChooseNum(val,sDays){
        let vm = this;
        vm.paramsData = [];
        let end = vm.chooseData.end.split("-");
        let kDays = parseInt(sDays / val);
        for (let i = 0; i < kDays + 1; i++) {
          if(i===0){
            vm.stack.xAxis.data.unshift(vm.chooseData.end);
          }else{
            let endNum = end[2]-(i* val);
            if(endNum<10){
              endNum = "0"+endNum
            }
            vm.stack.xAxis.data.unshift(end[0]+"-"+end[1]+"-"+endNum);
          }
        }
        for (let j = 0; j < sDays+1; j++){     //总的数据源
          let endNum = end[2]-j;
          if(endNum<10){
            endNum = "0"+endNum
          }
          j===0?vm.paramsData.unshift(vm.chooseData.end):vm.paramsData.unshift(end[0]+"-"+end[1]+"-"+endNum);
        }
        if (sDays % val !== 0) {
          vm.stack.xAxis.data.unshift(vm.chooseData.start);
//          vm.paramsData.unshift(vm.chooseData.start);
        }
      }
		},
	}
</script>
<style lang="scss">
  .examin{
    .el-select {
      display: inline-block;
      position: absolute !important;
      width: 110px;
      top: 0;
      right: 30%;
    }
    .el-table{
      margin-bottom: 21px;
    }
    .examine_header{
      height: 68px;
      line-height: 68px;
      h2{
        height: 68px;
        line-height: 68px;
        font-size: 18px;
        color: #1F2D3D;
      }
      .col_right{
        text-align: right;
      }
    }
    .el-title{
      font-size: 18px;
      color: #1F2D3D;
      margin-top: 22px;
    }
    .echarts_wrap{
    }
    .data_wrap{
      padding-top: 68px;
      li{
        margin-bottom: 4px;
        label{
          width: 24px;
          height: 12px;
          border-radius: 2px;
          display: inline-block;
          margin-right: 8px;
        }
        .green{
          background-color: #13CE66;
        }
        .yellow{
          background-color: #F7BA2A;
        }
        .blue{
          background-color: #20A0FF;
        }
      }
    }
  }
  .list_wrap{
    height: 64px;
    line-height: 64px;
    padding-left: 85px;
    a{
      color: #4d4d4d;
      display: block;
      margin-left: 32px;
      float: left;
      &:hover{
        color: #ff6b2c;
      }
    }
  }
  .choose_wrap{
    line-height: 64px;
    .text{
      text-align: center;
    }
    .search-btn{
      width: 118px;
      height: 38px;
      border-radius: 19px;
      background-color: transparent !important;
      color: #4b90ff !important;
      margin-left: 32px;
    }
  }
</style>
