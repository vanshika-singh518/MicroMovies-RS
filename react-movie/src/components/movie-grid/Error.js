import React from "react";
import { Alert } from "@material-ui/lab";

function Error(props) {
  return (
    <>
      <br />
      <br />
      <center>
        <Alert style={{ maxWidth: "500px" }} severity="error">
          <b>{props.error}</b>
          <br/>
          This movie doesn't exist in our database. You can still checkout the movies matching with the keyword.
        </Alert>
      </center>
    </>
  );
}

export default Error;