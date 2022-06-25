import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDelete from "../../components/ConfirmDelete";
import LayoutContent from "../../components/LayoutContent";
import Loading from "../../components/Loading";
import Paginate from "../../components/Paginate";
import {
  deleteProduct,
  getProducts,
  selectorProduct,
} from "../../reducers/products/productSlice";

export default function ProductAdminPage() {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const {
    loading,
    values: { products, maxPage },
  } = useSelector(selectorProduct);

  const deleteHandle = (id) => dispatch(deleteProduct(id));

  useEffect(() => {
    dispatch(getProducts({ page }));
  }, [dispatch, page]);

  return (
    <LayoutContent>
      <div className="admin-table-container">
        <button
          className="button-primary mt-3"
          onClick={() => navigate("/admin/product/create")}
        >
          CREATE
        </button>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Detail</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) &&
                  products.map((product) => (
                    <tr key={product.id} className="table-item text-center">
                      <td className="image-table">
                        <img src={product.imageProduct} alt="image_product" />
                      </td>
                      <td>{product.name?.toUpperCase()}</td>
                      <td>฿ {product.price}</td>
                      <td>
                        <Link to={`/product/${product.id}`}>Detail</Link>
                      </td>
                      <td>
                        <button
                          className="button-primary"
                          onClick={() =>
                            navigate(`/admin/product/update/${product.id}`)
                          }
                        >
                          UPDATE
                        </button>
                      </td>
                      <td>
                        <button
                          className="button-secondary"
                          onClick={() => {
                            setShowConfirmDelete(true);
                            setProductId(product.id);
                          }}
                        >
                          DELELTE
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {!true && <h1 className="my-5 text-center">EMPTY.</h1>}

            <div
              className="my-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Paginate count={2} page={page} maxPage={maxPage} />
            </div>
          </div>
        )}
      </div>

      <ConfirmDelete
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        deleteId={productId}
        deleteHandle={deleteHandle}
      />
    </LayoutContent>
  );
}
