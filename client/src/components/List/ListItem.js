import React from "react";

export const ListItem = props => {
  const classes = props.className ? props.className : ""
  return <li className={"list-group-item " + classes}>
    {props.children}
  </li>;
}
