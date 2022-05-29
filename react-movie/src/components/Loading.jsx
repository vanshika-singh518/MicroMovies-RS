import React from "react";
import load from '../assets/loading.gif'

function Loading() {
  return (
    <center>
      <br />
      <br />
      <img
        src={load} alt="Loading..."
        width="125px"
        height="125px"
      />
    </center>
  );
}

export default Loading;