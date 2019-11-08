import Vue from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:3085');
//connection: 'http://13.125.115.145:3085',
//connection: 'http://localhost:3085'

const SocketPlugin = {
  install(vue) {
    vue.mixin({
    });

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);