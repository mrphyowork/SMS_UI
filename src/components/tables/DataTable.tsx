import React, { useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Select from "../../components/form/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

type orderType = "asc" | "desc";
interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortCols?: string[];
  isPagination?: boolean;
  setQueryParams: (filters: Record<string, string | number>) => void;
  queryParams: Record<string, string | number>;
}
const options = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

export default function DataTable<T>({
  columns,
  data,
  sortCols,
  isPagination = false,
  setQueryParams,
  queryParams,
}: DataTableProps<T>) {
  const [sortBy, setSortBy] = useState<string>(columns[0].key);
  const [sortOrder, setSortOrder] = useState<orderType>("desc");
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);

  useEffect(() => {
    setQueryParams?.({
      ...queryParams,
      sort_by: sortBy || columns[0].key || "",
      sort_order: sortOrder || "asc",
      page: currentPage,
      ...(isPagination ? { per_page: Number(perPage) } : {}),
    });
  }, [perPage, sortBy, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  useEffect(() => {
    // initial state
    setTotalEntries(data.length);
    setTotalPages(1);
    setStartIndex(0);
    setEndIndex(data.length);
    setCurrentData(data);
    if (isPagination) {
      setTotalPages(Math.ceil(data.length / perPage));
    }
  }, [data]);

  useEffect(() => {
    changeShowData();
  }, [startIndex, currentPage, perPage]);

  const changeShowData = () => {
    if (isPagination) {
      setTotalPages(Math.ceil(data.length / perPage));
      setStartIndex((currentPage - 1) * perPage);
      setEndIndex(Math.min(startIndex + perPage, totalEntries));
      setCurrentData(
        data.slice(startIndex, Number(startIndex) + Number(perPage))
      );
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3, "...", totalPages];
    } else if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  };

  const visiblePages = getVisiblePages();

  const changePerPage = (value: string) => {
    const val = Number(value);
    setPerPage(val);
  };

  return (
    <>
      {isPagination && (
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Show
            </span>
            <Select
              options={options}
              placeholder="Select page"
              onChange={changePerPage}
              className="w-10 text-sm dark:bg-dark-900"
              defaultValue="10" // default value
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              entries
            </span>
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Bind Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns &&
                  columns.map((column, colIndex) => {
                    const isSortable = sortCols?.includes(column.key);
                    const isActive = sortBy === column.key;
                    return (
                      <TableCell
                        key={colIndex}
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-m dark:text-gray-400"
                      >
                        <div
                          onClick={() => isSortable && handleSort(column.key)}
                          className={`flex items-center justify-between ${
                            isSortable ? "cursor-pointer" : ""
                          }`}
                        >
                          <span>{column.header}</span>

                          {isSortable && (
                            <span className="flex justify-end">
                              <span
                                className={`${
                                  isActive && sortOrder === "asc"
                                    ? "text-gray-800 dark:text-white"
                                    : "text-gray-300"
                                }`}
                              >
                                {" "}
                                ↑{" "}
                              </span>
                              <span
                                className={`${
                                  isActive && sortOrder === "desc"
                                    ? "text-gray-800 dark:text-white"
                                    : "text-gray-300"
                                }`}
                              >
                                ↓
                              </span>
                            </span>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableHeader>

            {/* Bind Table Data */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns &&
                    columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                      >
                        {column.render(row)}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4 text-sm mb-4">
            {/* Show Reccord Information */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-600 ml-5 dark:text-gray-400">
                <div>
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to <span className="font-medium">{endIndex}</span> of{" "}
                  <span className="font-medium">{totalEntries}</span> entries
                </div>
              </div>
            </div>
            {/* Show Pagination */}
            {isPagination && perPage !== undefined && (
              <div className="flex items-center justify-center gap-2 p-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-1 text-sm rounded-md border ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-brand-500"
                  } dark:text-gray-400`}
                >
                  Prev
                </Button>

                {visiblePages.map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-gray-400 select-none"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      size="sm"
                      variant={`${
                        currentPage === page ? "primary" : "outline"
                      }`}
                      onClick={() => handlePageChange(page as number)}
                      className={`px-4 py-1 text-sm rounded-md border transition-colors duration-150 ${
                        currentPage === page
                          ? "bg-brand-500 text-white border-brand-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-1 text-sm rounded-md border ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
