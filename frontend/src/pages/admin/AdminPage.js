import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import LayoutContent from "../../components/LayoutContent";
import { logout, selectorAuth } from "../../reducers/users/authSlice";

const isActive = ({ isActive }) => (isActive ? "active-link" : undefined);

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values: userAuth } = useSelector(selectorAuth);

  useEffect(() => {
    if (!userAuth) {
      dispatch(logout());
      navigate("/signin", { state: { from: "/admin" } });
    } else {
      location.pathname === "/admin" && navigate("/admin/order");
    }
  }, [dispatch, navigate, location, userAuth]);

  return (
    <LayoutContent>
      <div className="admin-page-container">
        <nav>
          <ul>
            <li>
              <NavLink className={isActive} to="order">
                Order
              </NavLink>
            </li>
            <li>
              <NavLink className={isActive} to="product">
                Product
              </NavLink>
            </li>
            <li>
              <NavLink className={isActive} to="carousel">
                Carousel
              </NavLink>
            </li>
            <li>
              <NavLink className={isActive} to="user">
                User
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </LayoutContent>
  );
}
