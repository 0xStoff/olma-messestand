import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Images = (props) => {
  let images = props.images;
  let mapImages;
  if (images !== undefined && images.length > 0) {
    mapImages = images.map((image, i) => {
      return (
        <Col key={i} xs={6} md={4}>
          <img className="img-thumbnail mt-2" src={`/media/${image}`} />
          {!props.firstNames.response ? null : (
            <p>{props.firstNames.response.data[i].vorname}</p>
          )}
        </Col>
      );
    });
  }
  return <Row>{mapImages}</Row>;
};

const RenderImages = (props) => {
  const [images, setImages] = useState("");
  const [firstNames, setFirstNames] = useState(0);

  const displayImages = async () => {
    await axios({
      method: "GET",
      mode: "cors",
      url: "http://65.21.188.255:80/api/images",
    })
      .then((response) => {
        setImages(() => {
          return response.data;
        });
        // console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });

    const response = await axios({
      method: "GET",
      mode: "cors",
      url: "http://65.21.188.255:80/api/vorname",
      headers: {
        "Content-type": "application/json",
      },
    });

    setFirstNames((state) => {
      return { ...state, response };
    });
  };

  useEffect(() => {
    displayImages();
  }, [props.isSubmitted]);

  return (
    <div className="mt-5">
      <Images images={images} firstNames={firstNames} />{" "}
    </div>
  );
};

export default RenderImages;
