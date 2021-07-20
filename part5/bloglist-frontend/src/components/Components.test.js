import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import AddBlogs from './AddBlogs'

describe('<Blog />', () => {

  test('blog renders the title and author, but not url or likes by default', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'www.testurl.com',
      likes: 5
    }

    const component = render(
      <Blog key={blog.id} blog={blog}  />
    )

    const div = component.container.querySelector('.testrendertitleauthor')
    expect(div).toHaveTextContent(
      'test title test author'
    )
    const details = component.container.querySelector('.testdivdetails')
    expect(details).toHaveStyle('display: none')
  })

  test('show details when view button is clicked', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'www.testurl.com',
      likes: 5
    }

    const component = render(
      <Blog key={blog.id} blog={blog}  />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const details = component.container.querySelector('.testdivdetails')
    expect(details).not.toHaveStyle('display: none')
  })

  test('add like callled twice when like button clicked twice', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'www.testurl.com',
      likes: 5
    }

    const mockLikes = jest.fn()

    const component = render(
      <Blog key={blog.id} blog={blog}  addLikes={mockLikes}/>
    )

    const view = component.getByText('view')
    fireEvent.click(view)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockLikes.mock.calls).toHaveLength(2)
  })


})

test('<AddBlogs />', () => {
  const mockAddBlog = jest.fn()

  const component = render(
    <AddBlogs addNewBlog = {mockAddBlog} />
  )

  const titleField = component.container.querySelector('#title')
  const authorField = component.container.querySelector('#author')
  const urlField = component.container.querySelector('#url')
  const createButton = component.getByText('create')

  fireEvent.change(titleField, {
    target: { value: 'test title' },
  })
  fireEvent.change(authorField, {
    target: { value: 'test author' },
  })
  fireEvent.change(urlField, {
    target: { value: 'test url' },
  })
  fireEvent.click(createButton)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0].title).toBe('test title')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('test author')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('test url')
})