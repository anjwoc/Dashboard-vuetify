/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import Cookies from 'js-cookie'
const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if (isAuthenticated) return next()
  next('/login?returnPath=me')
}

export default [
  
  {
    path: '',
    // Relative to /src/views
    view: 'LoginForm',
    beforeEnter(to, from, next){
      if(Cookies.get('token')){
        console.log("진입")
        if(to.path === '/login'){
          next({ path: '/dashboard'})
        }else{
          next()
        }
      }else{
        if(to.path !== '/login'){
          next({ path:'/login' })
        }else{
          next()
        }
      }
    },
  },
  {
    path: '/login',
    // Relative to /src/views
    view: 'LoginForm'
  },
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    view: 'SignUp'
  }
]
