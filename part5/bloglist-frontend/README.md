# Testing entire React app

## Add Login in frontend

- Add username, password, and user object state to React. User object contains token, username, and name.

- Token is extracted from the response provided by the calling of login service. Token is then used to set the authorization header for all blog API requests.

- Token and user info is also saved to the browser local storage by calling ```window.localStorage.setItem('key', 'value')```

- Add effect hook for the application to check if user details of logged-in user care already in local storage (this check is done when the page is being refreshed).

Start application:

```shell
npm install
npm start
```

Start the backend server in dev mode (if shortcut command is configured):

```shell
npm run dev
```
Alternatively

```shell
npm run nodemon index.js
```

## A note on using local storage

At the end of the last part we mentioned that the challenge of the token based authentication is how to cope with the situation when the API access of the token holder to the API needs to be revoked.

There are two solutions to the problem. The first one is to limit the validity period of a token. This forces the user to relogin to the app once the token has expired. The other approach is to save the validity information of each token to the backend database. This solution is often called a server side session.

No matter how the validity of tokens is checked and ensured, saving a token in the local storage might contain a security risk if the application has a security vulnerability that allows Cross Site Scripting (XSS) attacks. A XSS attack is possible if the application would allow a user to inject arbitrary JavaScript code (e.g. using a form) that the app would then execute. When using React in a sensible manner it should not be possible since React sanitizes all text that it renders, meaning that it is not executing the rendered content as JavaScript.

If one wants to play safe, the best option is to not store a token to the local storage. This might be an option in situations where leaking a token might have tragic consequences.

It has been suggested that the identity of a signed in user should be saved as httpOnly cookies, so that JavaScript code could not have any access to the token. The drawback of this solution is that it would make implementing SPA-applications a bit more complex. One would need at least to implement a separate page for logging in.

However it is good to notice that even the use of a httpOnly cookies does not guarantee anything. It has even been suggested that httpOnly cookies are not any safer than the use of local storage.

So no matter the used solution the most important thing is to minimize the risk of XSS attacks altogether.

## props.children, references to components with ref, and proptypes

- Create a _Toggleable.js_ component that manages the visibility of the child component defined inside. The component has a fixed structure and thus, can be reusable. Any child component/element we want to use in Toggleable is defined between ```<Toggleable>...</Toggleable>``` and can be added to the component's body through ```props.children```.


- Use ref to reference the child component of a parent component so that a parent component can use defined functions of a child component. _Remember: reverse data flow - from a child to a parent - is discouraged._
  
  We want to 'close' _Create Blog Form_ when clicking _create_ button.

  Possible ways to do this:

  1) add _toggleVisibility_ function to _createBlog_ function in App component;
  
  2) pass _toggleVisibility_ function to _CreateBlogForm_ component and call it there.
  
  No matter what option is chosen, the App needs to access a function of the child component _Toggleable_. _useRef_ hook can enable a parent component to access parameters of its child component.


- _PropTypes_ package enables to make specified props to be required.

  ```shell
  npm install prop-types
  ```

## Testing React Components

Tests are written using _Jest_ and some Jest-related libraries and helper methods:

- [react-testing-library](https://github.com/testing-library/react-testing-library) - a very lightweight solution for testing React components. 
- [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) - a companion library for Testing Library that provides custom DOM element matchers for Jest.

We'll install _React Testing Library_ from ```testing-library``` and ```jest-dom```
```shell
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Create-react-app configures tests to be run in watch mode by default, which means that the npm test command will not exit once the tests have finished, and will instead wait for changes to be made to the code. Once new changes to the code are saved, the tests are executed automatically after which Jest goes back to waiting for new changes to be made.

If you want to run tests "normally", you can do so with the command:

```shell
CI=true npm test
```

Clicking buttons in tests can be simulated by using library [user-event](https://testing-library.com/docs/user-event/intro/):

```shell
npm install --save-dev @testing-library/user-event
```
At the moment of writing (28.1.2022) there is a mismatch between the version of a dependency jest-watch-typeahead that create-react-app and user-event are using. The problem is fixed by installing a specific version:

```shell
npm install -D --exact jest-watch-typeahead@0.6.5
```

Test [coverage reporting](https://github.com/facebook/create-react-app/blob/ed5c48c81b2139b4414810e1efe917e04c96ee8d/packages/react-scripts/template/README.md#coverage-reporting) can be viewed by running the command:

```shell
CI=true npm test -- --coverage
```

## Ent to End (E2E) Testing

Use [Cypress](https://www.cypress.io/) to implement E2E tests.

[Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell)

[Into to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes)

```shell
npm install --save-dev cypress
```
Add to npm-scrip:
```json
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    /// ...
    "cypress:open": "cypress open"
  },
  // ...
}
```

The tests require the tested system to be running. Unlike our backend integration tests, Cypress tests _do not start the system_ when they are run.

Thus, add the npm-script to the _backend_ which starts it in test mode, or so that _NODE_ENV_ is _test_.

```json
{
  // ...
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js",
    //...
    "start:test": "NODE_ENV=test node index.js"
  },
  // ...
}
```

Remember to _run the backend server in test mode_ when starting the Cypress tests (in our case command is previously configured in the package.json file):

```shell
  npm run start:test
```

There is also an ESlint plugin for Cypress that can be used to avoid unnecessary warnings when running ESling.

```shell
npm install eslint-plugin-cypress --save-dev
```

Add configuration for _.eslint.js_:

```json
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [ 
      // ...
    ],
    "parserOptions": {
      // ...
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
      // ...
    }
}
```
