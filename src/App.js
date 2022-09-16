import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

//components
import LoginForm from "./shared/LoginForm"
import BlogForm from "./shared/BlogForm"
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const addBlogRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogappUser")
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogsByLikes = (blogs) => {
    const sortedByLikes = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    return sortedByLikes
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = sortBlogsByLikes(blogs)
      setBlogs(sortedBlogs)
    })
  }, [])

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      setNotification({
        message: `${newBlog.title} by  ${newBlog.author} successfully added`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.log(response)
      setBlogs(blogs.concat(response))
      console.log(blogs)
      addBlogRef.current.toggleVisibility()
    } catch (error) {
      setNotification({
        type: "error",
        message: "Adding failed, please try again",
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleDeletedBlog = async (id) => {
    try {
      await blogService.destroy(id)
      const newBlogs = blogs.filter((b) => {
        return b.id !== id
      })
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (id, blog) => {
    const res = await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
    setBlogs(
      blogs.map((blog) => {
        return blog.id === id ? res : blog
      })
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
      setNotification({ message: "Login Successful" })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      setNotification({ type: "error", message: "Wrong Credentials" })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {user ? (
        <div>
          <div>{user.name} logged in</div>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-slate-600 rounded text-white"
          >
            Logout
          </button>
          <Toggleable buttonLabel={"Add Blog"} ref={addBlogRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
          <h2>All Blogs:</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleDeletedBlog={handleDeletedBlog}
              handleLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <Toggleable buttonLabel={"Login"}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Toggleable>
      )}
    </div>
  )
}

export default App
