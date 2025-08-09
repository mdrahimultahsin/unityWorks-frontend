import React from "react";
import {HashLoader} from "react-spinners";
const Spinner = () => {
  return (
    <div className="flex min-h-[80vh]  items-center justify-center">
      <HashLoader color="#2ecc71" />
    </div>
  );
};

export default Spinner;
