import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LayoutContent from "../../components/LayoutContent";
import Loading from "../../components/Loading";
import { getUsers, selectorUser } from "../../reducers/users/userSlice";

export default function UserAdmin() {
  const dispatch = useDispatch();
  const { values: users } = useSelector(selectorUser);

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
      ></div>
    </LayoutContent>
  );
}
