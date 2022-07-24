import { useState } from "react";

interface IOptions {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialPageSize = 5,
}: IOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);
  let startIndex;
  let endIndex;

  if (currentPage < 3) {
    startIndex = 1;
    endIndex = 5;
  } else if (currentPage > totalPages - 2) {
    startIndex = totalPages - 4;
    endIndex = totalPages;
  } else {
    startIndex = currentPage - 2;
    endIndex = currentPage + 2;
  }

  const setNextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    setCurrentPage,
    setNextPage,
    setPreviousPage,
    setPageSize,
    startIndex,
    endIndex,
  };
};
