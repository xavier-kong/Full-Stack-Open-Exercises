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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
