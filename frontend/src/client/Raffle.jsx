import * as yup from "yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

const Raffle = (props) => {
  return (
    <div>
      <div className="formPosition">
        <Formik
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // insertParticipant(values, props);
            // setSubmitting(false);
            // resetForm({ values: "" });
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
                <Row>
                  <Form.Group as={Col} md="12" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="q1"
                      name="q1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.q1}
                      isInvalid={errors.q1 && touched.q1}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="12" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="q2"
                      name="q2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.q2}
                      isInvalid={errors.q2 && touched.q2}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="q3"
                      name="q3"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.q3}
                      isInvalid={errors.q3 && touched.q3}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="q4"
                      name="q4"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.q4}
                      isInvalid={errors.q4 && touched.q4}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="q5"
                      name="q5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.q5}
                      isInvalid={errors.q5 && touched.q5}
                    />
                  </Form.Group>
                </Row>

                <Button
                  className="btn  btn-light buttonTheme"
                  type="submit"
                  //   disabled={
                  //     !values.vorname ||
                  //     !values.name ||
                  //     !values.geburtstag ||
                  //     !values.adresse ||
                  //     !values.email ||
                  //     !values.plz
                  //   }
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

export default Raffle;
