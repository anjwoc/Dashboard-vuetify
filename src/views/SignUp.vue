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
          title="회원가입"
          text="사용자 정보"
        >
        <v-container class="py-0">
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="이메일"
                    class="purple-input"
                    :rules="emailRules"
                    v-model="email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="닉네임"
                    class="purple-input"
                    :rules="nicknameRules"
                    v-model="nickname"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="비밀번호"
                    class="purple-input"
                    :rules="passwordRules"
                    v-model="password"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="비밀번호 확인"
                    class="purple-input"
                    :rules="passwordCheckRules"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    v-model="aboutme"
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
          </v-form>
        </v-container>

        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  data(){
    return {
      valid: false,
      email: '',
      password: '',
      nickname: '',
      aboutme: '',
      emailRules: [
        v=> !!v || '이메일을 입력하십시오.',
        v=> /.+@.+/.test(v) || '유효하지 않은 이메일입니다.',
      ],
      nicknameRules: [
        v=> !!v || '닉네임을 입력해주십시오.'
      ],
      passwordRules: [
        v=> !!v || '패스워드를 입력해주십시오.',
      ],
      passwordCheckRules: [
        v=> !!v || '비밀번호 확인을 해주십시오.',
        v=> v === this.password || '비밀번호가 일치하지 않습니다.',
      ],
    }
  },
  computed: {
    ...mapState({
      me: state=> state.users.me
    }),
    ...mapActions('users',{
      signUp: 'signUp',

    }),
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
  methods:{
    onSubmitForm(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('users/signUp',{
          nickname: this.nickname,
          email: this.email,
          password: this.password,
          aboutme: this.aboutme
        })
        .then(()=>{
          console.log("진입");
          this.$router.push({
            path: '/',
          });
        })
        .catch((e)=>{
          console.error(e);
          alert('회원가입 실패');
        });
      }
    }
  },
  middleware: 'anonymous',
  
}
</script>
<style scoped>

</style>