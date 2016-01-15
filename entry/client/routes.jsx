import MainApp from './MainApp';
import TodoApp from 'TodoApp/client';
import AdminApp from 'AdminApp/client';
import ReduxWrapper from './reduxWrapper.jsx'

const clientOptions = {
  // wrapper: ReduxWrapper,
}

const serverOptions = {
}

ReactRouterSSR.Run({
  component: MainApp,
  childRoutes: [
    TodoApp,
    AdminApp
  ]
}, clientOptions, serverOptions);
