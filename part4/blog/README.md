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

To run only specific test, run command:
```shell
npm test -- -t 'name of the test'
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
