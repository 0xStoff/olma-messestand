import React, { useState, useEffect } from "react";
import RenderImages from "./RenderImages";
import Form from "./Form";

const Selfie = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="mt-5">
      <Form
        swalAlerts={props.swalAlerts}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
      <RenderImages isSubmitted={isSubmitted} />
    </div>
  );
};

export default Selfie;
