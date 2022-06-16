import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import {
  getAddress,
  createAddress,
  selectorAddress,
} from "../reducers/users/addressSlice";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required("first name is a required"),
  lastName: yup.string().required("last name is a required"),
  address: yup.string().required("address is a required"),
  city: yup.string().required("city is a required"),
  province: yup.string().required("province is a required"),
  postalCode: yup
    .string()
    .matches(/^\d+$/, "The postal code should have digits only")
    .length(5, "The postal number must be 5 in length.")
    .required("postal code is a required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "The phone number should have digits only")
    .length(10, "The phone number must be 10 in length.")
    .required("phone is a required"),
});

export default function FormAddress() {
  const [validated, setValidated] = useState(true);
  const [isdisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const {
    loading,
    error,
    errMessage,
    values: userAddress,
  } = useSelector(selectorAddress);

  const HandleCancel = (values) => {
    setIsDisabled(true);
    for (let key in userAddress) {
      values[key] = userAddress[key];
    }
    setValidated(false);
  };

  const handleClickSubmit = (values) => {
    dispatch(createAddress(values, () => HandleCancel(values)));
  };

  useEffect(() => {
    // dispatch(getMyAccount());
    dispatch(getAddress());
  }, [dispatch]);

  return (
    <>
      {loading ? null : (
        <Formik
          validationSchema={schema}
          onSubmit={handleClickSubmit}
          initialValues={{ ...initialValues, ...userAddress }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <div className="form-address-container">
              <div className="form-header mb-4">
                <h3>ADDRESS</h3>
                {/* icon edit */}
                {isdisabled ? (
                  <i
                    onClick={() => {
                      setIsDisabled(false);
                    }}
                    className="bi bi-pencil-square"
                  ></i>
                ) : null}
              </div>

              {/* error */}
              {validated && error && <Error msg={errMessage} />}

              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Email */}
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

                  {/* First Name */}
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

                  {/* Last Name */}
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

                  {/* Address */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isValid={validated && touched.address && !errors.address}
                      isInvalid={validated && touched.address && errors.address}
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.address && errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* City */}
                  <Form.Group as={Col} lg={6}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      isValid={validated && touched.city && !errors.city}
                      isInvalid={validated && touched.city && errors.city}
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.city && errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Province */}
                  <Form.Group as={Col} lg={6}>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      name="province"
                      value={values.province}
                      onChange={handleChange}
                      isValid={
                        validated && touched.province && !errors.province
                      }
                      isInvalid={
                        validated && touched.province && errors.province
                      }
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.province && errors.province}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Postal Code */}
                  <Form.Group as={Col} lg={6}>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={values.postalCode}
                      onChange={handleChange}
                      isValid={
                        validated && touched.postalCode && !errors.postalCode
                      }
                      isInvalid={
                        validated && touched.postalCode && errors.postalCode
                      }
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.postalCode && errors.postalCode}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group as={Col} lg={6}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isValid={validated && touched.phone && !errors.phone}
                      isInvalid={validated && touched.phone && errors.phone}
                      disabled={isdisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.phone && errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Button */}
                {isdisabled || (
                  <div>
                    <button
                      type="submit"
                      className="btn-update-form"
                      onClick={() => {
                        setValidated(true);
                      }}
                    >
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
