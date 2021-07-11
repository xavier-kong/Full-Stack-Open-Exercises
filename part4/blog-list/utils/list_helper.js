const dummy = blogs => 1

const totalLikes = blogs => {
  if (blogs.length == 1) {
    return blogs[0].likes
  } else {
    const red = blogs.reduce((a, b) => a + b.likes, 0)
    console.log(red)
    return (
      red
    )
  }
}

module.exports = {
  dummy,
  totalLikes
}
