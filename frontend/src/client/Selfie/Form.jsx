import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import {
  insertImage,
  setImageId,
  validateInputLength,
  validateDoubleInputs,
} from "./selfieServices";

import FormContent from "./FormContent";

const SelfieForm = (props) => {
  const { errorSwal, successSwal } = props.swalAlerts;
  const { setIsSubmitted, isSubmitted } = props;

  const validationSchema = yup.object().shape({
    id: yup.number().required().min(0).max(999),
    file: yup.mixed().required(),
  });

  return (
    <div className="mt-5">
      <Formik
        initialValues={{ file: null, id: "" }}
        onSubmit={async (values, { resetForm }) => {
          const validateLength = await validateInputLength(values);
          const validateDouble = await validateDoubleInputs(values);
          if (validateLength) {
            if (validateDouble) {
              setIsSubmitted(() => true);
              insertImage(values, successSwal, setIsSubmitted);
              setImageId(values);
              resetForm({ values: "" });
            } else {
              errorSwal(`Selfie mit ID ${values.id} bereits vorhanden`);
            }
          } else {
            errorSwal(`Kein Teilnehmer mit ID ${values.id}`);
          }
        }}
        validationSchema={validationSchema}
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
            <FormContent
              values={values}
              errors={errors}
              touched={touched}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              handleChange={handleChange}
              isSubmitted={isSubmitted}
            />
          );
        }}
      </Formik>
    </div>
  );
};

export default SelfieForm;
