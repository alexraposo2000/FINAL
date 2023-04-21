*Please make sure you have Google Chrome installed and updated to version 110*

1 - Launch the frontend/gui

2 - Launch the server in a *new terminal*
- Change the directory to server
- Run this if you’re on a Mac: `source ~/.zshrc`
- Run this: `npm i`
- Run this: `npm start`


3 - Set up Selenium Webdriver in a *new terminal*
- Change directory to test-acceptance
- Run this if you’re on a Mac: source `~/.zshrc`
- Run this: `npm i`
- Run this: `npm run webdrive-update`
    - **If you get an install error, run this before running the above line again:** npm install -g webdriver-manager --save-dev
- Run this: `npm run webdriver-start`


4 - In a new terminal
- Change directory to test-acceptance
- Run this if you’re on a Mac: `source ~/.zshrc`
- Run this: `npm test`

You should see something like:
...
16:42:54.030 INFO [SeleniumServer.boot] - Selenium Server is up and running on port 4444

Tests will now begin running in Google Chrome, confirmation of passed tests will appear in the terminal
