import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { range } from "../utils/range";

const Paginate = ({ page, maxPage, search, count }) => {
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  let isFirstPage = currentPage === 1 ? true : false;
  let isLastePage = currentPage === maxPage ? true : false;
  let minIndex = currentPage - count > 1 ? currentPage - count : 1;
  let maxIndex = currentPage + count > maxPage ? maxPage : currentPage + count;
  const itemPage = range(minIndex, maxIndex);

  const location = useLocation();
  const navigate = useNavigate();

  const pageHandler = (page) => {
    setCurrentPage(page);

    // auto pathname from component while use call pagination
    const { pathname } = location;
    let navigatePath = pathname.includes("/page")
      ? `${pathname.split("/page")[0]}/page/${page}`
      : pathname === "/"
      ? `${pathname}page/${page}`
      : `${pathname}/page/${page}`;

    navigate(navigatePath);
  };

  return (
    <>
      {maxPage > 1 ? (
        <Pagination>
          <Pagination.First
            disabled={isFirstPage}
            onClick={() => pageHandler(1)}
          />
          <Pagination.Prev
            disabled={isFirstPage}
            onClick={() => pageHandler(currentPage - 1)}
          />
          {itemPage.map((page) => (
            <Pagination.Item
              key={page}
              active={Number(page) === Number(currentPage) ? true : false}
              onClick={() => pageHandler(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={isLastePage}
            onClick={() => pageHandler(currentPage + 1)}
          />
          <Pagination.Last
            disabled={isLastePage}
            onClick={() => pageHandler(maxPage)}
          />
        </Pagination>
      ) : null}
    </>
  );
};

export default Paginate;
