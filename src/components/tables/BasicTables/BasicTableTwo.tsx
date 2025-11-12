import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface ProductType {
  id: number;
  code: string;
  name: string;
  category: string;
  price: number;
}

// Define the table data using the interface
const tableData: ProductType[] = [
  {
    id: 1,
    code: "P001",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 19.99,
  },
  {
    id: 2,
    code: "P002",
    name: "Notebook",
    category: "Stationery",
    price: 4.5,
  },
  {
    id: 3,
    code: "P003",
    name: "Coffee Mug",
    category: "Kitchenware",
    price: 7.99,
  },
  {
    id: 4,
    code: "P004",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 29.99,
  },
  {
    id: 5,
    code: "P005",
    name: "Desk Lamp",
    category: "Home Decor",
    price: 15.0,
  },
];

export default function BasicTableTwo() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Code
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.id}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.code}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.name}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.category}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
