import React from "react"

const Notification = ({ notification }) => {
  const isErrorOrMultiPurpose =
    notification.type === "error"
      ? "w-100 bg-red-500 py-2 text-center text-white text-2xl"
      : "w-100 bg-green-500 py-2 text-center text-white text-2xl"
  return <div className={isErrorOrMultiPurpose}>{notification.message}</div>
}

export default Notification
