import axios from 'axios'
//actions
export default {
    signUp({commit, state}, payload){
        axios.post('http://localhost:3085/user', {
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
      logIn({commit, state}, payload){
        this.$axios.post('http://localhost:3085/user/login',{
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
        this.$axios.post('http://localhost:3085/user/logout',{
          withCredentials: true,
        })
          .then((res)=>{
            commit('setMe', null);
          })
          .catch((e)=>{
            console.error(e);
          });
      },
      async loadUser({state, commit}){
        try{
          const res = await this.$axios.get('/user', {
            withCredentials: true,
          });
          commit('setMe', res.data);
        }catch(err){
          console.error(err);
        }
      },

}
  