import * as yup from "yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import FormContent from "./FormContent";

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

  const responseId = await axios({
    url: "http://65.21.188.255/api/get",
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  });

  teilnehmer.id = responseId.data.length + 1;
  teilnehmer.winnerId = 0;
  teilnehmer.questions = props.surveyResult;

  const response = await axios({
    url: "http://65.21.188.255/api/post",
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
    <Formik
      action="http://65.21.188.255/api/upload"
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
        questions: 1,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        insertParticipant(values, props);
        setSubmitting(false);
        resetForm({ values: "" });
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
          <div className="container w-75">
            <FormContent
              values={values}
              errors={errors}
              touched={touched}
              handleSubmit={handleSubmit}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
          </div>
        );
      }}
    </Formik>
  );
};

export default WinForm;
