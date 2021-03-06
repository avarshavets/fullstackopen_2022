# Project: Phonebook Backend

## 2.6: The Phonebook Backend Step 0 - Installations

- Create a new template for our application with the ```npm init``` command.
- Add to 'scrips' in package.json to start the app with a short ```npm start``` command instead of ```start node index.js```.
- Install express library with ```npm install express ``` command.

All commands are executed in the root directory of the project.

Note: 

If we make changes to the application's code we have to restart the application in order to see the changes. We restart the application by first shutting it down by typing **Ctrl+C** and then restarting the application.

Installing ```nodemon``` and defining it as a development dependency will enable automatic update.

```shell
npm install --save-dev nodemon
```

To run the command  quickly, add to the scrips in package.json:
```json
{
    "dev": "nodemon index.js"
}
```
## 3.1: Phonebook backend step1

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

Data:
```js
[
{
"id": 1,
"name": "Arto Hellas",
"number": "040-123456"
},
{
"id": 2,
"name": "Ada Lovelace",
"number": "39-44-5323523"
},
{
"id": 3,
"name": "Dan Abramov",
"number": "12-43-234345"
},
{
"id": 4,
"name": "Mary Poppendieck",
"number": "39-23-6423122"
}
]
```
Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

The application must be started with the command ```npm start```.

The application must also offer an ```npm run dev``` command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

## 3.2: Phonebook backend step2

Implement a page at the address http://localhost:3001/info that looks roughly like this:
![img.png](img/img.png)

## 3.3: Phonebook backend step3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## 3.4: Phonebook backend step4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.

## 3.5: Phonebook backend step5

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

## 3.6: Phonebook backend step6

Implement error handling for creating new entries. The request is not allowed to succeed, if:

- The name or number is missing
- The name already exists in the phonebook

Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.: { error: 'name must be unique' }

## 3.7: Phonebook backend step7
Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

Morgan is installed just like all other libraries with the ```npm install morgan``` command. Taking morgan into use happens the same way as configuring any other middleware by using the ```app.use``` command.

## 3.8*: Phonebook backend step8

Configure morgan so that it also shows the data sent in HTTP POST requests:
![img_1.png](img/img_1.png)

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

- creating new tokens
- JSON.stringify

# Deploying App to the Internet 

Until now:

- we run a ```react-stcript``` to run one server for the frontend side;
- we run second 'fake' json-server or created web server for the backend side.

Now we deploy the backend and frontend from one server on cloud platform:

- we run the backend server;
- the backend looks for the frontend static page with JS, and loads it; 
- frontend react scripts run and start interact with the backend data;
- data being rendered to the page. 

## 1. Deploying Backend to the Internet (Heroku cloud platform)

- Add a file called Procfile (without extension!) to the backend project's root to tell Heroku how to start the application.
```shell
web: npm start
```
- Change the definition of the port our application uses at the bottom of the index.js file like so:
```js
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
- Create Heroku account and install Heroku package using command ```npm install -g heroku``` Alternatively, in case the previous command does not work, use the command ```npx heroku```

- Create a Heroku application with the command ```heroku create```

- Create a Git repository in the project directory with ```git init```, and add node_module to .gitignore. Commit your code to git and move it to Heroku with command ```git push heroku master```

If everything went well, the application works, and the data are displayed at *https://secure-chamber-60641.herokuapp.com/api/persons*. If not, check heroku logs. The best way to read heroku logs is with command ```heroku logs -t``` which prints the logs to console whenever something happens on the server.

## 2. Deploying Frontend Production Build to the Internet

**1. Create frontend production build**

A production build of applications created with create-react-app can be created with command ```npm run build``` run from the *root of the frontend project*.

**2. Serve static frontend files from the backend**

- Copy the production build (the *build* directory) to the root of the backend repository

- Add *static* middleware to the backend to show the *static* content (index.html and JavaScrip, etc.).
```js
app.use(express.static('build'))
```
- Modify base url as relative in the frontend

- To reflect new changes, create a new production build ```npm run build``` and copy it to the root of the backend repository.

**Short commands for the deployment of frontend to the cloud**
```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../../part2/phonebook/ && npm run build && cp -r build ../../part3/phonebook_backend",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```

# Saving Data To MongoDB

1. Create MongoDB account and install mongoose library to use with MongoDB. Add mongoDB url with embedded password to .env variable (_.env is not pushed to heroku, since it is in .gitignore_) to use in dev mode. Additionally, add mongoDB url with embedded password to Heroku Config Vars in Settings.


2. Create separate person.js file, which does the following:


   - establishes connection to mongoDB; 
   - defines _schema_ of a person (tells mongoose how the person objects are to be stored in the db)
   - defines mongoose _document model_ for person (constructor function that creates new JS object).


3. Import the mongoose person.js module to the index.js file. Modify APIs (specifically handlers of the APIs) to enable the interaction with the database.


4. Add error handling as a separate express middleware. Remember the importance of positioning the middleware in the code. _The execution order of middleware is the same as the order of their loading!_


5. Update the production build and deploy.

# Validation

Expand the validation so that the name stored in the database has to be at least three characters long.

Expand the frontend so that it displays some form of error message when a validation error occurs. Error handling can be implemented by adding a catch block with logging error as as ```error.response.data```

Note: On update operations, mongoose validators are off by default. Read the documentation to determine how to enable them.

Add validation to your phonebook application, that will make sure that phone numbers are of the correct form. A phone number must

- has length of 8 or more
- if formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers

   - eg. 09-1234556 and 040-22334455 are valid phone numbers 
   - eg. 1234556, 1-22334455 and 10-22-334455 are invalid

Use a Custom validator to implement the second part of the validation.

If an HTTP POST request tries to add a name that is already in the phonebook, the server must respond with an appropriate status code and error message.

## Add ESLint to the application to detect and fix all warnings

Install ESling as a development dependency to the backend project:

```shell
npm install eslint --save-dev
npx eslint --init
```

Running the inspection for index.js

```shell
npx eslint index.js
```

Note: build folder should be added to .eslintignore (additionally created).

Possible configuration for inspection rules in ESling:

```json
    "rules": {
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    }
```