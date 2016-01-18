import MainApp from './MainApp'
import TodoApp from 'TodoApp/client'
import AdminApp from 'AdminApp/client'
/*
  
  check out the react-router dynamic routing docs for more
  https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md

  or see the example in modules/AdminApp/client/index

 */

 
export default {
    component: MainApp,
    childRoutes: [
      TodoApp,
      AdminApp
    ]
  }

