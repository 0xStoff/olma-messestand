import React, { useState, useEffect } from "react";

const Thumb = (props) => {
  const [thumb, setThumb] = useState(undefined);
  const [file, setFile] = useState("");

  useEffect(() => {
    if (!props.file) {
      return;
    }

    setFile(() => {
      return props;
    });

    let reader = new FileReader();
    reader.readAsDataURL(props.file);
    reader.onloadend = () => {
      setThumb(() => {
        return reader.result;
      });
    };
  }, [props.file]);

  return (
    <div>
      {props.file ? (
        <img
          src={thumb}
          alt={file.name}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
      ) : null}
    </div>
  );
};

export default Thumb;
