### Minesweeper demo
####Folders used:
- `client/Minesweeper/board`
- `client/_redux/Minesweeper`

#### Notes
- Adjust the board size and mine probability
- Built on my rather large scaffold, please ignore the rest. 
  - React and redux only here.
- Winning condtitions by tracking each correct action
- all changes stored in redux / easily check state
- recursively reveal tiles that have 0 nearby mines
- NO STYLING (as requested)
- Immutable JS hacked to use matrices
- Immutable JS also breaks server store hydration
  - See [link](http://stackoverflow.com/questions/34935786/server-side-rendering-with-redux-and-immutable-js-errors-on-mapstatetoprop-conte)
- click once to flag a bomb, twice to reveal

#### TO-DO
- Build more efficient 8-way fill algorithm
- (maybe) make it impossible for a bomb to be on the frist revealed tile


### Get started
1. Update / Install Meteor
  - `$ curl https://install.meteor.com/ | sh`
  - Meteor update if already installed

1. OPTIONAL: install eslint
1. fork / clone this repo 
1. run `meteor` in project root for dev mode
2. run `meteor run --production` for fast mode

# Redux Data flow
Do the time travel thing!
You can use this to undo / cheat
![](http://i.imgur.com/J4GeW0M.gif)

# Develop
- `CTRL + H` for redux devtools

