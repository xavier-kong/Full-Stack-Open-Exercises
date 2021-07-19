import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'www.testurl.com',
    likes: 5
  }

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} />
    )
  }
  )

  test('blog renders the title and author, but not url or likes by default', () => {
    const div = component.container.querySelector('.testrendertitleauthor')
    expect(div).toHaveTextContent(
      'test title test author'
    )
    const details = component.container.querySelector('.testdivdetails')
    expect(details).toHaveStyle('display: none')
  })

  test('show details when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const details = component.container.querySelector('.testdivdetails')
    expect(details).not.toHaveStyle('display: none')
  })

})