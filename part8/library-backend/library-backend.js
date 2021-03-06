
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/books')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const url = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    author: Author
    published: Int!
    genres: [String]
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(book => (book.author === args.author && book.genres.includes(args.genre)))
      } else if (args.author) {
        return books.filter(book => book.author === args.author)
        return books
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] }})
      } else {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: () => (Author.find({})),
    me: (root, args, context) => (context.currentUser)
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({ "author": root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let currAuthor = await Author.findOne({ name: args.author}, "_id")

      if (currAuthor === null) {
        const newAuthor = new Author({ name: args.author, born: null })
        try {
          await newAuthor.save()
          currAuthor = newAuthor
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: currAuthor._id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', {bookAdded: book})

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(author._id, { born: args.setBornTo }, { new: true })
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'password' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subcribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})