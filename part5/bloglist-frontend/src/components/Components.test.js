import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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