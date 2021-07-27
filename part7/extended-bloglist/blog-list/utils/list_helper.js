const _ = require('lodash');

const dummy = blogs => 1

const totalLikes = blogs => {
  if (blogs.length == 1) {
    return blogs[0].likes
  } else {
    return (blogs.reduce((a, b) => a + b.likes, 0))
  }
}

const favoriteBlog = blogs => {
  const fav = blogs.reduce((max, obj) => obj.likes > max.likes? (obj) : (max))
  const {__v, _id, url, ...res} = fav 
  return (res)
}

const mostBlogs = blogs => {
  const list = _.groupBy(blogs, "author")
  let temp = []
  for (const author in list) {
    temp.push(
      {
        "author": author,
        "blogs": list[author].length
      }
    )
  }
  return (temp.reduce((a,b) => b.blogs > a.blogs ? b : a ))
}

const mostLikes = blogs => {
  const list = _.groupBy(blogs, "author")
  let temp = []
  for (const author in list) {
    let likes = 0;
    for (const blog in list[author]) {
      likes += list[author][blog].likes
    }
    temp.push(
      {
        "author": author,
        "likes": likes
      }
    )
  }
  return (temp.reduce((a,b) => b.likes > a.likes ? b : a ))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
