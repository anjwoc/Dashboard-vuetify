// https://vuex.vuejs.org/en/actions.html

export default {
  signUp({commit, state}, payload){
    this.$axios.post('/user', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    },{
      withCredentials: true,
    })
      .then((res)=>{
        console.log(res);
        commit('setMe', res.data);
      })
      .catch((err)=>{
        console.error(err);
      });
  },


}
