//mutations
export default {
    setMe(state, payload){
        console.log('me');
        state.me = payload;
        console.log(state.me);
    },

}
