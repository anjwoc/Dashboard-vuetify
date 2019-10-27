import axios from 'axios'
import dotenv from 'dotenv'
//actions
dotenv.config();

export default {
    signUp({commit, state}, payload){
        axios.post(process.env.base_url + '/user', {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password,
          aboutme: payload.aboutme,
        })
          .then((res)=>{
            console.log(res);
            commit('setMe', res.data);
          })
          .catch((err)=>{
            console.error(err);
          });
      },
      logIn({commit, dispatch}, payload){
        axios.post(process.env.base_url + '/user/login',{
          email: payload.email,
          password: payload.password,
        },{
          withCredentials: true,
        })
          .then((res)=>{
            commit('setMe', res.data);
          })
          .catch((e)=>{
            console.error(e);
          });
      },
      logOut({commit }){
        axios.post(process.env.base_url + '/user/logout',{},{
          withCredentials: true,
        })
          .then((res)=>{
            commit('setMe', null);
          })
          .catch((e)=>{
            console.error(e);
          });
      },
      async loadUser({commit}){
        //로컬 스토리지에 저장된 토큰을 불러온다.
        try{
          const res = await this.$axios.get('/user', {
            withCredentials: true,
          });
          commit('setMe', res.data); 
        }catch(err){
          console.error(err);
        };
      }
      




}
