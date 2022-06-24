import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectorUser,
  updateUser,
} from "../../reducers/users/userSlice";
import { useNavigate, useParams } from "react-router-dom";

let schema = yup.object().shape({
  firstName: yup.string().required("First Name is a required"),
  lastName: yup.string().required("Last Name is a required"),
  email: yup.string().email().required(),
  password: yup.string().min(6, "must be at least 6 characters long"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

export default function UpdaetUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values: user } = useSelector(selectorUser);

  const handleClickSubmit = (values) => {
    dispatch(updateUser(id, values, navigate));
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div className="form-product-container">
      <h2>UPDATE USER</h2>

      <Formik
        validationSchema={schema}
        onSubmit={handleClickSubmit}
        initialValues={{ ...initialValues, ...user }}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>First Namae</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={touched.firstName && errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.firstName && errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={touched.lastName && errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.lastName && errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm={12}>
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

              <Form.Group as={Col} sm={12}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoComplete="off"
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

              <Form.Group as={Col}>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={values.role}
                  name="role"
                  onChange={handleChange}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <div className="form-btn">
              <button type="submit" className="button-primary">
                Update
              </button>
              <button
                type="button"
                className="button-secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
