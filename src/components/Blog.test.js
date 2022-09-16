import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders only author and title with toggleable off", async () => {
  const blog = {
    title: "You're NOT gonna need it!",
    author: "Ron Jeffries",
    url: "sss",
    likes: 6,
    user: {
      username: "user1",
      name: "user1",
      id: "63071471e75cc8dd4085f9f5",
    },
    id: "63130fe468494573f27c98be",
  }

  const user = {
    name: "user1",
  }

  render(<Blog blog={blog} user={user} />)

  const title = await screen.findByText("You're NOT gonna need it!")
  const author = await screen.findByText("Ron Jeffries")
  expect(title).toBeDefined()
  expect(author).toBeDefined()

  const url = screen.queryByText("sss")
  expect(url).toBeNull()

  const numLikes = screen.queryByText("6")
  expect(numLikes).toBeNull()
})

test("renders all blog information when view details is toggled", async () => {
  const blog = {
    title: "You're NOT gonna need it!",
    author: "Ron Jeffries",
    url: "sss",
    likes: 6,
    user: {
      username: "user1",
      name: "user1",
      id: "63071471e75cc8dd4085f9f5",
    },
    id: "63130fe468494573f27c98be",
  }

  const user = {
    name: "user1",
  }

  render(<Blog blog={blog} user={user} />)

  const testUser = userEvent.setup()
  const showButton = await screen.findByText("View more")
  await testUser.click(showButton)

  const url = screen.getByText("sss", { exact: false })
  const likes = screen.getByText("6", { exact: false })
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test("like button clicked twice ensures it is called twice", async () => {
  const handleLike = jest.fn()

  const blog = {
    title: "You're NOT gonna need it!",
    author: "Ron Jeffries",
    url: "sss",
    likes: 6,
    user: {
      username: "user1",
      name: "user1",
      id: "63071471e75cc8dd4085f9f5",
    },
    id: "63130fe468494573f27c98be",
  }

  const user = {
    name: "user1",
  }

  render(<Blog blog={blog} handleLike={handleLike} user={user} />)

  const testUser = userEvent.setup()

  const showButton = await screen.findByText("View more")
  await testUser.click(showButton)

  const likeButton = await screen.findByText("like")
  await testUser.click(likeButton)
  await testUser.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})
