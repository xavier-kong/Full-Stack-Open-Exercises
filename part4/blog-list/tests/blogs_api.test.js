const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "test title 1",
    author: "test author 1",
    url: "www.testurl1.com",
    likes: 1 
  },
  {
    title: "test title 2",
    author: "test author 2",
    url: "www.testurl2.com",
    likes: 2 
  },
  {
    title: "test title 3",
    author: "test author 3",
    url: "www.testurl3.com",
    likes: 3
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('all notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})