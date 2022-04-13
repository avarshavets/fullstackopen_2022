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