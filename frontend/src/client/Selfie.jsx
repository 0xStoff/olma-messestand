import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";

const insertImage = async (data, props, setIsSubmitted) => {
  let bodyFormData = new FormData();
  bodyFormData.append("file", data.file);

  await axios({
    method: "POST",
    url: "http://65.21.188.255:80/api/upload",
    data: bodyFormData,

    mode: "cors",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      setIsSubmitted(() => false);
      props.successSwal("Bild erfolgreich eingesendet!");
      // props.loadImages();
      // console.log(props);
    })
    .catch((response) => {
      console.log(response);
    });
};

const Thumb = (data) => {
  const [thumb, setThumb] = useState(undefined);
  const [file, setFile] = useState("");

  useEffect(() => {
    if (!data.file) {
      return;
    }

    setFile(() => {
      return data;
    });

    let reader = new FileReader();
    reader.readAsDataURL(data.file);
    reader.onloadend = () => {
      setThumb(() => {
        return reader.result;
      });
    };
  }, [data.file]);

  return (
    <div>
      {data.file ? (
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

const Images = (props) => {
  let images = props.images;
  let mapImages;
  if (images !== undefined && images.length > 0) {
    mapImages = images.map((image, i) => {
      return (
        <Col key={i} xs={6} md={4}>
          <img className="img-thumbnail mt-2" src={`/media/${image}`} />
          {props.firstNames ? (
            <p>{props.firstNames.response.data[i].vorname}</p>
          ) : null}
        </Col>
      );
    });
  }
  return <Row>{mapImages}</Row>;
};

const Selfie = (props) => {
  const [images, setImages] = useState("");
  const [firstNames, setFirstNames] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let inputFile = "Selfie hochladen";
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

  // useEffect(() => {
  //   displayFirstNames();
  // }, []);

  useEffect(() => {
    displayImages();
  }, [isSubmitted]);

  const setImageId = async (data) => {
    await axios({
      method: "POST",
      mode: "cors",
      url: "http://65.21.188.255:80/api/setid",
      data: { id: data.id, file: data.file.name },
    })
      .then((response) => {
        // setFirstNames((state) => {
        //   return [...state, response.data[1][0].vorname];
        // });
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <div className="mt-5">
      <Formik
        initialValues={{ file: null, id: "" }}
        onSubmit={(values, { resetForm }) => {
          setIsSubmitted(() => true);
          insertImage(values, props, setIsSubmitted);
          setImageId(values);
          resetForm({ values: "" });
        }}
        validationSchema={yup.object().shape({
          id: yup.number().required().min(0).max(9999),
          file: yup.mixed().required(),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          handleBlur,
          handleChange,
        }) => {
          return (
            <div className="row w-50">
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="5">
                  <Form.Control
                    type="number"
                    placeholder="id"
                    name="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                    isInvalid={errors.id && touched.id}
                  />
                </Form.Group>
                <label
                  className="buttonTheme m-2"
                  htmlFor="file"
                  className="btn btn-outline-dark mt-2 buttonTheme"
                >
                  {!isSubmitted ? inputFile : <div className="loader"></div>}
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event, file) => {
                    inputFile = event.currentTarget.files[0].name;
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="form-control mt-2"
                />
                <Thumb file={values.file} isSubmitted={isSubmitted} />

                <button
                  type="submit"
                  className="btn btn-outline-dark mt-2 mb-5 buttonTheme"
                >
                  Submit
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
      <Images images={images} firstNames={firstNames} />{" "}
    </div>
  );
};

export default Selfie;
