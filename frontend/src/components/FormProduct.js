import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProduct,
  selectorProduct,
  updateProduct,
} from "../reducers/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";

let schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  desc: yup.string().required(),
});

const initialValues = {
  name: "",
  price: "",
  desc: "",
  imageProduct: "",
};

export default function FormProduct({ isUpdate }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { values: initProduct } = useSelector(selectorProduct);
  const navigate = useNavigate();

  const handleClickSubmit = (values) => {
    if (isUpdate) {
      dispatch(updateProduct(values, id));
    } else {
      dispatch(createProduct(values));
    }
  };

  useEffect(() => {
    if (isUpdate) {
      dispatch(getProduct(id));
    }
  }, [isUpdate, dispatch, id]);

  if (!isUpdate) {
    // not update then add validate image
    schema = schema.concat(
      yup.object({
        imageProduct: yup.mixed().required(),
      })
    );
  }

  return (
    <div className="form-product-container">
      <h2>{isUpdate ? "UPDATE PRODUCT" : "CREATE PRODUCT"}</h2>

      <Formik
        validationSchema={schema}
        onSubmit={handleClickSubmit}
        initialValues={{ ...initialValues, ...initProduct }}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Name Product</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.name && errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  isValid={touched.price && !errors.price}
                  isInvalid={touched.price && errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.price && errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="desc"
                  onChange={handleChange}
                  value={values.desc}
                  isValid={touched.desc && !errors.desc}
                  isInvalid={touched.desc && errors.desc}
                />

                <Form.Control.Feedback type="invalid">
                  {touched.desc && errors.desc}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name="imageProduct"
                  onChange={(event) => {
                    setFieldValue("imageProduct", event.currentTarget.files[0]);
                  }}
                  isValid={touched.imageProduct && !errors.imageProduct}
                  isInvalid={touched.imageProduct && errors.imageProduct}
                />
              </Form.Group>

              <div className="show-image-product">
                {values.imageProduct && (
                  <img
                    alt="not fount"
                    width={250}
                    src={
                      typeof values.imageProduct === "object"
                        ? URL.createObjectURL(values.imageProduct)
                        : values.imageProduct
                    }
                  />
                )}
              </div>
            </Row>

            <div className="form-btn">
              <button type="submit" className="button-primary">
                {isUpdate ? "Update" : "Create"}
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
