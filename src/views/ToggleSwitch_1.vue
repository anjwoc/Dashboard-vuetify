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
    </v-card-actions>
    <v-row class="ma-0 pa-0 justify-center">
            <div class="ma-0 pa-0">
                <v-btn text large color="primary" @click="onChange">설정 변경</v-btn>
            </div>
    </v-row>
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
    },
    mounted: {
        
    },
    methods: {
        onChange() {
            const onoff = this.switch1 ? 1 : 0;
            const nodeId = (this.$route.path === '/' || '/node-1') ? '0' : '1'
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