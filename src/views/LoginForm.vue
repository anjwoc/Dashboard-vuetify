<template>
    <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
      >
        <material-card
          color="primary"
          title="Login"
        >
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Login"
                    class="purple-input"
                    prepend-icon="person"
                    :rules="emailRules"
                    v-model="email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    type="password"
                    class="purple-input"
                    prepend-icon="lock"
                    :rules="passwordRules"
                    v-model="password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn color="success" type="submit">
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>


        </material-card>
      </v-col>
    </v-row>
  </v-container>



</template>
<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Cookies from 'js-cookie'
import {
    mapState,
    mapMutations,
    mapActions,
}from 'vuex';

export default {
    data(){
        return {
            valid: false,
            email: '',
            password: '',
            emailRules:[
                v => !!v || '이메일을 입력해주십시오.',
                v => /.+@.+/.test(v) || '유효하지 않은 이메일입니다.',
            ],
            passwordRules: [
                v => !!v || '비밀번호를 입력해주십시오.',
            ],
        }
    },
    computed: {
        ...mapState({
          me: state => state.users.me
        }),
        ...mapActions('users', {
          logIn: 'logIn',
          serverInit: 'serverInit'
        }),
        ...mapMutations('users',{
          setMe: 'setMe'
        })
    },
    watch: {
        me(val){
            console.log(val);
            if(val){
                this.$router.push({
                    path: '/dashboard',
                });
            }
        }
    },
    methods: {
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('users/logIn',{
                    email: this.email,
                    password: this.password
                })
                .then(res=>{
                  let token = res.data.id;
                  localStorage.setItem("access_token", token);
                  Cookies.set('token', token, {expires: 60*60})
                  this.$router.push('/dashboard');
                  console.log("res.data.id")
                  console.log(res.data.id);
                })
                .catch((e)=>{
                  console.error(e);
                });
            }
        }
    },

}
</script>
<style scoped>

</style>