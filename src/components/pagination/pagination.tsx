import React from "react";
import style from "./pagination.module.scss";

interface PaginationProps {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setNextPage: () => void;
  setPreviousPage: () => void;
}

function Pagination({
  startIndex,
  endIndex,
  currentPage,
  setCurrentPage,
  setNextPage,
  setPreviousPage,
}: PaginationProps) {
  const pages = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pages.push(i);
  }
  return (
    <div className={style.pagination}>
      <span
        onClick={() => {
          setPreviousPage();
        }}
        className={style["prev-page"]}
      ></span>
      {pages.map((page) => (
        <span
          onClick={() => {
            setCurrentPage(page);
          }}
          key={page}
          className={page === currentPage ? style["current-page"] : style.page}
        >
          {page}
        </span>
      ))}
      <span
        onClick={() => {
          setNextPage();
        }}
        className={style["next-page"]}
      ></span>
    </div>
  );
}

export default Pagination;
