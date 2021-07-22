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

    it.only('A blog can be liked', function() {
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


  })
})