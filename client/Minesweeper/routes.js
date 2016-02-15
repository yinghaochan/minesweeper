import Root from './root';
import Board from './board';

export default {
  component: Root,
  childRoutes: [
    { path: 'board', component: Board }
  ]
};
