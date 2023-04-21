**Running backend tests:**

*Do NOT have the server running prior to running these tests, only the frontend should be running*

1 - Launch the frontend if you have not done so already ([see instructions here](https://github.ncsu.edu/aeraposo/510_FINAL_PROJECT/blob/main/tests-acceptance/CONFIGURE.md) or simply change directory to gui, then run this if you're on a mac: source ~/.zshrc, then run ng serve --open). Keep the frontend running in a separate terminal while you complete the next steps.

2, a - In a seperate terminal, change the working directory to this folder (server/spec)

2, b - Install npm and if you're on a Mac, run this: source `~/.zshrc`

2, c - Run this: `npm run test`

All unit and integration tests will run without failure.
