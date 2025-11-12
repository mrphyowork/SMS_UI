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
  title: string;
  content: string;
  action: string;
}

// Define the table data using the interface
const tableData: ProductType[] = [
  {
    id: 1,
    title: "Welcome Post",
    content: "This is the first post introducing our new platform.",
    action: "publish",
  },
  {
    id: 2,
    title: "Update Notice",
    content: "We have added new features to improve user experience.",
    action: "update",
  },
  {
    id: 3,
    title: "Maintenance Alert",
    content: "Scheduled maintenance will occur this weekend.",
    action: "notify",
  },
  {
    id: 4,
    title: "Feedback Request",
    content: "We value your feedback. Please share your thoughts with us.",
    action: "collect",
  },
  {
    id: 5,
    title: "Promotion Post",
    content: "Get 20% off on all products this week only!",
    action: "promote",
  },
];
export default function BasicTableTwo() {
  const handleEdit = (id: number) => {
    console.log(`Editing post with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting post with id: ${id}`);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 text-center dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Title
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-xs dark:text-gray-400"
              >
                Content
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-xs dark:text-gray-400"
              >
                Action
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
                  {order.title}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.content}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {/* {order.action} */}
                  <button
                    style={{
                      backgroundColor: "#0A6FFD",
                      color: "white",
                      border: "1px solid #0A6FFD",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(order.id)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    style={{
                      backgroundColor: "#DC3444",
                      color: "white",
                      border: "1px solid #DC3444",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
