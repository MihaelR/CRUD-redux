This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
Server side JSON-server.

Use case implemented:

1. Crud
2. Web3 - Connect with metamask
3. Search
4. Sort
5. Notifications - toastify
6. Dark theme
7. Translation
8. Routes

Run the code:

1. select folder and open first terminal
2. npm install
3. npm start (http://localhost:3000 )
4. in same folder open second terminal
5. npm run server (opens Json-server at http://localhost:5000)

Architecture

1. public - locales - for translation
2. src- \_tests- - for testing
3. src- models - for interface
4. src- pages - crud
5. src- services - redux
6. src- theme - dark mode
7. src- web3 - connect with metamask
8. db.json - json server

Things still needs to be done:

1. push app to github
2. responsive design
3. rewrite app from css to scss
4. better design (maybe to use MUI)
5. dropdown for picking language
6. more tags pro contact
7. fix issue with functionality
8. more tests
9. more notifications
10. better logo
11. translate whole app
12. optimize images
13. back button on edit contact etc...

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
