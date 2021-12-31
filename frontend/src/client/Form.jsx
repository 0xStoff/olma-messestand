import * as yup from "yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

const schema = yup.object().shape({
  vorname: yup.string().required(),
  name: yup.string().required(),
  geburtstag: yup
    .date()
    .required()
    .nullable()
    .test("geburtstag", "Du musst älter als 18 Jahre sein", (value) => {
      return moment().diff(moment(value), "years") >= 18;
    }),
  adresse: yup.string().required(),
  telefonnummer: yup.number().required().max(999999999),
  plz: yup.number().required().min(1000).max(9999),
  email: yup.string().email("Email ist ungültig").required(),
  terms: yup
    .bool()
    .required()
    .oneOf([true], "Teilnahmebedingung muss akzeptiert werden"),
});

const insertParticipant = async (data, props) => {
  const { terms, ...teilnehmer } = data;

  console.log(data);
  const responseId = await axios({
    url: "http://65.21.60.19:80/api/get",
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  });

  teilnehmer.id = responseId.data.length + 1;
  teilnehmer.winnerId = 0;

  // console.log(teilnehmer);
  const response = await axios({
    url: "http://65.21.60.19:80/api/post",
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    data: teilnehmer,
  }).then(async (response) => {
    const success = await props.successSwal(
      `Teilnahme erfolgreich, Viel Glück ${data.vorname}!`
    );
    if (success.isDismissed) {
      Swal.fire({
        icon: "warning",
        title: `Erhöhe deine Chancen mit einem Selfie (id für selfie: ${teilnehmer.id})
      `,
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  });
};

const WinForm = (props) => {
  return (
    <div>
      <div className="formPosition">
        <Formik
          action="http://65.21.60.19:80/api/upload"
          method="post"
          encType="multipart/form-data"
          validator={schema}
          validationSchema={schema}
          initialValues={{
            id: "",
            vorname: "",
            name: "",
            geburtstag: "",
            adresse: "",
            telefonnummer: "",
            email: "",
            plz: "",
            selfie: 0,
            terms: false,
          }}
          onSubmit={(values, { setSubmitting }) => {
            insertParticipant(values, props);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <p>{values.id}</p>
                <Row>
                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Vorname"
                      name="vorname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.vorname}
                      isInvalid={errors.vorname && touched.vorname}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Nachname"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      isInvalid={errors.name && touched.name && !values.name}
                    />
                    {values.name == values.vorname &&
                    touched.name &&
                    values.name ? (
                      <p className="formError">gleicher Vor- und Nachname</p>
                    ) : null}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="date"
                      placeholder="Geburtsdatum"
                      name="geburtstag"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.geburtstag}
                      isInvalid={errors.geburtstag && touched.geburtstag}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Adresse"
                      name="adresse"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.adresse}
                      isInvalid={errors.adresse && touched.adresse}
                    />
                  </Form.Group>
                </Row>{" "}
                {errors.geburtstag &&
                touched.geburtstag &&
                values.geburtstag ? (
                  <p className="formError">{errors.geburtstag}</p>
                ) : null}
                <Row>
                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="number"
                      placeholder="Telefonnummer"
                      name="telefonnummer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telefonnummer}
                      isInvalid={errors.telefonnummer && touched.telefonnummer}
                    />{" "}
                    {errors.telefonnummer &&
                    touched.telefonnummer &&
                    values.telefonnummer ? (
                      <p className="formError">Telefonnummer zu lang</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="email"
                      placeholder="E-Mail"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={errors.email && touched.email}
                    />
                    {errors.email && touched.email && values.email ? (
                      <p className="formError">{errors.email}</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col} md="5" className="mb-2">
                    <Form.Control
                      type="number"
                      placeholder="PLZ"
                      name="plz"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.plz}
                      isInvalid={errors.plz && touched.plz}
                    />
                  </Form.Group>
                  {errors.plz && touched.plz && values.plz ? (
                    <p className="formError">
                      PLZ muss zwischen 1000 und 9999 liegen
                    </p>
                  ) : null}
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="Akzeptieren Sie die Teilnahmebedingung"
                    onChange={handleChange}
                    isInvalid={!!errors.terms && touched.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button
                  className="btn  btn-light buttonTheme"
                  type="submit"
                  disabled={
                    !values.vorname ||
                    !values.name ||
                    !values.geburtstag ||
                    !values.adresse ||
                    !values.email ||
                    !values.plz
                  }
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default WinForm;
