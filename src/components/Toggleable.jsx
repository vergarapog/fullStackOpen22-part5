import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Toggleable = forwardRef(({ buttonLabel, children }, refs) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenIsVisibleFalse = { display: isVisible ? "none" : "" }
  const showWhenIsVisibleTrue = { display: isVisible ? "" : "none" }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={showWhenIsVisibleFalse}>
        <button
          className="py-1 px-2 bg-slate-600 rounded text-white"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenIsVisibleTrue}>
        {children}
        <button
          className="py-1 px-2 bg-slate-600 rounded text-white"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

Toggleable.displayName = "Toggleable"

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
