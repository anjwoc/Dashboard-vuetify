<template>
  <v-container fluid>
    <v-row>

      <v-col
        cols="12"
        lg="6"
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
        lg="6"
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
        lg="6"
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

      <v-col
        cols="12"
        lg="6"
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
        lg="3"
      >
        <material-stats-card
          color="green"
          icon="mdi-power-plug"
          title="Usage"
          value="$34,245(전기)"
          sub-icon="mdi-calendar"
          sub-text="Last month's usage"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="Used Space"
          value="49/50"
          small-value="GB"
          sub-icon="mdi-alert"
          sub-icon-color="error"
          sub-text="Get More Space..."
          sub-text-color="text-primary"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="Fixed Issues"
          value="75"
          sub-icon="mdi-tag"
          sub-text="Tracked from Github"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" lg="6">
        <!-- 저번 달 차트 -->
        <material-chart-card
          type="Line"
          color="primary"

        >

        </material-chart-card>

      </v-col>
      <v-col  cols="12" lg="6">
        <!-- 이번 달 차트 -->
        <material-stats-card
          color="green"
          icon="mdi-power-plug"
          title="Usage"
          value="$34,245(전기)"
          sub-icon="mdi-calendar"
          sub-text="Last month's usage"
        />
        

      </v-col>

      <v-col
        cols="12"
        sm="12"
        lg="6"
      >
        <material-chart-card
          type="Line"
          color="primary"

        >

        </material-chart-card>
      </v-col>
      
      <v-col
        cols="12"
        sm="12"
        lg="6"
      >
        <material-stats-card
          color="green"
          icon="mdi-power-plug"
          title="Usage"
          value="$34,245(전기)"
          sub-icon="mdi-calendar"
          sub-text="Last month's usage"
        />
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="orange"
          title="Employee Stats"
          text="New employees on 15th September, 2016"
        >
          
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
  import {
      mapState,
      mapMutations,
      mapActions,
  }from 'vuex';

  export default {
    data () {
      return {
        fee: 0.0,
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
            text: 'mA',
            value: 'mA',
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
      axios.get('http://localhost:3085/sensor/sum_24h')
      .then((res)=>{
        let data = res.data;
        for(let i=0;i<data.length;i++){
          this.totalUsageEachNodeChart.data['series'][0].push(data[i]['mA']);
          this.totalUsageEachNodeChart.data['labels'].push(data[i]['mac']);           
        }
        console.log(this.totalUsageEachNodeChart.data);
        console.log(typeof(this.sumChartData));
      })
      .catch((err)=>{
        console.error(err);
      });
      axios.get('http://localhost:3085/sensor/acc_1m')
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
      
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
    sockets:{
      connect(){
        console.log('connected to websocket server!');
      },
      realtimeChartLabels(labels) {
        this.realTimeChartChart.data['labels'] = labels;
      },
      realtimeChartSeries(series){
        this.realTimeChartChart.data['series'][0] = series;
      }
    }
    
  }
</script>
