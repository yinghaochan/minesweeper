import MainApp from './MainApp'
import TodoApp from 'client/TodoApp'
import AdminApp from 'client/AdminApp'
import Minesweeper from 'client/Minesweeper'
/*
  
  check out the react-router dynamic routing docs for more
  https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md

  or see the example in modules/AdminApp/client/index

 */

 
export default {
    component: MainApp,
    childRoutes: [
      TodoApp,
      AdminApp,
      Minesweeper,
    ]
  }

