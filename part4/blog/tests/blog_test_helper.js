// Mongoose blog Schema
const Blog = require('../models/blog')

//  Data set for testing
const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    // convert mongoDB document to json
    return blogs.map(blog => blog.toJSON())
}

// return id of mongoDB document that does not exist any more
const nonExistingId = async () => {
    const blog = new Blog({
        'title': 'test',
        'author': 'test',
        'url': 'test',
        'likes': 0
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

module.exports = {
    initialBlogs,
    blogsInDB,
    nonExistingId
}