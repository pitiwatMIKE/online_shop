import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../components/ConfirmDelete";
import LayoutContent from "../../components/LayoutContent";
import Loading from "../../components/Loading";
import {
  deleteUser,
  getUsers,
  selectorUser,
} from "../../reducers/users/userSlice";

export default function UserAdmin() {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values: users } = useSelector(selectorUser);

  const deleteHandle = (id) => dispatch(deleteUser(id));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <LayoutContent>
      <div className="admin-table-container">
        {false ? (
          <Loading />
        ) : (
          <div>
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) &&
                  users.map((user) => (
                    <tr key={user.id} className="table-item text-center">
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="button-primary"
                          onClick={() =>
                            navigate(`/admin/user/update/${user.id}`)
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
                            setUserId(user.id);
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
          </div>
        )}
      </div>

      <ConfirmDelete
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        deleteId={userId}
        deleteHandle={deleteHandle}
      />
    </LayoutContent>
  );
}
