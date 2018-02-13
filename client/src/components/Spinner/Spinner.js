import React from "react"

const Spinner = (props) => {
  return (
    <img 
      style={{height: 50, width:50}} 
      src={process.env.PUBLIC_URL + "/images/Magnify-1s-200px.gif"}
      alt="Loading..."
      longdesc="Spinner provided by Loading.io"/>
  )}

export default Spinner