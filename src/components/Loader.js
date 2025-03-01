import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
