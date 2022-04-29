import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"

describe('Blog component', () => {
    // container (DOM node) of rendered Blog component which will be appended to document.body
    // (container is a div by default unless defined otherwise)
    let container

    const blog = {
        title: 'Blog title',
        author: 'Author',
        url: 'some_url',
        likes: 10
    }

    // jest.fn() is a mock function to simulate an event handler in Blog component
    // in this case this will be th updateBlog function call in handleLikeClick event handler
    const updateBlog = jest.fn()

    beforeEach(() => {
        const user = { username: 'test_user' }

        container = render(< Blog
            blog={blog}
            user={user}
            updateBlog={updateBlog} />).container

    })

    test('only title and author of a blog are rendered initially', async () => {
        // const blog = {
        //     title: 'Blog title',
        //     author: 'Author',
        //     url: 'some_url',
        //     likes: 0
        // }
        //
        // const user = {
        //     username: 'test_user'
        // }
        //
        // const { container } = render(< Blog blog={blog} user={user}/>)

        // print the HTML of a component/specified element to a terminal.
        // screen.debug()

        // findBy queries return a resolved / rejected PROMISE
        await screen.findByText(`${blog.title} by ${blog.author}`)  // exact match

        const toggleableContent = container.querySelector('.toggleableContent')
        expect(toggleableContent).toHaveStyle('display: none;')

        // alternatives for searching for content
        // .getByText('string', {exact: false) matches the substring
        const element = screen.getByText(blog.title, { exact: false })
        // if getByText does not find the element --> test fails before expect() --> expect is not needed
        expect(element).toBeDefined()

    })

    test('blog details are shown with view button click', async () => {
        const toggleableContent = container.querySelector('.toggleableContent')
        expect(toggleableContent).toHaveStyle('display: none;')

        // userEvent.setup() starts a session to interact with the rendered component
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        expect(toggleableContent).not.toHaveStyle('display: none;')
    })

    test('clicked like button twice', async () => {
        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(updateBlog.mock.calls).toHaveLength(2)
    })

})
