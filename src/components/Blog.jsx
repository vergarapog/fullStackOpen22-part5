import { useState, useEffect } from "react"

const Blog = ({ blog, user, handleDeletedBlog, handleLike }) => {
  const [isShowMore, setIsShowMore] = useState(false)
  const [doesUserOwnBlog, setDoesUserOwnBlog] = useState(false)

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDeletedBlog(blog.id)
    }
  }
  // let doesUserOwnBlog

  useEffect(() => {
    setDoesUserOwnBlog(blog.user.name === user.name)
  }, [])

  return (
    <div>
      {isShowMore ? (
        <div>
          <div className="p-1 border">
            <span className="font-bold blog-title">{blog.title}</span>{" "}
            <button
              onClick={toggleShowMore}
              className="text-sm text-white bg-slate-700 rounded py-1 px-2"
            >
              Hide
            </button>
            <div>Link: {blog.url}</div>
            <div>
              Likes: {blog.likes}{" "}
              <button
                className="py-1/2 px-2 bg-green-600 text-white rounded-md"
                onClick={() => handleLike(blog.id, blog)}
              >
                like
              </button>
            </div>
            <div>Author: {blog.author}</div>
            <div>
              <button
                className="text-sm text-white bg-red-700 rounded py-1 px-2"
                style={doesUserOwnBlog ? { display: "" } : { display: "none" }}
                onClick={handleDelete}
                id="removeButton"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-1 border ">
          <span className="font-bold blog-title">{blog.title}</span> by{" "}
          <span>{blog.author}</span>{" "}
          <button
            onClick={toggleShowMore}
            className="text-sm text-white bg-slate-700 rounded py-1 px-2"
          >
            View more
          </button>
          <div></div>
        </div>
      )}
    </div>
  )
}

export default Blog
