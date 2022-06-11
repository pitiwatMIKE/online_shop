import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6, "must be at least 6 characters long")
    .required(),
});

export default function SignInPage() {
  const navigate = useNavigate();
  const handleClickSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="form-wrap">
      <h2 className="text-center form-title">Welcome to Online Shop</h2>
      <Formik
        validationSchema={schema}
        onSubmit={handleClickSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 mt-3">
              <Form.Group as={Col} md={12}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.email && errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.password && errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div>
              <button className="form-primary-btn" type="submit">
                Sign In
              </button>
              <div className="text-center my-2">or</div>
              <button
                className="form-secondary-btn"
                type="button"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
