import React from "react";

export const ListItem = props =>
  <li className={"list-group-item" + " " + props.className}>
    {props.children}
  </li>;
