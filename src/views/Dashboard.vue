<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
      >
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">
            Daily Usage
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
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">
            Email Subscription
          </h4>
          <p class="category d-inline-flex font-weight-light">
            Last Campaign Performance
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
        lg="6"
      >
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">
            Completed Tasks
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
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
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
        sumChartData:{
          'labels': [],
          'series': []
        },
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38]
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        emailsSubscriptionChart: {
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
            high: 500,
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
        let arr1 = new Array();
        let arr2 = new Array();
        let data = res.data
        for(let i=0;i<data.length;i++){
          this.emailsSubscriptionChart.data['series'][0].push(data[i]['mA']);
          this.emailsSubscriptionChart.data['labels'].push(data[i]['mac']);

           
        }
        console.log(this.emailsSubscriptionChart.data);
        console.log(typeof(this.sumChartData));
        // this.sumChartData = Object.assign({}, arr1);
        // this.sumChartLabel = Object.assign({}, arr2);
      })
      .catch((err)=>{
        console.error(err);
      });

    },
    methods: {
      async fetchData() {
        const req = await axios.get('http://localhost:3085/sensor/sum_24h');
        

      },
      complete (index) {
        this.list[index] = !this.list[index]
      },


    }
    
  }
</script>
