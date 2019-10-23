//mutations
export default {
    setMe(state, payload){
        console.log('me');
        state.me = payload;
        console.log(state.me);
    },
    setTwentyFour(state, payload){
        console.log('setTF');
        state.twentyFour = payload;
        console.log(state.twentyFour);
    },
    setTableItem(state, payload){
        console.log(payload);
        state.tableItem = payload;
    }
}
