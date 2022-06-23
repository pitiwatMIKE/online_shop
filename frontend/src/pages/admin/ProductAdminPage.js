import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LayoutContent from "../../components/LayoutContent";
import Loading from "../../components/Loading";
import Paginate from "../../components/Paginate";
import {
  getProducts,
  selectorProduct,
} from "../../reducers/products/productSlice";

export default function ProductAdminPage() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const {
    loading,
    values: { products, maxPage },
  } = useSelector(selectorProduct);

  useEffect(() => {
    dispatch(getProducts({ page }));
  }, [dispatch, page]);

  return (
    <LayoutContent>
      <div className="admin-table-container">
        <button className="button-primary mt-3">CREATE</button>
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
                        <img src={product.imageUrl} alt="image_product" />
                      </td>
                      <td>{product.name}</td>
                      <td>฿ {product.price}</td>
                      <td>
                        <Link to={`/product/${product.id}`}>Detail</Link>
                      </td>
                      <td>
                        <button className="button-primary">UPDATE</button>
                      </td>
                      <td>
                        <button className="button-secondary">DELELTE</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {!true && <h1 className="my-5 text-center">EMPTY.</h1>}
          </div>
        )}
      </div>

      <div
        className="my-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paginate count={2} page={page} maxPage={maxPage} />
      </div>
    </LayoutContent>
  );
}
