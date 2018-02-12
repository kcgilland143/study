import React from "react";

function applySize(size) {
  return size.split(" ").map(size => "col-" + size).join(" ")
}

function applyOffset(offset) {
  return offset.split(" ").map(size => {
    let [view, num] = size.split("-")
    return "col-" + view + "-offset-" + num
  }).join(" ")
}

export const Col = ({ size, children, offset}) => {
  let classnames = applySize(size)
  if (offset) { classnames += " " + applyOffset(offset) }
  return (
    <div className={ classnames }>
      {children}
    </div>
  )
}
