
// This ensure the sweeper is not bundled with the app on the client
// The script will be loaded only when needed

export default {
  path: 'minesweeper',
  indexRoute: {
    onEnter: function (nextState, replaceState) {
      // Redirect to board
      replaceState(null, '/minesweeper/board');
    }
  },
  getChildRoutes(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require('./routes').default)
      }, 'minesweeper');
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push('minesweeper')
      cb(null, require('./routes').default);
    }
  }
};
