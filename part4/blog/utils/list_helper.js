const dummy = blogs => 1

const totalLikes = blogs => {
    if (blogs.length === 0) {
        return 0
    }

    let total = 0
    for (let i = 0; i < blogs.length; i++) {
        total += blogs[i].likes
    }
    return total
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return null
    }

    let favBlog = null
    let favBlogLikes = 0
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > favBlogLikes) {
            favBlogLikes = blogs[i].likes
            favBlog = blogs[i]
        }
    }
    return favBlog
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return null
    }
    // dict of (author, blog count) pairs
    let dict = {}
    for (let i = 0; i < blogs.length; i++) {
        let author = blogs[i].author
        author in dict ? dict[author] += 1 : dict[author] = 1
        }

    // author with most blogs as an object
    const mostBlogs = {'author': '', 'blogs': 0}
    for (const [key, value] of Object.entries(dict)) {
        if (value > mostBlogs.blogs) {
            mostBlogs.blogs = value
            mostBlogs.author = key
        }
    }
    return mostBlogs
}

const mostLikes = blogs => {
    if (blogs.length === 0) {
        return null
    }
    // dict of (author, likes count) pairs
    let dict = {}
    for (let i = 0; i < blogs.length; i++) {
        let author = blogs[i].author
        let likes = blogs[i].likes
        author in dict ? dict[author] += likes : dict[author] = likes
    }

    // author with most likes as an object
    const mostLikes = {'author': '', 'likes': 0}
    for (const [key, value] of Object.entries(dict)) {
        if (value > mostLikes.likes) {
            mostLikes.likes = value
            mostLikes.author = key
        }
    }
    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}