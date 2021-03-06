describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Test User',
      username: 'cypresstest',
      password: 'cypresstest'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.get('#usernamefield')
    cy.get('#passwordfield')
    cy.get('#loginsubmit')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernamefield').type('cypresstest')
      cy.get('#passwordfield').type('cypresstest')
      cy.get('#loginsubmit').click()

      cy.get('.error')
        .should('contain', 'Welcome Cypress Test User')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('contain', 'Cypress Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.clearLocalStorage()
      cy.visit('http://localhost:3000')
      cy.get('#usernamefield').type('wrongusername')
      cy.get('#passwordfield').type('wrongpassword')
      cy.get('#loginsubmit').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Cypress Test User logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypresstest', password: 'cypresstest' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('blog cypress')
      cy.get('#url').type('www.blogurl.cypress')
      cy.get('#submitblog').click()
      cy.contains('a blog title created by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('blog cypress')
      cy.get('#url').type('www.blogurl.cypress')
      cy.get('#submitblog').click()

      cy.get('#viewbutton').click()
      cy.get('#likebutton').click()

      cy.get('#bloglikes')
        .should('contain', 1)
    })

    it('A blog can be deleted by user', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('blog cypress')
      cy.get('#url').type('www.blogurl.cypress')
      cy.get('#submitblog').click()

      cy.get('#viewbutton').click()
      cy.get('#deletebutton').click()

      cy.should('not.contain', 'a blog title created by cypress')
      cy.get('html').should('contain', 'Deleted blog: a blog title created by cypress by blog cypress')
    })

    it('blogs are ordered by likes', function() {
      cy.createBlog({ title: '1 like', author: 'author', url:'www.cypresstest.com', likes: 1 })
      cy.createBlog({ title: '2 like', author: 'author', url:'www.cypresstest.com', likes: 2 })
      cy.createBlog({ title: '3 like', author: 'author', url:'www.cypresstest.com', likes: 3 })

      cy.get('[class="testdivdetails"]').eq(1)
      cy.get('[id="bloglikes"]').eq(0).should('contain', '1')
      cy.get('[id="bloglikes"]').eq(1).should('contain', '2')
      cy.get('[id="bloglikes"]').eq(2).should('contain', '3')

    })
  })
})