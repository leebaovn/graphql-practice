import React from 'react'

function Button({ children, onClick, type, ...props }) {
  return (
    <button
      className="btn"
      onClick={onClick}
      type={type || "submit"}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
