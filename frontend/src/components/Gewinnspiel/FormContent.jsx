import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Formik } from "formik";
import React from "react";

const FormContent = (props) => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    handleChange,
    isSubmitted,
  } = props;

  return (
    <Form noValidate onSubmit={handleSubmit} className="gewinnspielForm">
      <Row className="justify-content-between">
        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Vorname"
            name="vorname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.vorname}
            isInvalid={errors.vorname && touched.vorname}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Nachname"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            isInvalid={errors.name && touched.name && !values.name}
          />
          {values.name == values.vorname && touched.name && values.name ? (
            <p className="formError">gleicher Vor- und Nachname</p>
          ) : null}
        </Form.Group>
      </Row>
      <Row className="justify-content-between">
        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
            type="date"
            placeholder="Geburtsdatum"
            name="geburtstag"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.geburtstag}
            isInvalid={errors.geburtstag && touched.geburtstag}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
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
      {errors.geburtstag && touched.geburtstag && values.geburtstag ? (
        <p className="formError">{errors.geburtstag}</p>
      ) : null}
      <Row className="justify-content-between">
        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
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
        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
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
      </Row>
      <Row>
        <Form.Group as={Col} md="6" className="mb-2">
          <Form.Control
            autoComplete="off"
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
          <p className="formError">PLZ muss zwischen 1000 und 9999 liegen</p>
        ) : null}
        <Form.Group as={Col} md="6" className="mb-2" />
      </Row>
      <Form.Group className="mb-3 themeText">
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
};

export default FormContent;
