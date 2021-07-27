const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.username || !body.password) {
    response.status(400).json({
      error: "username and passowrd cannot be empty"
    })
  } else if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({
      error: 'password and username should be at least 3 characters long'
    })
  } else if (!User.findOne({ username: body.username }).exec()) {
    return response.status(400).json({
      error: 'username should unique'
    })
  } else {
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    try{
      const savedUser = await user.save()
      response.json(savedUser)
    } catch(exception) {
      return response.status(400).json({
        error: exception.message
      }) 
    }
    
    
  }
})

module.exports = usersRouter
