import { Form, Col } from "react-bootstrap";
import Thumb from "./Thumb";

let inputFile = "Selfie hochladen";

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

  if (isSubmitted) {
    inputFile = "Selfie hochladen";
  }

  return (
    <div className="row w-50">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} md="5" className="generateUsers">
          <Form.Control
            autoComplete="off"
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
          accept="image/*"
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
};

export default FormContent;
