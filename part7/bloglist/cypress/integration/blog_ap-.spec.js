require('../support/commands')

describe('Blog app', () => {
  // create user for the interaction with the blog app
  const user = {
    name: 'Michael Smith',
    username: 'msmith',
    password: 'msmith'
  }

  beforeEach('reset DB', () => {
    // cy.request('POST', `http://localhost:${process.env.PORT}/api/testing/reset`)
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // add user to the DB
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is open', () => {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', () => {
    it('user login fails with wrong credentials', () => {
      // get element by CSS id.
      // Alternatively:  get('input:first') for username input and get('input:last') for password input.
      // However, get by id is always better to avoid future errors
      cy.get('#username').type(user.username)
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.notification-message').should('contain', 'wrong username or password')
      // check if notification message has red color --> rgb(255, 0, 0)
      cy.get('.notification-message').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#username')
      cy.get('#password')
    })

    it('user login succeeds with correct credentials', () => {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('blogs')
      // we can reduce the search area by 'getting' a target div and searching inside of it with contain()
      cy.get('#logged-in-user').contains(user.username)
      // alternatively
      // cy.get('#logged-in-user').should('contains', user.username)
    })
  })

  describe('Add a blog', () => {
    const blog = {
      title: 'My first blog title',
      author: 'Unknown author',
      url: 'URL'
    }

    // Each test will start from first page (login)
    // Add login before every test of the blog functionalities
    //
    // beforeEach('user login',() => {
    //     cy.get('#username').type(user.username)
    //     cy.get('#password').type(user.password)
    //     cy.get('#login-button').click()
    // })
    //
    // NOTE:
    // instead of logging in a user using the form in the beforeEach block,
    // Cypress recommends that we bypass the UI and do an HTTP request to the backend to login,
    // which is much faster than using a form.
    // We used created custom Cypress login command (declared in cypress/support/commands.js)
    // to do an HTTP request for login.
    beforeEach('user login', () => {
      cy.login({ username: user.username, password: user.password })
    })

    it('a new blog is created', () => {
      // remember: the form element is in the app's DOM even if it is not visible through {display: none}
      // we can use get() to get an invisible element, BUT typing is not possible
      cy.get('#show-toggleable-button').click()

      cy.get('#title-input').type(blog.title)
      cy.get('#author-input').type(blog.author)
      cy.get('#url-input').type(blog.url)
      cy.get('#create-blog-form').contains('create').click()
      cy.get('#blog-list').contains(blog.title)
    })

    describe('When blog list exits', () => {
      // add a blog
      beforeEach('add more blogs', () => {
        cy.createBlog({
          title: 'First blog title A',
          author: 'author X',
          url: 'url1'
        })

        cy.wait(500)
        cy.createBlog({
          title: 'Second blog title B',
          author: 'author Y',
          url: 'url2'
        })
      })

      it('blog can be liked', () => {
        cy.get('.blogDiv').as('blogList').then(blogList => {
          console.log(blogList.length)
        })

        // get buttons and set alias for them
        cy.get('.toggleable-button').as('viewButtons')
        // get by alias
        cy.get('@viewButtons').eq(0).click()
        // .get() all like-buttons but only the first visible one can be clicked
        cy.get('.like-button').eq(0).click()
        // toggleable-button element does not contain children, thus we need to go up to the parent level
        cy.get('@viewButtons').parent().contains('likes 1')
      })

      it('blog can be removed', () => {
        // remove second blog in a list
        cy.get('.toggleable-button').eq(1).click()
        cy.get('.remove-button').eq(1).click()
        cy.get('.blogDiv').should('have.length', 1)
      })

      it('blogs are sorted by likes ', () => {
        // first blog with 1 like click
        cy.get('.toggleable-button').eq(0).click()
        cy.get('.like-button').eq(0).click()

        // second blog with 2 like clicks
        cy.get('.toggleable-button').eq(1).click()
        cy.get('.like-button').eq(1).click()
        // wait to allow the blog state to update
        cy.wait(500)
        cy.get('.like-button').eq(1).click()

        // first blog must have max likes
        cy.wait(1000)
        cy.get('.toggleableContent').eq(0).contains('likes 2')
      })
    })
  })
})
