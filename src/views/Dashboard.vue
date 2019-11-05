<template>
  <v-container fluid>
    <v-row>

      <v-col
        cols="12"
        lg="12"
      >
        <material-chart-card
          :data="realTimeChartChart.data"
          :options="realTimeChartChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">
            Completed Tasks(당일 00시 부터 누적사용량 최대 9시간 까지 표현되는)
          </h3>
          <p class="category d-inline-flex font-weight-light">
            Last Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 1 minutes ago</span>
          </template>
        </material-chart-card>
      </v-col>


      <v-col
        cols="12"
        lg="4"
      >
        <material-chart-card
          :data="totalUsageDayChart.data"
          :options="totalUsageDayChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">
            Total Usage by Day of the Month
          </h4>

          <p class="category d-inline-flex font-weight-light">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55% 어제 사용량과의 차이를 퍼센트를 computed에서 계산해서 넣고</span>&nbsp;
            increase in today's sales(v-if로 increase인지 decrease인지 구분)
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4(이 숫자는 데이터 넘길때 타임스태프 찍어서 서로 시간차이 구해서넣고) minutes ago</span>
          </template>
        </material-chart-card>
      </v-col>


      <!-- 여기 수정해야됌 -->
      <v-col
        cols="12"
        lg="4"
      >
        <material-chart-card
          :data="totalUsageDayChart.data"
          :options="totalUsageDayChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">
            새로 추가할 그래프
          </h4>

          <p class="category d-inline-flex font-weight-light">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">추가할 그래프 부분</span>&nbsp;
            추가
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4(이 숫자는 데이터 넘길때 타임스태프 찍어서 서로 시간차이 구해서넣고) minutes ago</span>
          </template>
        </material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <material-chart-card
          :data="totalUsageEachNodeChart.data"
          :options="totalUsageEachNodeChart.options"
          :responsive-options="totalUsageEachNodeChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">
            Total Usage for Each Node
          </h4>
          <p class="category d-inline-flex font-weight-light">
            Last 24 hours
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </material-chart-card>
      </v-col>

      

      <v-col
        cols="12"
        sm="6"
        lg="6"
      >
        <material-stats-card
          color="green"
          icon="mdi-power-plug"
          title="Real-time electric Fee"
          v-model="this.fee"
          sub-icon="mdi-square-inc-cash"
          sub-text="이번 달 전기요금(누적)"
        >
        </material-stats-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="6"
      >
        <material-stats-card
          color="orange"
          icon="mdi-flash"
          title="electricity usage"
          v-model="this.totalUsage_mA"
          small-value="W"
          sub-icon="mdi-flash"
          sub-icon-color="error"
          sub-text="일일 누적 전기 사용량"
          sub-text-color="text-primary"
        />
      </v-col>
 
      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="orange"
          title="Node Stats"
          text="노드 정보"
        >
        <v-data-table
            :headers="headers"
            hide-default-footer
          /> 
        </material-card>
      </v-col>


      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="primary"
          title="test Sheet"
          text="여기에는 뭘 넣을까??"
        >
        <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
        />

        </material-card>

      </v-col>
    </v-row>
    
  </v-container>


</template>
  <script>
  import axios from 'axios';
  import dotenv from 'dotenv';
  import {
      mapState,
      mapMutations,
      mapActions,
  }from 'vuex';
  dotenv.config();
  export default {
    data () {
      return {
        fee: 0,
        electricityUsage: 0,
        totalUsage_mA: 0,
        totalUsageDayChart: {
          data: {
            labels: [],
            series: [
              []
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 3000, 
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 10
            }
          }
        },
        realTimeChartChart: {
          data: {
            labels: [],
            series: [
              []
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 5,
              left: 5
            }
          }
        },
        totalUsageEachNodeChart: {
          data: {
            labels: [],
            series: [
              []
              ]            
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1200,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        headers: [
          {
            sortable: false,
            text: 'InsertedAt',
            value: 'insertedAt'
          },
          {
            sortable: false,
            text: 'Mac',
            value: 'mac'
          },
          {
            sortable: false,
            text: 'No',
            value: 'no',
            align: 'right'
          },
          {
            sortable: false,
            text: 'W',
            value: 'W',
            align: 'right'
          }
        ],
        items: [],
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false
        }
      }
    },
    computed:{
      ...mapState({
        me : state=>state.users.me,
        twentyFour: state=>state.users.twentyFour,
        tableItem: state=>state.users.tableItem,

        }),
      ...mapActions('users', {
        loadDB: 'loadDB',
        totalItem: 'totalItem',

      })
    },
    mounted(){
      axios.get('http://13.125.115.145:3085/sensor/sum_24h')
      .then((res)=>{
        let data = res.data;
        for(let i=0;i<data.length;i++){
          this.totalUsageEachNodeChart.data['series'][0].push(data[i]['W']);
          this.totalUsageEachNodeChart.data['labels'].push(data[i]['mac']);           
        }
        console.log(this.totalUsageEachNodeChart.data);
        console.log(typeof(this.sumChartData));
      })
      .catch((err)=>{
        console.error(err);
      });
      axios.get('http://13.125.115.145:3085/sensor/acc_1m')
      .then((res)=>{
        let data = res.data;
        for(let i=0;i<data.length;i++){
          this.totalUsageDayChart.data['labels'].push(data[i]['day']);
          this.totalUsageDayChart.data['series'][0].push(data[i]['합계']);
        }
        console.log(this.totalUsageDayChart.data);
        console.log(typeof(this.totalUsageDayChart.data));
      })
      .catch((e)=>{
        console.error(e);
      });
      
      axios.get('http://13.125.115.145:3085/sensor/Avg_Months')
      .then((res)=>{
        let data = res.data;
        console.log("test--------------------------------")
        console.log(data);
        for(let i=0;i<data.length;i++){
          this.MonthlyAverageChart.data['labels'].push(data[i]['dt']);
          this.MonthlyAverageChart.data['series'][0].push(data[i]['kw']);
        }
        console.log(this.MonthlyAverageChart.data);
      })
      .catch((e)=>{
        console.error(e);
      });
      axios.get('http://13.125.115.145:3085/sensor/recent_20')
      .then((res)=>{
        let data = res.data;
        this.recentItems = data;

      })
      .catch((e)=>{
        console.error(e);
      });

      axios.get('http://13.125.115.145:3085/sensor/nodeStat')
      .then(res=>{
        let data = res.data;
        this.nodeStatItems = data;
        console.log(nodenodenode)
        console.log(nodeStatItems);
      })
      .catch(e=>{
        console.error(e);
      });


    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
    sockets:{
      realtimeChartLabels(labels) {
        this.realTimeChartChart.data['labels'] = labels;
      },
      realtimeChartSeries(series){
        this.realTimeChartChart.data['series'][0] = series;
      },
      electricFee(fee){
        this.fee = "￦"+fee;
      },
      totalUsage(usage){
        this.totalUsage_mA = usage;
      }
    }
    
  }
</script>
