# Build an isomorphic React/Redux app with Meteor
<sup>based off thereactivestack's wonderful projects</sup>

What you get:
- Much faster dev reloads with webpack HMR. Also, state is preserved through code changes.
- Redux built in. Optionally removable if you don't need it.
- Time travelling debugger and client-side Mongo viewer

### Get started
1. Update / Install Meteor
  - `$ curl https://install.meteor.com/ | sh`
  - Meteor update

1. OPTIONAL: install eslint
1. fork / clone this repo 
1. run `meteor` in project root

# Redux Data flow
Do the time travel thing!
![](http://i.imgur.com/J4GeW0M.gif)
### local-only
Use the standard redux data flow
1. Write your actions and reducers in a new `client/_redux` folder
  - Don't forget to add it to the combined reducer in `modules/_redux/reducers.jsx`
  - You might want to write everything in a `client` folder (see faq)
1. Use the `connect` wrapper to inject the dispatch function and call the action
  - See [the redux docs](http://rackt.org/redux/docs/basics/UsageWithReact.html)
  - Check out `client/TodoApp/MainAppp`
1. Use connect's `mapStateToProps` function to get the data in JSX 
  
### interacting with the server
1. Write a Meteor Method in `methods` 
  - add it to the `methods/server.js` file
  - add it to the `methods/both.js` file for optimistic methods
1. Publish the relevant data in the `db/publications` file
1. Write a [Tracker.autorun()](https://github.com/meteor/meteor/wiki/Tracker-Manual) function
  - it shoud contain the subscribe call in it for the relevant data
  - it should dispatch an action that updates the store
  - Use thunk to call dispatch
1. Use connect's `mapStateToProps` function to get the data in JSX 

# Develop
- `CTRL + H` for redux devtools
- `CTRL + M` to view minimongo
- OPTIONAL: `meteor add autopublish` get the entire db on client

### Create a new route
1. check out `client/AdminApp` for an example
1. Add a main route to `Root/routes` 

### Add a client-side NPM module
1. find the module name and version on npm
1. add it to `webpack.packages.json`

### Add a server-side NPM module
1. find the module name and version on npm
1. add the npm module: https://atmospherejs.com/meteorhacks/npm
1. follow those instructions!

### Create a redux thingy
1. See `client/_redux`

### Publish / subscribe data
1. See `db/publications`

### Use Meteor methods
1. See `methods/`
2. write them as functions!


### Code splitting
When developing a huge application, you don't want to serve the entire JavaScript to the client. You might want to wait before he actually need it. This is the problem code splitting is fixing.

Let's say you have a todo application and an admin panel. Do you really want to serve the admin panel to your regular users? With code splitting, you don't need to. Look at [`modules/AdminApp/client/index.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/modules/AdminApp/client/index.js) code to see how it is working. You can copy / paste the same code to create new sections or sub-sections.

The code that is common to multiple sections will be bundled into `common.web.js` and automatically loaded by react-router-ssr.

## The stack & features 
<sup> from thereactivestack </sup>
- Code splitting between parts of your application (dynamiclly loaded only once needed)
- Include the simple todo app example
- ES6 modules
- Meteor
- React.js
- react-router with server-rendering (you can disable it by editing `server/entry.js`)
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode
- Give access to NPM by using packages.json

# Production
You can use meteor run, meteor build, mup or anything working with Meteor.

### Run in production mode
enables SSR, no hot reload
`meteor run --production`

### Build for production
`meteor build .`

### Deploy with Meteor-up
`mup deploy`

# FAQ
### Why are there so many `/client` folders?
client folders get hot-reloaded by webpack, without the need for restarting meteor. It's just much faster for development. 

### Access the store from contexts
 ```js
React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  }
})

// now access using this.context.store

// or use (props, {store}) => {} + declare contextTypes!
```
### Access store from console
`Meteor.store`
