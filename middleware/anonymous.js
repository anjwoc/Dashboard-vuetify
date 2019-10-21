import { store } from '../src/store/index'
export default function (){
    if(store.users.state.me){
        this.$router.push('/');
        // redirect('/');
    }
}