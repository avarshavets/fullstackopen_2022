import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import CreateBlogForm from "../components/CreateBlogForm"

describe('Create Blog Form component', () => {
    test('blog is created successfully', async () => {
        // simulation of createBlog function
        const mockCreateBlog = jest.fn()
        // start a session to interact with a form
        const user = userEvent.setup()

        const { container } = render(<CreateBlogForm createBlog={mockCreateBlog} />)

        const createButton = await screen.findByText('create')

        // select input fields: by placeholder, by id...
        const titleInput = screen.getByPlaceholderText('enter a blog title')
        const authorInput = container.querySelector('#author-input')

        await user.type(titleInput, 'Blog Title')
        await user.type(authorInput, 'Blog Author')

        // Alternatively:
        // get array of all input fields by their role 'textbox'
        const inputs = screen.getAllByRole('textbox')
        await user.type(inputs[2], 'Blog URL')

        await user.click(createButton)

        expect(mockCreateBlog.mock.calls).toHaveLength(1)
        console.log(mockCreateBlog.mock.calls)
        // mockCreateBlog.mock.calls returns a list of calls, where each call is a list of call's data, e.g.:
        // [ [ { title: 'Blog Title', author: 'Blog Author', url: 'Blog URL' } ] ]
        expect(mockCreateBlog.mock.calls[0][0].title).toBe('Blog Title')
        expect(mockCreateBlog.mock.calls[0][0].author).toBe('Blog Author')
        expect(mockCreateBlog.mock.calls[0][0].url).toBe('Blog URL')

    })

})