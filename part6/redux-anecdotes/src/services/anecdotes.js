import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnec = async (anecdote) => {
  const votedAnec = {
    ...anecdote,
    votes: anecdote.votes+1
  }
  await axios.put(`${baseUrl}/${anecdote.id}`, votedAnec)
}

export default { 
  getAll,
  createNew,
  voteAnec,
}