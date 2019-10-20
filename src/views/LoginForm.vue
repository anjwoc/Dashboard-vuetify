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
          <v-form refs="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Login"
                    class="purple-input"
                    prepend-icon="person"
                    :rules="nicknameRules"
                    v-model="email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
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
        ...mapState['me'],
        ...mapActions['logIn', 'logOut'],
    },
    watch: {
        me(val){
            if(val){
                this.$router.push({
                    path: '/',
                });
            }
        }
    },
    methods: {
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('/logIn',{
                    email: this.email,
                    password: this.password
                });
            }
        },
        onLogOut() {
            this.$store.dispatch('/logOut');
        },
    },

}
</script>
<style scoped>

</style>