### Minesweeper demo
####Folders used:
- `client/Minesweeper/board`
- `client/_redux/Minesweeper`

#### Features
- Adjust the board size and mine probability
- Winning condtitions by tracking each correct action
- all changes stored in redux / easily check state
- recursively reveal tiles that have 0 nearby mines
- NO STYLING (as requested)
- Immutable JS hacked to use matrices


### Get started
1. Update / Install Meteor
  - `$ curl https://install.meteor.com/ | sh`
  - Meteor update if already installed

1. OPTIONAL: install eslint
1. fork / clone this repo 
1. run `meteor` in project root for dev mode
1. run `meteor run --production` for fast mode
# Redux Data flow
Do the time travel thing!
You can use this to undo / cheat
![](http://i.imgur.com/J4GeW0M.gif)

# Develop
- `CTRL + H` for redux devtools
- `CTRL + M` to view minimongo
- OPTIONAL: `meteor add autopublish` get the entire db on client
