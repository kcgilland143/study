import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};

export const unwrappedList = ({ children }) => {
  return (
    <ul className="list-group">
        {children}
    </ul>
  );
}
