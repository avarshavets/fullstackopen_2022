# Project: Phonebook Backend Testing and User Administration

## Project structure 

├─ index.js

├─ app.js

├─ build

│   └── ...

├─ controllers

│   └── blogs.js

├─ models

│   └── blog.js

├─ package-lock.json

├─ package.json

├─ utils

│   ├── config.js

│   ├── logger.js

│   └── middleware.js 


#### index.js

_index.js_ starts the backend by importing the actual backend application from the _app.js_ file (written with Express Node.js) and then starting it.

#### app.js

_app.js_ creates the actual backend application. It establishes connection to the database and imports the API routes.

All API routes are now defined for the router object ```blogRouter```. The router is in fact a _middleware_, that is used for defining 'related routes' (in our case related to blogs) in a single module.
The router is in fact a middleware, that can be used for defining "related routes" in a single placeThe router is in fact a middleware, that can be used for defining "related routes" in a single place

#### controllers/blogs.js

The event handlers of API routes are commonly referred to as controllers. For this reason we have created a new 'controllers' directory. All routes related to 'blogs' are now in the 'blogs.js' module under the 'controllers' directory. The 'blogs.js' module also exports all routes related to blogs as a single _router object_.

#### models/blog.js

_blog.js_ file only defines the Mongoose schema for the blogs database entries (documents). 

#### utils

_utils_ directory contains separate files for the logging module (console.log(...)), the module that configures environment variables, and the module with different middleware, e.g.: error handling middleware, special logging of server requests, etc.

### Exercises 4.1.-4.2.

In the exercises for this part we will be building a blog list application, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvotes from users of the application.

#### 4.1 Blog list, step1

Let's imagine a situation, where you receive an email that contains the following application body:

```js
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

Turn the application into a functioning npm project. In order to keep your development productive, configure the application to be executed with nodemon. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

Verify that it is possible to add blogs to list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

## Testing node applications

_Jest_ is the testing library used in this project.

Installation for dev mode:

```shell
npm install --save-dev jest
```

Add shortcut in _package.json_ to run jest tests:

```json
{
  //...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    
    "lint": "eslint .",
    "test": "jest --verbose"
  },
  //...
}
```
You can also add _runInBand_ option to the test as:
```json
  "test": "jest --verbose --runInBand"
```
_runInBand_ option will prevent Jest from running rests in parallel.

Finally, specify the execution environment for Jest in _package.json_:

```json
{
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```

_until/list_helper.js_ contains functions for testing the blog list.

All Jest tests are saved with _.test.js_ extension and located in _test/_ directory, e.g.: _test/list_helper.test.js_

To run the all test, run command:
```shell
npm run test
```

To run only specific test in the file, run command:
```shell
npm test -- -t 'name of the test'
```

To run only specific file with tests, run command:
```shell
npm test -- tests_folder/file_name.test.js
```

To run all test that contain a specific word in their names, run command:
```shell
npm test -- -t 'word'
```

### Exercises

Let's create a collection of helper functions that are meant to assist dealing with the blog list. Create the functions into a file called utils/list_helper.js. Write your tests into an appropriately named test file under the tests directory.

#### 4.3: helper functions and unit tests, step1

First define a dummy function that receives an array of blog posts as a parameter and always returns the value 1. The contents of the list_helper.js file at this point should be the following:

```js 
const dummy = (blogs) => {
// ...
}

module.exports = {
dummy
}
```

Verify that your test configuration works with the following test:

```js
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
const blogs = []

const result = listHelper.dummy(blogs)
expect(result).toBe(1)
})
```

#### 4.4: helper functions and unit tests, step2

Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a describe block, so that the test report output gets grouped nicely:

Defining test inputs for the function can be done like this:

```js
describe('total likes', () => {
const listWithOneBlog = [
{
_id: '5a422aa71b54a676234d17f8',
title: 'Go To Statement Considered Harmful',
author: 'Edsger W. Dijkstra',
url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
likes: 5,
__v: 0
}
]

test('when list has only one blog, equals the likes of that', () => {
const result = listHelper.totalLikes(listWithOneBlog)
expect(result).toBe(5)
})
})
```

Note: if some test is failing, then it is recommended to only run that test while you are fixing the issue. You can run a single test with the only method.

Another way of running a single test (or describe block) is to specify the name of the test to be run with the -t flag:

``` shell
npm test -- -t 'when list has only one blog, equals the likes of that'
```

#### 4.5*: helper functions and unit tests, step3

Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

The value returned by the function could be in the following format:

```js
{
title: "Canonical string reduction",
author: "Edsger W. Dijkstra",
likes: 12
}
```

Note: when you are comparing objects, the _toEqual_ method is probably what you want to use, since the _toBe_ tries to verify that the two values are the same value, and not just that they contain the same properties.

Write the tests for this exercise inside of a new _describe block_. Do the same for the remaining exercises as well.

#### 4.6*: helper functions and unit tests, step4

Finishing this exercise can be done without the use of additional libraries. However, this exercise is a great opportunity to learn how to use the _Lodash_ library.

Define a function called _mostBlogs_ that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has:

```js
{
author: "Robert C. Martin",
blogs: 3
}
```

If there are many top bloggers, then it is enough to return any one of them.

#### 4.7*: helper functions and unit tests, step5

Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received:

```js
{
author: "Edsger W. Dijkstra",
likes: 17
}
```

If there are many top bloggers, then it is enough to show any one of them.

## API-level integration tests for server application

### Specifying production and development mode

The Node convention is to separate between production and development mode when running Node.js server. For this purpose, we add the following modification to _package.json_:
```json
{
  // ...
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js",
    // ...
    "test": "NODE_ENV=test jest --verbose --runInBand"
  }
}
```

We also added the _runInBand_ option to the npm script for test. It will prevent Jest from running tests in parallel.

If there are different DB for testing, the change of MongoDB URIs needs to be reflected in corresponding variables in _.env_ file as well as in application's configuration, e.g:

```javascript
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
```

### supertest

[_Supertest_](https://github.com/visionmedia/supertest) package helps write our tests for testing the API in development mode.

```shell
npm install --save-dev supertest
```

The test imports the Express application from the _app.js_ module and wraps it with the _supertest_ function into a so-called _superagent_ object. This object is assigned to the _api_ variable and tests can use it for making HTTP requests to the backend.

When test use _api_ superagent, supertest starts the server application _app.js_. If the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.

### Exercises

Write tests to test all HTTP requests.

Once the test is finished, refactor the API code to use async/await instead of promises.

NOTE:

Installing [_express-async-errors_](https://github.com/davidbanham/express-async-errors) library, will enable to eliminate the _try-catch_ structure

## User Administration and Token Authentication

### User Administration

- Create Mongoose schema for users.
- Add to the user schema a blog list - a list of blogs created by each user.
- Modify blog schema to add a field with user id - a user that created this blog.
- User [_bcrypt_](https://github.com/kelektiv/node.bcrypt.js) package to generate the password hash for users
  ```shell
  npm install bcrypt
  ```
- Use _populate_ method in Mongoose to replace blog / user ids with specified data from blog / user

### User Authentication

- Add login API that will generate a token for logged-in user. Install [_jsonwebtoken_](https://github.com/auth0/node-jsonwebtoken) to generate json web token:
  ```shell
  npm install jsonwebtoken
  ```
- Modify API to limit operation with blogs only to logged in users - users with a valid token attached to each request.
  
  - We will use the _Authorization header_ with a _Bearer_ as authentication scheme to send a token from the browser (react app) to the backend server.
  - We will also create additional middleware to: (1) extract a token from the authorization header of the request (tokenExtraction middleware); and (2) find a user object in DB that is associated with the token, and attach it to the request in request.user (userExtraction middleware).

- Modify errorHandling middleware to account for JsonWebTokenError.

- Correct the API tests to account for the modifications in API.

### Exercises

#### 4.15: bloglist expansion, step3

Implement a way to create new users by doing a HTTP POST-request to address api/users. Users have _username_, _password_ and _name_.

Do not save passwords to the database as clear text, but use the _bcrypt_ library.

#### 4.16*: bloglist expansion, step4

Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.

The operation must respond with a suitable status code and some kind of an error message if invalid user is created.

NB Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing. The password length should be validated in the controller.

Also, implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.

#### 4.17: bloglist expansion, step5

Expand blogs so that each blog contains information on the creator of the blog.

Modify adding new blogs so that when a new blog is created, any user from the database is designated as its creator (for example the one found first). Which user is designated as the creator does not matter just yet.

#### 4.18: bloglist expansion, step6

Implement token-based authentication.

#### 4.19: bloglist expansion, step7

Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.

#### 4.20*: bloglist expansion, step8

Extract the token from the header with the _getTokenFrom_ helper function.

If you used the same solution, refactor taking the token to a _middleware_. The middleware should take the token from the _Authorization header_ and place it to the _token_ field of the _request_ object.

In other words, if you register this middleware in the _app.js_ file before all routes

```javascript
app.use(middleware.tokenExtractor)
```

routes can access the token with ```request.token```:

```js
blogsRouter.post('/', async (request, response) => {
// ..
const decodedToken = jwt.verify(request.token, process.env.SECRET)
// ..
})
```

Remember that a normal middleware is a function with three parameters, that at the end calls the last parameter _next_ in order to move the control to next middleware:

```js
const tokenExtractor = (request, response, next) => {
// code that extracts the token

next()
}
```

#### 4.21*: bloglist expansion, step9

Change the delete blog operation so that a blog can be deleted only by the user who added the blog. Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator.

If deleting a blog is attempted without a token or by a wrong user, the operation should return a suitable status code.

Note that if you fetch a blog from the database,

```js 
const blog = await Blog.findById(...)
```

the field ```blog.user``` does not contain a string, but an Object. So if you want to compare the id of the object fetched from the database and a string id, normal comparison operation does not work. The id fetched from the database must be parsed into a string first.

```js
if ( blog.user.toString() === userid.toString() ) ...
```

#### 4.22*: bloglist expansion, step10

Both the new blog creation and blog deletion need to find out the identity of the user who is doing the operation. The middleware ```tokenExtractor``` that we did in exercise 4.20 helps but still both the handlers of post and delete operations need to find out who is the user holding a specific token.

Now create a new middleware ```userExtractor```, that finds out the user and sets it to the request object. When you register the middleware in _app.js_

```js 
app.use(middleware.userExtractor)
```

the user will be set in the field ```request.user```:

```js
blogsRouter.post('/', async (request, response) => {
  // get user from request object
  const user = request.user
  // ..
})

blogsRouter.delete('/:id', async (request, response) => {
  // get user from request object
  const user = request.user
  // ..
})
```

Register ```userExtractor``` middleware to only blog routes.

```js
// use the middleware only in /api/blogs routes
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
```

As can be seen, this happens by chaining multiple middlewares as the parameter of function use. It would also be possible to register a middleware only for a specific operation:

```js
router.post('/', userExtractor, async (request, response) => {
// ...
}
```

#### 4.23*: bloglist expansion, step11

After adding token based authentication the tests for adding a new blog broke down. Fix the tests. Also write a new test to ensure adding a blog fails with the proper status code _401 Unauthorized_ if a token is not provided.

[This](https://github.com/visionmedia/supertest/issues/398) is most likely useful when doing the fix.









