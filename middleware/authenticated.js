export default function ({store, redirect}){
    if(!store,state.me){
        redirect('/login');
    }
}