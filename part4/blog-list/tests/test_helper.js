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

module.exports = {
  initialBlogs
}