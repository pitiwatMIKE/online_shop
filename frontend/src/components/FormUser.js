import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import {
  getMyAccount,
  selectorMyAccount,
  updateMyAccount,
} from "../reducers/users/myAccountSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const schema = yup.object().shape({
  firstName: yup.string().required("first name is a required"),
  lastName: yup.string().required("last name is a required"),
  email: yup.string().email().required(),
  password: yup.string().min(6, "must be at least 6 characters long"),
});

export default function FormUser() {
  const [validated, setValidated] = useState(true);
  const [isdisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    errMessage,
    values: myAccount,
  } = useSelector(selectorMyAccount);

  const HandleCancel = (values) => {
    setIsDisabled(true);
    for (let key in myAccount) {
      values[key] = myAccount[key];
    }
    values.password = "";
    setValidated(false);
  };

  const handleClickSubmit = (values) => {
    setValidated(true);
    dispatch(updateMyAccount(values, () => HandleCancel(values)));
  };

  useEffect(() => {
    dispatch(getMyAccount());
  }, [dispatch]);

  return (
    <>
      {loading ? null : (
        <Formik
          validationSchema={schema}
          onSubmit={handleClickSubmit}
          initialValues={{ ...initialValues, ...myAccount }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <div className="form-user-container">
              <div className="form-header mb-4">
                <h3>USER ACCOUNT</h3>
                {/* icon edit */}
                {isdisabled ? (
                  <i
                    onClick={() => setIsDisabled(false)}
                    className="bi bi-pencil-square"
                  ></i>
                ) : null}
              </div>

              {/* error */}
              {validated && error && <Error msg={errMessage} />}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} lg={6}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isValid={
                        validated && touched.firstName && !errors.firstName
                      }
                      isInvalid={
                        validated && touched.firstName && errors.firstName
                      }
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.firstName && errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} lg={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isValid={
                        validated && touched.lastName && !errors.lastName
                      }
                      isInvalid={
                        validated && touched.lastName && errors.lastName
                      }
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.lastName && errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={12}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={validated && touched.email && !errors.email}
                      isInvalid={validated && touched.email && errors.email}
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.email && errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={12}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={
                        validated && touched.password && !errors.password
                      }
                      isInvalid={
                        validated && touched.password && errors.password
                      }
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.password && errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Button */}
                {isdisabled || (
                  <div>
                    <button type="submit" className="btn-update-form">
                      Update
                    </button>
                    <button
                      className="btn-cancel-form"
                      onClick={() => HandleCancel(values)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}
