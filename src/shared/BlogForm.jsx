import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  //blog form data state
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleAddBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
  }

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            placeholder="title"
            className="border"
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            placeholder="author"
            className="border"
            type="text"
            name=""
            id="author"
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            placeholder="url"
            className="border"
            type="text"
            name=""
            id="url"
            value={url}
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </div>
        <button
          type="submit"
          className="rounded py-1 px-2 bg-slate-600 text-white"
          id="createBlog"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
