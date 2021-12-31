import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";

const insertImage = async (data, props) => {
  let bodyFormData = new FormData();
  bodyFormData.append("file", data.file);

  await axios({
    method: "POST",
    url: "http://65.21.60.19:80/api/upload",
    data: bodyFormData,
    mode: "cors",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      props.successSwal("Bild erfolgreich eingesendet!");
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
  }, [data]);

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
        </Col>
      );
    });
  }
  return <Row>{mapImages}</Row>;
};

const Selfie = (props) => {
  const [images, setImages] = useState("");

  useEffect(() => {
    if (!images) {
      loadImages();
    }
  }, [images]);

  const loadImages = async () => {
    await axios({
      method: "GET",
      mode: "cors",
      url: "http://65.21.60.19:80/api/images",
    })
      .then((response) => {
        setImages(() => {
          return response.data;
        });
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const setImageId = async (data) => {
    await axios({
      method: "POST",
      mode: "cors",
      url: "http://65.21.60.19:80/api/setid",
      data: { id: data.id, file: data.file.name },
    })
      .then((response) => {
        loadImages();
      })
      .catch((response) => {
        console.log(response);
      });
  };
  return (
    <div className="mt-5">
      <Formik
        initialValues={{ file: null, id: "" }}
        onSubmit={(values) => {
          insertImage(values, props);
          setImageId(values);
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
            <div className="form-group w-50 mt-5">
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
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="form-control mt-2"
                />
                <Thumb file={values.file} />

                <button
                  type="submit"
                  className="btn btn-outline-dark mt-2 mb-5"
                >
                  submit
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
      <Images images={images} />{" "}
    </div>
  );
};

export default Selfie;
