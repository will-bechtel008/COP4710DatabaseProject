Create main directory cop4710_project
In this directory run
Run: npx create-react-app frontend

*NEW*
Make files added to make building and running dev easier than ever

of course, install make if you do not have it on your system.

# installs build tools, including make
$ sudo apt-get install build-essential

# installs npm dependencies
$ make build-dev

# runs frontend and backend
$ make run-dev

# Normally we would ignore the .env files as they should remain hidden, but as this is a small project for class, it is not a priority.

cop4710_project/backend
Run: npm install express cors mongoose dotenv bcryptjs jsonwebtoken

cop4710_project/frontend
Run: npm install npm install @material-ui/core express react-router-dom axios

check git status
================
$ git status

Pulling from master
===================
$ git pull origin master

pushing your changes to master
==============================
$ git status
### red items need to be added

$ git add .
### red items should now be green

$ git commit
### makes a commit to the github. add a comment, save, and exit.

$ git push origin master
### pushes your commit to github. You should see the commit in github.
