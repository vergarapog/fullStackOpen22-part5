import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("<BlogForm /> calls createBlog correctly with the correct props", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText("title")
  const authorInput = screen.getByPlaceholderText("author")
  const urlInput = screen.getByPlaceholderText("url")
  const createButton = screen.getByText("Create")

  await user.type(titleInput, "title1")
  await user.type(authorInput, "author1")
  await user.type(urlInput, "url1")
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("title1")
  expect(createBlog.mock.calls[0][0].author).toBe("author1")
  expect(createBlog.mock.calls[0][0].url).toBe("url1")
})
