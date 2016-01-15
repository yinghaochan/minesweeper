import MainApp from './MainApp';
import TodoApp from 'TodoApp/client';
import AdminApp from 'AdminApp/client';
import ReduxWrapper from './reduxWrapper.jsx'
import { history } from '_redux/store'

const clientOptions = {
  wrapper: ReduxWrapper,
  history: history,
}

const serverOptions = {
  wrapper: ReduxWrapper,
}

ReactRouterSSR.Run({
  component: MainApp,
  childRoutes: [
    TodoApp,
    AdminApp
  ]
}, clientOptions, serverOptions);
