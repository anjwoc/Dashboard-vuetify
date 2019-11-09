<template>
    <v-card
    class="mx-auto"
    color="#F9F9F9"
    max-width="344"
    shaped
    >
    <v-card-text>
        <v-row class="justify-center">
            <div class="mb-4" style="font-size: 20px; text-align: center;">Configuration</div>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-icon class="ma-0 pa-0" size="80">mdi-settings</v-icon>
            </v-col>
            <v-col cols="8">
                <h4 class="mt-7" style="font-size: 60px; font-family: Consolas;">{{this.nodeTitle}}</h4>
                <!-- <v-list-item-title class="mb-1" style="font-size: 55px;"></v-list-item-title> -->
            </v-col>
        </v-row>
        
    </v-card-text>

    <v-card-actions class="justify-center">
        <v-switch
        class="mr-4"
        v-model="switch1"
        label="제어1"
        color="primary"
        ></v-switch>
        <v-switch
        v-model="switch2"
        label="제어2"
        color="primary"
        ></v-switch>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios';
export default {
    props: ['nodeTitle'],
    data(){
        return {
            switch1: false,
            switch2: false,
            device: '',
        }
    },
    watch: {
        switch1: function(){
            this.onChange();
        },
        switch2: function(){
            this.onChange();
        }
    },
    mounted() {
        this.onMounted();
    },
    methods: {
        onMounted(){
            axios.get(`http://13.125.115.145:3085/sensor/getToggleSwitch/1`)
            .then((res)=>{
                console.log("Toggle---------------------------");
                let str = res.data.toString();
                if(str === '1') str='10';
                if(str === '0') str='00';
                if(str === '2') str='01';
                if(str === '3') str='11';
                
                console.log(`asdfsadfsadfasfas: ${str}`)
                let a = str[0] === '0' ? false : true;
                let b = str[1] === '0' ? false : true;
                console.log(`a: ${a} b: ${b}`);
                
                this.switch1 = a;
                this.switch2 = b;
            })
        },
        onChange() {
            const n1 = this.switch1 ? '1' : '0';
            const n2 = this.switch2 ? '1' : '0';
            let onoff = 0;
            if(n1==='0' && n2==='0'){
                onoff=0
            }else if(n1==='1' && n2==='0'){
                onoff=1
            }else if(n1==='0' && n2==='1'){
                onoff=2
            }else if(n1==='1' && n2==='1'){
                onoff=3
            }
            const nodeId = 1;
            console.log(onoff);
            console.log(`nodeId : ${nodeId}`);
            axios.post('http://13.125.115.145:3085/sensor/config', {
                'onoff': onoff,
                'nodeId': nodeId,
            },{
                withCredentials: true,
            })
            .then(()=>{
            })
            .catch(e=>{
                console.error(e);
            });
        }
    }

}
</script>