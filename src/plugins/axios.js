import Vue from 'vue'

// Lib imports
import axios from 'axios'
const $axios = axios.create({
    baseURL: 'http://localhost:3085'
})

Vue.prototype.$http = $axios
