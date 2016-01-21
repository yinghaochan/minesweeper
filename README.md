# Re: scaffold
A React scaffold for meteor with:
- Redux: Flux-like data flow, with thunk 
- Devtools: time travel for redux, Mongol for viewing client DB 
- Webpack: Hot module reload / code splitting

based off thereactivestack's wonderful projects

## Get started
1. Update / Install Meteor
  1. `$ curl https://install.meteor.com/ | sh`
  1. Meteor update

1. OPTIONAL: install eslint
1. clone this repo 
1. run `meteor` in root

# Redux Data flow
## local-only
Use the standard redux data flow
1. Write your actions and reducers in a new `modules/_redux` folder
  1. Don't forget to add it to the combined reducer in `modules/_redux/reducers.jsx`
  1. You might want to write everything in a `client` folder (see faq)
1. Use the `connect` wrapper to inject the dispatch function and call the action
  1. See [the redux docs](http://rackt.org/redux/docs/basics/UsageWithReact.html)
  
## interacting with the server
1. Write a Meteor Method in `methods` 
  1. add it to the `methods/server.js` file
  1. add it to the `methods/both.js` file for optimistic methods
1. Publish the relevant data in the `modules/db/publications` file
1. Write a [Tracker.autorun()](https://github.com/meteor/meteor/wiki/Tracker-Manual) function
  1. it shoud contain the subscribe call in it for the relevant data
  1. it should dispatch an action with a payload of the updated data (using Meteor.store.dispatch gets the dispatch function)
1. use that action to update the store 

# Develop
- `CTRL + H` for redux devtools
- `CTRL + M` to view minimongo
- OPTIONAL: `meteor add autopublish` get the entire db on client

## Create a new route
1. check out `modules/AdminApp` for an example
1. Add a main route to `Root/client/routes` 

## Add a client-side NPM module
1. find the module name and version on npm
1. add it to `webpack.packages.json`

## Add a server-side NPM module
1. find the module name and version on npm
1. add the npm module: https://atmospherejs.com/meteorhacks/npm
1. follow those instructions!


## Create a redux action
1. etc

## Publish / subscribe data
1. etc.

## Use Meteor methods

# FAQ
## Why are there so many `/client` folders?
client folders get hot-reloaded by webpack, without the need for restarting meteor. It's just much faster for development. 

## Access the store from contexts
 ```js
React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  }
})

// now access using this.context.store
// or using (props, context) => {} + declare contextTypes!
// or using (props, {store}) => {} + declare contextTypes!
```

# Code splitting
When developing a huge application, you don't want to serve the entire JavaScript to the client. You might want to wait before he actually need it. This is the problem code splitting is fixing.

Let's say you have a todo application and an admin panel. Do you really want to serve the admin panel to your regular users? With code splitting, you don't need to. Look at [`modules/AdminApp/client/index.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/modules/AdminApp/client/index.js) code to see how it is working. You can copy / paste the same code to create new sections or sub-sections.

The code that is common to multiple sections will be bundled into `common.web.js` and automatically loaded by react-router-ssr.

# The stack & features
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

# How does it work?
Webpack needs one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/client/webpack.conf.js) file for the client and one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/webpack.conf.js) for the server. It allows you to have a better control over the build process. Every other files are not automatically included by Meteor. Everything is starting from your entry point. You can also have a [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/webpack.conf.js) that is shared between client and server for common settings.

The server entry point in the project is at [`entry/server/entry.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/entry.js). Everything that you want to load on your Meteor server, they have to be imported or required in some way.

The client entry point in the project is at [`entry/client/entry.js`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/entry.js) and work the same way as on the server, except it is run on the browser or Cordova.

You can use any package coming from NPM by adding it to [`packages.json`](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/packages.json).

Go look at them, they are simple!

# Testing
If you would like to activate unit and integration tests, you can add the following packages:		

```sh		
meteor add sanjo:jasmine		
meteor add velocity:html-reporter		
```		

And uncomment the code in [entry/client/entry.js](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/client/entry.js#L15-L25) and [entry/server/entry.js](https://github.com/thereactivestack/kickstart-hugeapp/blob/master/entry/server/entry.js#L17-L24)

# Production
You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`meteor run --production`

## Build for production
`meteor build .`

## Deploy with Meteor-up
`mup deploy`

# Cordova
You need to do those 3 steps to make it works with iOS or Android:

1. Add the platform to your Meteor project

    ```javascript
    meteor add-platform ios
    meteor add-platform android
    ```
1. Allow access to your dev server in your `/mobile-config.js` file:

    ```javascript
    App.accessRule('http://192.168.1.100:3500/*');
    ```

1. Replace localhost by your local ip address in `/entry/webpack.conf.js`.
