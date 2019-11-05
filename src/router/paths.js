/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import Cookies from 'js-cookie'

export default [
  
  {
    path: '',
    // Relative to /src/views
    view: 'Node-1',
    // beforeEnter(to, from, next){
    //   if(Cookies.get('token')){
    //     console.log("진입")
    //     if(to.path === '/login'){
    //       next({ path: '/dashboard'})
    //     }else{
    //       next()
    //     }
    //   }else{
    //     if(to.path !== '/login'){
    //       next({ path:'/login' })
    //     }else{
    //       next()
    //     }
    //   }
    // },
  },
  {
    path: '/login',
    // Relative to /src/views
    view: 'LoginForm'
  },
  {
    path: '/node-1',
    // Relative to /src/views
    view: 'Node-1'
  },
  {
    path: '/node-2',
    // Relative to /src/views
    view: 'Node-2'
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    view: 'SignUp'
  },
  
]
